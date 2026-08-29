export function FormField({ label, id, ...props }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-bold text-white/80">{label}</span>
      <input
        id={id}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-campus focus:ring-2 focus:ring-campus/25"
        {...props}
      />
    </label>
  );
}
