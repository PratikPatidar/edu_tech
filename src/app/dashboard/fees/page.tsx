'use client';

import { useState, useEffect } from 'react';
import { Wallet, Receipt, CreditCard, CheckCircle, Download, ArrowUpRight, HelpCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

function Sk({ cls = '' }: { cls?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg ${cls}`} />;
}

interface FeeData {
  totalFee: number;
  totalPaid: number;
  totalDue: number;
  paidPct: number;
  batch: string;
  academicYear: string;
  dueDate: string | null;
  dueAmount: number;
  transactions: { receiptNo: string; date: string; method: string; description: string; amount: number }[];
}

export default function StudentFees() {
  const [feeData, setFeeData] = useState<FeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [payAmount, setPayAmount] = useState('');

  useEffect(() => {
    fetch('/api/student/fees')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.data) {
          setFeeData(d.data);
          setPayAmount(String(d.data.dueAmount || d.data.totalDue || 0));
        }
      })
      .catch(() => toast.error('Failed to load fee data'))
      .finally(() => setLoading(false));
  }, []);

  const handlePayment = () => {
    const amt = parseInt(payAmount || '0');
    if (!amt) { toast.error('Please enter a valid amount'); return; }
    toast.success(`Redirecting to secure gateway to pay ₹${amt.toLocaleString()}...`);
  };

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Fee Ledger &amp; Payments</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your course installments, view billing receipts, and make secure transactions.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/30 px-3 py-1.5 rounded-full">
          <ShieldCheck size={14} /> PCI-DSS Secure Billing
        </div>
      </div>

      {/* Hero cards section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Course Fee */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Total Course Fee</span>
              <span className="w-8 h-8 rounded-xl bg-orange-50/50 dark:bg-orange-950/30 text-orange-500 flex items-center justify-center">
                <Wallet size={16} />
              </span>
            </div>
            {loading ? <Sk cls="h-8 w-32 mt-2" /> : (
              <div className="text-2xl font-bold text-slate-800 dark:text-white mt-2">{fmt(feeData?.totalFee ?? 0)}</div>
            )}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            {loading ? <Sk cls="h-3 w-40 inline-block" /> : `${feeData?.batch ?? ''} (${feeData?.academicYear ?? ''})`}
          </div>
        </div>

        {/* Total Paid Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Total Paid</span>
              <span className="w-8 h-8 rounded-xl bg-green-50/50 dark:bg-green-950/30 text-green-500 flex items-center justify-center">
                <CheckCircle size={16} />
              </span>
            </div>
            {loading ? <Sk cls="h-8 w-32 mt-2" /> : (
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{fmt(feeData?.totalPaid ?? 0)}</div>
            )}
          </div>
          <div className="mt-4">
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-green-500 h-full rounded-full transition-all" style={{ width: `${feeData?.paidPct ?? 0}%` }} />
            </div>
            {loading ? <Sk cls="h-3 w-40 mt-1" /> : (
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                <span>{feeData?.paidPct ?? 0}% Paid</span>
                <span>{feeData?.transactions?.length ?? 0} installment(s) cleared</span>
              </div>
            )}
          </div>
        </div>

        {/* Pending Due Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Pending Due</span>
              <span className="w-8 h-8 rounded-xl bg-red-50/50 dark:bg-red-950/30 text-red-500 flex items-center justify-center">
                <CreditCard size={16} />
              </span>
            </div>
            {loading ? <Sk cls="h-8 w-32 mt-2" /> : (
              <div className="text-2xl font-bold text-red-500 dark:text-red-400 mt-2">{fmt(feeData?.totalDue ?? 0)}</div>
            )}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-red-500 font-semibold flex items-center gap-1.5">
            {feeData?.totalDue ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {feeData.dueDate ? `Due by: ${feeData.dueDate}` : 'Payment due'}
              </>
            ) : (
              <span className="text-green-600 flex items-center gap-1"><CheckCircle size={12} /> No pending dues</span>
            )}
          </div>
        </div>
      </div>

      {/* Pay Now Section & Quick Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left Column: Quick payment input */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard size={18} className="text-orange-500" /> Secure Payment Portal
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Select a payment option or enter a custom amount to pay online.</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              <Sk cls="h-16 rounded-xl" />
              <Sk cls="h-16 rounded-xl" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {[
                { amount: String(feeData?.totalDue ?? 0), label: `Pay Full Due (${fmt(feeData?.totalDue ?? 0)})` },
                { amount: String(Math.round((feeData?.totalDue ?? 0) / 2)), label: `Pay Half (${fmt(Math.round((feeData?.totalDue ?? 0) / 2))})` },
              ].map(opt => (
                <button
                  key={opt.amount}
                  onClick={() => setPayAmount(opt.amount)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    payAmount === opt.amount
                      ? 'border-orange-400 bg-orange-50/20 dark:bg-orange-950/5 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`text-[11px] font-semibold ${payAmount === opt.amount ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {opt === undefined || opt.amount === String(feeData?.totalDue ?? 0) ? 'Recommended' : 'Split Payment'}
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-white mt-1">{opt.label}</div>
                </button>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Custom Payment Amount</label>
            <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 flex items-center bg-slate-50/50 dark:bg-slate-900/50">
              <span className="absolute left-4 font-semibold text-slate-400 dark:text-slate-600 text-base">₹</span>
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                placeholder="Enter amount to pay"
                className="w-full pl-9 pr-4 py-2.5 bg-transparent text-slate-800 dark:text-white font-semibold outline-none border-none text-sm rounded-xl"
              />
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
          >
            Pay {payAmount ? `₹${parseInt(payAmount || '0').toLocaleString()}` : ''} Now <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Right Column: Support & Help */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle size={18} className="text-slate-400" /> Billing Support
            </h3>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
              <p><strong>Installment Cycle:</strong> Fees are split into quarterly structures. Pay on time to avoid late fees.</p>
              <p><strong>Online Receipts:</strong> Receipts are generated automatically upon successful transaction.</p>
              <p><strong>Payment Modes:</strong> We accept UPI, NetBanking, Credit/Debit cards, and Bank Transfers.</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400">
            Questions? Contact billing at <strong>billing@edumiracle.in</strong>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Receipt size={18} className="text-slate-400 dark:text-slate-500" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Transaction History</h2>
        </div>
        {loading ? (
          <div className="space-y-4">{Array(2).fill(0).map((_, i) => <Sk key={i} cls="h-14" />)}</div>
        ) : (feeData?.transactions ?? []).length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">No transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/80">
                  <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Receipt</th>
                  <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Billing Date</th>
                  <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Method</th>
                  <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</th>
                  <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Paid Amount</th>
                  <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                {feeData!.transactions.map(row => (
                  <tr key={row.receiptNo} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                    <td className="py-4 font-semibold text-slate-800 dark:text-white">{row.receiptNo}</td>
                    <td className="py-4 text-slate-600 dark:text-slate-400">{row.date}</td>
                    <td className="py-4">
                      <span className="text-[11px] font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">{row.method}</span>
                    </td>
                    <td className="py-4 text-slate-600 dark:text-slate-400">{row.description}</td>
                    <td className="py-4 font-semibold text-green-600 dark:text-green-400 text-right">{fmt(row.amount)}</td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => toast.success(`Downloading receipt ${row.receiptNo}...`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/10 rounded-lg hover:bg-orange-100/50 transition-colors"
                      >
                        <Download size={12} /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
