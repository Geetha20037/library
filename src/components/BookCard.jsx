import { ArrowUpRight, BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function BookCard({ book, onIssue }) {
  const available = book.available > 0;

  return (
    <article className="book-card group min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      <Link
        to={`/books/${book.id}`}
        className="relative block overflow-hidden bg-[#f0eee6] p-5 sm:p-6"
        aria-label={`View ${book.title}`}
      >
        <div className="flex h-52 items-center justify-center sm:h-60">
          <img
            src={book.cover}
            alt={`${book.title} book cover`}
            loading="lazy"
            className="book-cover h-full max-w-[76%] object-contain shadow-lg transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              event.currentTarget.nextElementSibling.style.display = "flex";
            }}
          />
          <div className="hidden h-full w-36 flex-col items-center justify-center rounded-r-md border-l-4 border-emerald-900 bg-[#e3e7da] p-4 text-center shadow-md">
            <BookOpen size={30} className="mb-3 text-emerald-900" />
            <span className="font-display text-lg font-semibold text-slate-900">
              {book.title}
            </span>
            <span className="mt-2 text-xs text-slate-600">
              {book.author}
            </span>
          </div>
        </div>

        {book.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-900">
            Featured
          </span>
        )}

        <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white text-slate-800 transition group-hover:bg-emerald-900 group-hover:text-white">
          <ArrowUpRight size={17} />
        </span>
      </Link>

      <div className="p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#f1f3eb] px-2.5 py-1 text-[10px] font-semibold text-emerald-900 sm:text-xs">
            {book.category}
          </span>

          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-700">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            {book.rating}
          </span>
        </div>

        <Link to={`/books/${book.id}`}>
          <h3 className="line-clamp-2 min-h-12 font-display text-lg font-semibold text-slate-900 transition-colors hover:text-emerald-800 sm:text-xl">
            {book.title}
          </h3>
        </Link>

        <p className="mt-1 truncate text-sm text-slate-500">
          {book.author}
        </p>

        <div className="my-4 flex items-center gap-2 border-t border-slate-100 pt-4">
          <span
            className={`size-2 shrink-0 rounded-full ${
              available ? "bg-emerald-600" : "bg-rose-500"
            }`}
          />
          <span
            className={`text-xs font-medium ${
              available ? "text-emerald-800" : "text-rose-700"
            }`}
          >
            {available ? `${book.available} available` : "Currently unavailable"}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/books/${book.id}`}
            className="flex min-w-0 flex-1 items-center justify-center rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-emerald-800 hover:text-emerald-800"
          >
            View details
          </Link>

          <button
            type="button"
            disabled={!available}
            onClick={() => onIssue?.(book.id)}
            className="rounded-xl bg-emerald-900 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Issue
          </button>
        </div>
      </div>
    </article>
  );
}