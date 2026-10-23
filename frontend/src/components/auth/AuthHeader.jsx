import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

export default function AuthHeader() {
  return (
    <>
      {/* Back button */}
      <Link
        to="/"
        className="absolute left-5 top-5 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 transition hover:text-slate-900 dark:hover:text-white sm:left-8 sm:top-8"
      >
        <Code2 size={20} className="text-indigo-400" />
        My Portfolio
      </Link>
    </>
  );
}
