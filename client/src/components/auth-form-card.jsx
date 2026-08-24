export function AuthFormCard({ title, subtitle, children }) {
  return (
    <section className="mx-auto max-w-md rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
        <p className="mt-2 text-sm text-stone-600">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}
