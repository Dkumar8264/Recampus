export function AuthFormCard({ title, subtitle, children }) {
  return (
    <section className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-[#090909]/88 p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-white/55">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}
