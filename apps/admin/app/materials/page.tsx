export default function MaterialsPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--foreground)' }}>Study Materials</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Upload notes, PDFs, and resources for students.</p>
      </div>

      <div style={{ background: 'var(--card-bg)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--foreground)' }}>Material Library Empty</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>Upload documents to share with specific batches.</p>
        <button style={{ background: 'var(--sidebar-active)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>
          + Upload Material
        </button>
      </div>
    </div>
  );
}
