import { useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  MapPin,
  LoaderCircle,
} from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import { usePortfolio } from "../context/PortfolioContext";
import { api } from "../services/api";

export default function Contact() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const { site } = usePortfolio();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus({ type: "loading", message: "Sending your message…" });
    const data = new FormData(form);
    try {
      const result = await api.post("/public/contact", {
        name: data.get("name"),
        email: data.get("email"),
        subject: data.get("subject"),
        message: data.get("message"),
      });
      setStatus({ type: "success", message: result.message || "Message sent successfully." });
      form.reset();
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Could not send your message." });
    }
  }

  return (
    <section id="contact" className="container-width py-24">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let's work together"
        description="Have a project idea or question? Send me a message and I'll get back to you."
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Full name"
              name="name"
              placeholder="Your full name"
              required
              minLength={2}
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mt-5">
            <Field
              label="Subject"
              name="subject"
              placeholder="What would you like to discuss?"
              required
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200"
            >
              Message <span className="text-rose-300">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              minLength={10}
              placeholder="Write your message…"
              className="focus-ring w-full resize-y rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/80 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-500"
            />
          </div>
          <button
            disabled={status.type === "loading"}
            type="submit"
            className="focus-ring mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-wait disabled:opacity-60"
          >
            {status.type === "loading" ? (
              <LoaderCircle className="animate-spin" size={17} />
            ) : (
              <Send size={16} />
            )}
            {status.type === "loading" ? "Sending…" : "Send Message"}
          </button>
          {status.message && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-4 rounded-lg border p-3 text-sm ${status.type === "success" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : status.type === "error" ? "border-rose-400/30 bg-rose-400/10 text-rose-200" : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}
            >
              {status.message}
            </p>
          )}
        </form>
        <aside className="glass rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl font-bold">Contact information</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            You can also reach me through these channels. Replace all sample
            links with your own.
          </p>
          <div className="mt-7 space-y-5">
            <ContactItem
              icon={Mail}
              label="Email"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <ContactItem
              icon={MapPin}
              label="Location"
              value="Herat, Afghanistan · Remote"
            />
            <ContactItem
              icon={Github}
              label="GitHub"
              value="View my repositories"
              href={site.github}
            />
            <ContactItem
              icon={Linkedin}
              label="LinkedIn"
              value="Connect professionally"
              href={site.linkedin}
            />
            <ContactItem
              icon={Send}
              label="Telegram"
              value="Message me"
              href={site.telegram}
            />
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder, ...props }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200"
      >
        {label} <span className="text-rose-300">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="focus-ring w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/80 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-500"
        {...props}
      />
    </div>
  );
}
function ContactItem({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-500/10 text-indigo-300">
        <Icon size={19} />
      </span>
      <span>
        <span className="block text-xs text-slate-500 dark:text-slate-500">{label}</span>
        <span className="mt-1 block break-all text-sm text-slate-800 dark:text-slate-200">
          {value}
        </span>
      </span>
    </>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="focus-ring flex items-center gap-3 rounded-xl hover:text-indigo-200"
    >
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-3">{content}</div>
  );
}
