export default function AuthInput({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  autoComplete,
  register,
  validation,
  error,
  onInputChange,
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
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </span>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          {...register(name, { ...validation, onChange: onInputChange })}
          className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:bg-slate-50 focus:ring-4 dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.07] ${error ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10" : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/10 dark:border-white/10"}`}
        />
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-rose-500">
          {error.message}
        </p>
      )}
    </div>
  );
}
