import { Link } from "react-router-dom";
import {
  Code2,
  Mail,
  LockKeyhole,
  UserRound,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import AuthInput from "./AuthInput";
import AuthMessage from "./AuthMessage";

export default function AuthForm({
  isLogin,
  onModeChange,
  register,
  handleSubmit,
  onSubmit,
  errors,
  watch,
  loading,
  message,
  error,
  showPassword,
  setShowPassword,
  showConfirm,
  setShowConfirm,
  onInputChange,
}) {
  const inputStyle =
    "w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-indigo-400 focus:bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.07]";

  return (
    <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
            <Code2 size={24} />
          </div>
          <div>
            <h1 className="font-bold">Skyrovix</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Build Your Digital Future
            </p>
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-3 text-sm font-medium text-indigo-400">
            {isLogin ? "WELCOME BACK" : "GET STARTED"}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {isLogin ? "Welcome back!" : "Create account"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {isLogin
              ? "Enter your details to access your account."
              : "Join us and start your journey today."}
          </p>
        </div>

        <div className="mb-7 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-white/10 dark:bg-white/[0.03]">
          <button
            type="button"
            onClick={() => onModeChange(true)}
            className={`rounded-lg py-3 text-sm font-semibold transition ${isLogin ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => onModeChange(false)}
            className={`rounded-lg py-3 text-sm font-semibold transition ${!isLogin ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
          >
            Sign Up
          </button>
        </div>

        <AuthMessage message={message} error={error} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {!isLogin && (
            <AuthInput
              label="Full Name"
              name="fullName"
              placeholder="Enter your full name"
              icon={<UserRound size={18} />}
              autoComplete="name"
              register={register}
              error={errors.fullName}
              onInputChange={onInputChange}
            />
          )}

          <AuthInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            icon={<Mail size={18} />}
            autoComplete="email"
            register={register}
            error={errors.email}
            onInputChange={onInputChange}
          />

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                Password
              </label>
              {isLogin && (
                <Link
                  to="/forgot-password"
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                aria-invalid={Boolean(errors.password)}
                {...register("password", { onChange: onInputChange })}
                className={`${inputStyle} ${errors.password ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10" : ""}`}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p role="alert" className="mt-2 text-xs text-rose-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                Confirm Password
              </label>
              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  {...register("confirmPassword", { onChange: onInputChange })}
                  className={`${inputStyle} ${errors.confirmPassword ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10" : ""}`}
                />
                <button
                  type="button"
                  aria-label={
                    showConfirm ? "Hide confirmation" : "Show confirmation"
                  }
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p role="alert" className="mt-2 text-xs text-rose-500">
                  {errors.confirmPassword.message}
                </p>
              )}
              {watch("confirmPassword") &&
                watch("password") === watch("confirmPassword") &&
                !errors.confirmPassword && (
                  <p className="mt-2 text-xs text-emerald-500">
                    Passwords match.
                  </p>
                )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : isLogin
                ? "Sign In"
                : "Create Account"}
            {!loading && (
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            )}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-600 dark:text-slate-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => onModeChange(!isLogin)}
            className="ml-2 font-semibold text-indigo-400 hover:text-indigo-300"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={15} className="text-emerald-400" />
          Your information is handled securely.
        </p>
      </div>
    </div>
  );
}
