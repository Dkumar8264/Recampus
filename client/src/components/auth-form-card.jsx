export function AuthFormCard({ title, subtitle, children }) {
  return (
    <section className="mx-auto max-w-md rounded-[28px] border border-stone-200 bg-white/90 p-6 text-ink shadow-[0_24px_70px_rgba(64,43,20,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-ink">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}
