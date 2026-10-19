import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Mail,
  LockKeyhole,
  UserRound,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Rocket,
} from "lucide-react";

import api from "../services/api";

export default function SignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!isLogin && !form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        const response = await api.post("/auth/login", {
          email: form.email.trim(),
          password: form.password,
        });

        setMessage(
          response.data.message || "Login successful!"
        );
      } else {
        await api.post("/auth/register", {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        });

        setMessage("Account created successfully! Please sign in.");

        setIsLogin(true);

        setForm({
          name: "",
          email: form.email,
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400 focus:bg-white/[0.07] focus:ring-4 focus:ring-indigo-500/10";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 py-8 text-white sm:px-6">

      {/* Background */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[130px]" />

      {/* Back button */}

      <Link
        to="/"
        className="absolute left-5 top-5 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white sm:left-8 sm:top-8"
      >
        <Code2 size={20} className="text-indigo-400" />
        My Portfolio
      </Link>

      {/* Main card */}

      <section className="relative my-12 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0A1020]/90 shadow-2xl shadow-black/40 lg:grid-cols-2">

        {/* Left side */}

        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-950 via-[#0B1530] to-violet-950/80 p-10 lg:flex xl:p-12">

          <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[90px]" />

          <div className="relative">

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-indigo-500/20">
                <Code2 size={27} />
              </div>

              <div>
                <h1 className="text-xl font-bold">
                  Skyrovix
                </h1>

                <p className="text-xs text-slate-400">
                  Build Your Digital Future
                </p>
              </div>
            </div>

            <div className="mt-20">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-2 text-xs text-indigo-300">
                <Sparkles size={15} />
                Your Journey Starts Here
              </div>

              <h2 className="text-5xl font-bold leading-tight">
                Build Your
                <br />

                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Digital Future.
                </span>
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                Manage your projects, follow your progress,
                and bring your ideas to life.
              </p>

            </div>

          </div>

          {/* Features */}

          <div className="relative mt-12 space-y-5">

            <Feature
              icon={<Rocket size={20} />}
              title="Manage Your Projects"
              text="Keep your work organized."
            />

            <Feature
              icon={<ShieldCheck size={20} />}
              title="Your Account, Your Space"
              text="Access your personal dashboard."
            />

          </div>

          <p className="relative mt-12 text-xs text-slate-500">
            © {new Date().getFullYear()} Skyrovix
          </p>

        </div>

        {/* Right side: Form */}

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">

          <div className="w-full max-w-md">

            {/* Mobile logo */}

            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
                <Code2 size={24} />
              </div>

              <div>
                <h1 className="font-bold">Skyrovix</h1>
                <p className="text-xs text-slate-400">
                  Build Your Digital Future
                </p>
              </div>
            </div>

            {/* Form heading */}

            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-indigo-400">
                {isLogin ? "WELCOME BACK" : "GET STARTED"}
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {isLogin ? "Welcome back!" : "Create account"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {isLogin
                  ? "Enter your details to access your account."
                  : "Join us and start your journey today."}
              </p>
            </div>

            {/* Login / Sign up tabs */}

            <div className="mb-7 grid grid-cols-2 rounded-xl border border-white/10 bg-white/[0.03] p-1">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                  setMessage("");
                }}
                className={`rounded-lg py-3 text-sm font-semibold transition ${
                  isLogin
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                  setMessage("");
                }}
                className={`rounded-lg py-3 text-sm font-semibold transition ${
                  !isLogin
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Success message */}

            {message && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300"
              >
                {message}
              </div>
            )}

            {/* Error message */}

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300"
              >
                {error}
              </div>
            )}

            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-5">

              {!isLogin && (
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  icon={<UserRound size={18} />}
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              )}

              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={18} />}
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />

              {/* Password */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-200"
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete={
                      isLogin ? "current-password" : "new-password"
                    }
                    minLength={8}
                    required
                    className={inputStyle}
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm password */}

              {!isLogin && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-slate-200"
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
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                      minLength={8}
                      required
                      className={inputStyle}
                    />

                    <button
                      type="button"
                      aria-label={
                        showConfirm
                          ? "Hide confirmation"
                          : "Show confirmation"
                      }
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                    >
                      {showConfirm ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit button */}

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

            {/* Bottom link */}

            <p className="mt-7 text-center text-sm text-slate-400">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setMessage("");
                }}
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
      </section>
    </main>
  );
}

/* Reusable input */

function Input({
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
        className="mb-2 block text-sm font-medium text-slate-200"
      >
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
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
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400 focus:bg-white/[0.07] focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>
    </div>
  );
}

/* Feature item */

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-200">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}