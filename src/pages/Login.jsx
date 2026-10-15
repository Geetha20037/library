import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  GraduationCap,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useLibrary();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const result = login(name, email);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    const destination = location.state?.from || "/dashboard";
    navigate(destination, { replace: true });
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6] px-5 pb-12 pt-[100px] sm:px-8 sm:pt-28">
      <div className="mx-auto grid max-w-[1080px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(20,40,30,0.07)] lg:grid-cols-2">
        <div className="relative hidden min-h-[640px] overflow-hidden bg-[#17392e] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=80"
            alt="Bookshelves inside a library"
            className="absolute inset-0 size-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#17392e]/70 via-[#17392e]/60 to-[#102820]" />

          <div className="relative">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-white/10">
                <BookOpen size={23} />
              </span>
              <span className="font-display text-2xl font-bold">LIBRORA</span>
            </Link>
          </div>

          <div className="relative">
            <span className="mb-6 grid size-14 place-items-center rounded-2xl bg-white/10">
              <GraduationCap size={29} />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
              YOUR LEARNING JOURNEY
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight xl:text-5xl">
              Knowledge grows when you explore.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-emerald-50/75">
              Sign in to explore your library dashboard, keep track of your
              borrowed books, and continue your reading journey.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-emerald-100">
              <CheckCircle2 size={18} /> Your reading journey, all in one place
            </div>
          </div>

          <p className="relative text-xs text-emerald-100/60">
            A demo digital library experience for college students.
          </p>
        </div>

        <div className="flex flex-col justify-center px-5 py-10 sm:px-10 sm:py-14 lg:px-12 xl:px-16">
          <Link
            to="/"
            className="mb-10 inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-900"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>

          <span className="grid size-12 place-items-center rounded-xl bg-[#e5eee7] text-emerald-950">
            <UserRound size={24} />
          </span>

          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Welcome to your library.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Enter your details to access your student dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="student-name" className="mb-2 block text-sm font-semibold text-slate-800">
                Full name
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#fbfaf6] px-4 focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-900/10">
                <UserRound size={18} className="shrink-0 text-slate-400" />
                <input
                  id="student-name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  required
                  minLength={2}
                  className="h-12 w-full min-w-0 bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="student-email" className="mb-2 block text-sm font-semibold text-slate-800">
                Email address
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#fbfaf6] px-4 focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-900/10">
                <Mail size={18} className="shrink-0 text-slate-400" />
                <input
                  id="student-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="student@example.edu"
                  required
                  className="h-12 w-full min-w-0 bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Enter my library"}
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#f2f4ee] p-4">
            <ShieldCheck size={19} className="mt-0.5 shrink-0 text-emerald-900" />
            <p className="text-xs leading-6 text-slate-600">
              <strong className="text-slate-800">Demo access.</strong> This
              project uses local demo login, not verified college credentials.
              No password is required.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
            <Eye size={16} />
            <span>Explore, borrow, and keep learning.</span>
          </div>
        </div>
      </div>
    </main>
  );
}