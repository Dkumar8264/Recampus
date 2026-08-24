export function FormField({ label, id, ...props }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-medium text-stone-800">{label}</span>
      <input
        id={id}
        className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-campus/20"
        {...props}
      />
    </label>
  );
}
