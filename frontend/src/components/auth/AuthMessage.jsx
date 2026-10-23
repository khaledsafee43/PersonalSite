export default function AuthMessage({ message, error }) {
  return (
    <>
      {message && (
        <div
          role="status"
          className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300"
        >
          {message}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300"
        >
          {error}
        </div>
      )}
    </>
  );
}
