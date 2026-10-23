import { useState } from "react";
import api from "../services/api";
import AuthHeader from "../components/auth/AuthHeader";
import AuthFeatures from "../components/auth/AuthFeatures";
import AuthForm from "../components/auth/AuthForm";

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

  const clearMessages = () => {
    setMessage("");
    setError("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    clearMessages();
  };

  const handleModeChange = (loginMode) => {
    setIsLogin(loginMode);
    clearMessages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

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

        setMessage(response.data.message || "Login successful!");
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
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#050816] px-4 py-8 text-slate-900 dark:text-white sm:px-6">
      {/* Background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[130px]" />

      <AuthHeader />

      <section className="relative my-12 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0A1020]/90 shadow-2xl shadow-black/40 lg:grid-cols-2">
        <AuthFeatures />
        <AuthForm
          isLogin={isLogin}
          onModeChange={handleModeChange}
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          message={message}
          error={error}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
        />
      </section>
    </main>
  );
}
