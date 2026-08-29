export function FormField({ label, id, ...props }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-bold text-stone-700">{label}</span>
      <input
        id={id}
        className="mt-2 w-full rounded-xl border border-stone-200 bg-white/90 px-4 py-3 text-sm text-ink outline-none placeholder:text-stone-400 focus:border-campus focus:ring-2 focus:ring-campus/25"
        {...props}
      />
    </label>
  );
}
