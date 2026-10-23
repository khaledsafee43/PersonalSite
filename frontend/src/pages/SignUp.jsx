import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthHeader from "../components/auth/AuthHeader";
import AuthFeatures from "../components/auth/AuthFeatures";
import AuthForm from "../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const loginSchema = z.object({
  fullName: z.string().optional(),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must contain at least 8 characters."),
  confirmPassword: z.string().optional(),
});

const signUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "Please enter your full name.")
      .min(3, "Name must contain at least 3 characters."),
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Please enter a valid email."),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must contain at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const clearMessages = () => {
    setMessage("");
    setServerError("");
  };

  const handleModeChange = (loginMode) => {
    setIsLogin(loginMode);
    clearMessages();
    clearErrors();
    reset();
  };

  const onSubmit = async (formData) => {
    clearMessages();
    setLoading(true);
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";

      const payload = isLogin
        ? {
            email: formData.email.trim(),
            password: formData.password,
          }
        : {
            fullName: formData.fullName.trim(),
            email: formData.email.trim(),
            password: formData.password,
          };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Request failed. Please try again.");
      }

      if (isLogin) {
        if (!data.token) {
          throw new Error(
            "Login succeeded, but the server did not return a token.",
          );
        }

        localStorage.setItem("token", data.token);

        setMessage(data.message || "Login successful!");

        // هدایت کاربر به داشبورد کلاینت
        navigate("/clientDashboard");
      } else {
        setMessage(
          data.message || "Account created successfully. Please sign in.",
        );

        // پس از ثبت‌نام، کاربر به حالت ورود برمی‌گردد.
        setIsLogin(true);

        reset({
          fullName: "",
          email: formData.email,
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      setServerError(
        error.message || "Unable to connect to the server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-8 text-slate-900 dark:bg-[#050816] dark:text-white sm:px-6">
      {" "}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[130px]" />
      <AuthHeader />
      <section className="relative my-12 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-2xl shadow-black/40 dark:border-white/10 dark:bg-[#0A1020]/90 lg:grid-cols-2">
        <AuthFeatures />

        <AuthForm
          isLogin={isLogin}
          onModeChange={handleModeChange}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          watch={watch}
          loading={loading}
          message={message}
          error={serverError}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          onInputChange={clearMessages}
        />
      </section>
    </main>
  );
}
