import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';
import { getAuthPayload } from '@/lib/auth';
import FeeRecord from '@/models/FeeRecord';

export async function GET(req: Request) {
  const payload = getAuthPayload(req);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();

  const userId = new mongoose.Types.ObjectId(payload.userId);
  const record = await FeeRecord.findOne({ userId }).lean() as any;

  if (!record) {
    return NextResponse.json({ success: true, data: null });
  }

  const installments = record.installments as any[];
  const totalPaid = installments
    .filter((i: any) => i.status === 'paid')
    .reduce((acc: number, i: any) => acc + i.amount, 0);
  const totalDue = record.totalFee - totalPaid;
  const paidPct = record.totalFee > 0
    ? Math.round((totalPaid / record.totalFee) * 100)
    : 0;

  const transactions = installments
    .filter((i: any) => i.status === 'paid')
    .map((i: any) => ({
      receiptNo: i.receiptNo ?? `#RC-${Math.floor(Math.random() * 9000 + 1000)}`,
      date: i.paidDate ? new Date(i.paidDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
      method: i.method ?? 'Online',
      description: i.description,
      amount: i.amount,
    }));

  const nextDue = installments.find((i: any) => i.status === 'due');
  const dueDateStr = nextDue
    ? new Date(nextDue.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : null;

  return NextResponse.json({
    success: true,
    data: {
      totalFee: record.totalFee,
      totalPaid,
      totalDue,
      paidPct,
      batch: record.batch,
      academicYear: record.academicYear,
      dueDate: dueDateStr,
      dueAmount: nextDue?.amount ?? totalDue,
      transactions,
    },
  });
}
