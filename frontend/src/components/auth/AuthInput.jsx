export default function AuthInput({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200"
      >
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500">
          {icon}
        </span>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
          className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-slate-900 dark:text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400 focus:bg-slate-50 dark:focus:bg-white/[0.07] focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>
    </div>
  );
}
