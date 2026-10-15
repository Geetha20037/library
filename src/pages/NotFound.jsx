import { ArrowLeft, BookOpen, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="grid min-h-[80vh] place-items-center bg-[#fbfaf6] px-5 pb-12 pt-24 text-center">
      <div className="max-w-lg">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#e5eee7] text-emerald-950">
          <BookOpen size={30} />
        </span>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.24em] text-emerald-900">
          PAGE NOT FOUND
        </p>

        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-[#18372e] sm:text-7xl">
          404
        </h1>

        <h2 className="mt-4 font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
          This page is off the shelf.
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-500">
          The page you are looking for may have moved, or the link may be incorrect.
          Let's help you find your way back.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-950 px-5 py-3.5 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            <ArrowLeft size={17} /> Back home
          </Link>

          <Link
            to="/books"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 hover:border-emerald-800 hover:text-emerald-900"
          >
            <Search size={17} /> Browse books
          </Link>
        </div>
      </div>
    </main>
  );
}