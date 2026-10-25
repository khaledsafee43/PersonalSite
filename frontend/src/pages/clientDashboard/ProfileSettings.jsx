import { useState } from "react";

import {
  UserRound,
  Bell,
  ShieldCheck,
  Palette,
  Globe,
  LockKeyhole,
  Camera,
  Save,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Monitor,
  Sun,
  Moon,
  Languages,
  CircleHelp,
} from "lucide-react";

const defaultSettings = {
  fullName: "Alex Carter",
  email: "alex@example.com",
  phone: "",
  company: "",
  location: "",
  language: "English",
  theme: "Light",
  emailNotifications: true,
  projectUpdates: true,
  paymentNotifications: true,
  messageNotifications: true,
  marketingEmails: false,
  twoFactor: false,
};

const tabs = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "preferences", label: "Preferences", icon: Palette },
];

export default function ProfileSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("clientPortalSettings");

      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [savedMessage, setSavedMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  function updateSetting(name, value) {
    setSettings((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSavedMessage("");
  }

  function saveSettings(event) {
    event.preventDefault();

    localStorage.setItem(
      "clientPortalSettings",
      JSON.stringify(settings)
    );

    setSavedMessage("Your settings have been saved in this browser.");
  }

  function changePassword(event) {
    event.preventDefault();

    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setSavedMessage("Please complete all password fields.");
      return;
    }

    if (passwords.next.length < 8) {
      setSavedMessage(
        "Your new password must contain at least 8 characters."
      );
      return;
    }

    if (passwords.next !== passwords.confirm) {
      setSavedMessage("The new passwords do not match.");
      return;
    }

    setSavedMessage(
      "Password change requires backend authentication and is not enabled in this demo."
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] space-y-6 pb-8">
      {/* Header */}
      <header>
        <p className="text-xs text-slate-400">
          Workspace / Settings
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your profile, security, notifications, and workspace preferences.
        </p>
      </header>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Settings Navigation */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <p className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Account Settings
          </p>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSavedMessage("");
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <CircleHelp size={17} className="text-blue-600" />

              <span className="text-xs font-bold text-slate-700">
                Need assistance?
              </span>
            </div>

            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              Contact the support team if you need help with your account.
            </p>
          </div>
        </aside>

        {/* Settings Content */}
        <form onSubmit={saveSettings} className="space-y-6">
          {/* Profile */}
          {activeTab === "profile" && (
            <SettingsCard
              title="Profile Information"
              description="Update your personal and contact information."
              icon={UserRound}
            >
              <div className="flex flex-col items-start gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white">
                  {settings.fullName
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Profile Picture
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Your initials are currently used as your avatar.
                  </p>

                  <p className="mt-2 text-[11px] text-slate-400">
                    Image upload can be connected to storage later.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  icon={UserRound}
                  value={settings.fullName}
                  onChange={(value) =>
                    updateSetting("fullName", value)
                  }
                  placeholder="Your full name"
                />

                <Field
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  value={settings.email}
                  onChange={(value) =>
                    updateSetting("email", value)
                  }
                  placeholder="you@example.com"
                />

                <Field
                  label="Phone Number"
                  icon={Phone}
                  value={settings.phone}
                  onChange={(value) =>
                    updateSetting("phone", value)
                  }
                  placeholder="Your phone number"
                />

                <Field
                  label="Company"
                  icon={Globe}
                  value={settings.company}
                  onChange={(value) =>
                    updateSetting("company", value)
                  }
                  placeholder="Company or organization"
                />

                <div className="sm:col-span-2">
                  <Field
                    label="Location"
                    icon={MapPin}
                    value={settings.location}
                    onChange={(value) =>
                      updateSetting("location", value)
                    }
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </SettingsCard>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <SettingsCard
              title="Notification Preferences"
              description="Choose which updates you want to receive."
              icon={Bell}
            >
              <div className="divide-y divide-slate-100">
                <ToggleRow
                  title="Email Notifications"
                  description="Receive account notifications by email."
                  checked={settings.emailNotifications}
                  onChange={(value) =>
                    updateSetting("emailNotifications", value)
                  }
                />

                <ToggleRow
                  title="Project Updates"
                  description="Get updates about milestones and project progress."
                  checked={settings.projectUpdates}
                  onChange={(value) =>
                    updateSetting("projectUpdates", value)
                  }
                />

                <ToggleRow
                  title="Payment Notifications"
                  description="Receive invoice and payment status updates."
                  checked={settings.paymentNotifications}
                  onChange={(value) =>
                    updateSetting("paymentNotifications", value)
                  }
                />

                <ToggleRow
                  title="New Messages"
                  description="Get notified when a new message arrives."
                  checked={settings.messageNotifications}
                  onChange={(value) =>
                    updateSetting("messageNotifications", value)
                  }
                />

                <ToggleRow
                  title="Product News & Tips"
                  description="Occasional product news and helpful tips."
                  checked={settings.marketingEmails}
                  onChange={(value) =>
                    updateSetting("marketingEmails", value)
                  }
                />
              </div>
            </SettingsCard>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <>
              <SettingsCard
                title="Change Password"
                description="Update your account password."
                icon={LockKeyhole}
              >
                <div className="space-y-5">
                  <PasswordField
                    label="Current Password"
                    value={passwords.current}
                    visible={showPassword}
                    onToggle={() =>
                      setShowPassword((previous) => !previous)
                    }
                    onChange={(value) =>
                      setPasswords((previous) => ({
                        ...previous,
                        current: value,
                      }))
                    }
                  />

                  <PasswordField
                    label="New Password"
                    value={passwords.next}
                    visible={showNewPassword}
                    onToggle={() =>
                      setShowNewPassword((previous) => !previous)
                    }
                    onChange={(value) =>
                      setPasswords((previous) => ({
                        ...previous,
                        next: value,
                      }))
                    }
                  />

                  <PasswordField
                    label="Confirm New Password"
                    value={passwords.confirm}
                    visible={showNewPassword}
                    onToggle={() =>
                      setShowNewPassword((previous) => !previous)
                    }
                    onChange={(value) =>
                      setPasswords((previous) => ({
                        ...previous,
                        confirm: value,
                      }))
                    }
                  />

                  <button
                    type="button"
                    onClick={changePassword}
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    Update Password
                  </button>
                </div>
              </SettingsCard>

              <SettingsCard
                title="Two-Factor Authentication"
                description="Add another layer of security to your account."
                icon={ShieldCheck}
              >
                <ToggleRow
                  title="Enable Two-Factor Authentication"
                  description="Two-factor authentication needs backend and authentication-provider support."
                  checked={settings.twoFactor}
                  onChange={(value) =>
                    updateSetting("twoFactor", value)
                  }
                />
              </SettingsCard>
            </>
          )}

          {/* Preferences */}
          {activeTab === "preferences" && (
            <SettingsCard
              title="Workspace Preferences"
              description="Personalize the appearance and language of your workspace."
              icon={Palette}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700">
                    Appearance
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Select your preferred dashboard theme.
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      {
                        value: "Light",
                        icon: Sun,
                        description: "Bright and clean interface",
                      },
                      {
                        value: "Dark",
                        icon: Moon,
                        description: "Comfortable in low light",
                      },
                    ].map((option) => {
                      const Icon = option.icon;
                      const active =
                        settings.theme === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            updateSetting("theme", option.value)
                          }
                          className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                            active
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                            <Icon size={19} />
                          </div>

                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              {option.value} Mode
                            </p>

                            <p className="mt-1 text-[11px] text-slate-500">
                              {option.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <label
                    htmlFor="language"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Language
                  </label>

                  <div className="relative">
                    <Languages
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      id="language"
                      value={settings.language}
                      onChange={(event) =>
                        updateSetting("language", event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-blue-400 sm:max-w-sm"
                    >
                      <option>English</option>
                      <option>Dari</option>
                      <option>Persian</option>
                      <option>Pashto</option>
                    </select>
                  </div>

                  <p className="mt-2 text-[11px] text-slate-400">
                    Selecting a language saves your preference. Actual
                    translation requires internationalization support.
                  </p>
                </div>
              </div>
            </SettingsCard>
          )}

          {/* Save Status */}
          {savedMessage && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 p-4 text-xs leading-5 text-blue-700"
            >
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0"
              />

              {savedMessage}
            </div>
          )}

          {/* Save Button */}
          <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-[11px] text-slate-400">
              Remember to save your changes.
            </p>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Save size={17} />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SettingsCard({ title, description, icon: Icon, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-800">
            {title}
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}

function ToggleRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-700">
          {title}
        </h3>

        <p className="mt-1 max-w-lg text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function PasswordField({
  label,
  value,
  visible,
  onToggle,
  onChange,
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <LockKeyhole
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="new-password"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-11 text-sm outline-none focus:border-blue-400 focus:bg-white"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  );
}