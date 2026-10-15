import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Hash,
  Library,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, user, borrowedBooks, issueBook, showNotice } = useLibrary();

  const book = books.find((item) => item.id === Number(id));

  if (!book) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-[#fbfaf6] px-5 pt-20 text-center">
        <div>
          <BookOpen size={42} className="mx-auto text-emerald-900" />
          <h1 className="mt-5 font-display text-3xl font-semibold">Book not found</h1>
          <p className="mt-3 text-sm text-slate-500">
            This book does not exist in our demo collection.
          </p>
          <Link
            to="/books"
            className="mt-6 inline-block rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Back to books
          </Link>
        </div>
      </main>
    );
  }

  const isBorrowed = borrowedBooks.some((item) => item.bookId === book.id);
  const available = book.available > 0;

  function handleIssue() {
    const result = issueBook(book.id);

    if (!result.success && !user) {
      navigate("/login", { state: { from: `/books/${book.id}` } });
      return;
    }

    showNotice(result.message);
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6] px-5 pb-16 pt-[100px] sm:px-8 sm:pb-24 sm:pt-28 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <Link
          to="/books"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-900"
        >
          <ArrowLeft size={17} /> Back to collection
        </Link>

        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="flex min-h-[350px] items-center justify-center rounded-[2rem] bg-[#eeece2] p-8 sm:min-h-[480px]">
            <img
              src={book.cover}
              alt={`${book.title} book cover`}
              className="max-h-[430px] max-w-[80%] object-contain shadow-2xl"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="py-2 sm:py-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#e5eee7] px-3 py-1.5 text-xs font-semibold text-emerald-900">
                {book.category}
              </span>
              <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                <Star size={15} className="fill-amber-400 text-amber-400" />
                {book.rating} / 5
              </span>
            </div>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-[#18372e] sm:text-5xl lg:text-6xl">
              {book.title}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-base text-slate-600">
              <UserRound size={18} />
              Written by <span className="font-semibold text-slate-900">{book.author}</span>
            </p>

            <div className="my-7 h-px bg-slate-200" />

            <h2 className="font-display text-2xl font-semibold text-slate-900">
              About this book
            </h2>
            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
              {book.description}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <Hash size={19} className="mt-0.5 shrink-0 text-emerald-900" />
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">ISBN</p>
                  <p className="mt-1 break-all text-sm font-semibold text-slate-900">{book.isbn}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <CalendarDays size={19} className="mt-0.5 shrink-0 text-emerald-900" />
                <div>
                  <p className="text-xs text-slate-500">Published</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{book.year}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <Library size={19} className="mt-0.5 shrink-0 text-emerald-900" />
                <div>
                  <p className="text-xs text-slate-500">Total copies</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{book.copies}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <Clock3 size={19} className="mt-0.5 shrink-0 text-emerald-900" />
                <div>
                  <p className="text-xs text-slate-500">Borrowing period</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">14 days</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className={`size-2.5 rounded-full ${available ? "bg-emerald-600" : "bg-rose-500"}`} />
              <span className={`font-semibold ${available ? "text-emerald-800" : "text-rose-700"}`}>
                {available ? `${book.available} copies currently available` : "Currently unavailable"}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={!available || isBorrowed}
                onClick={handleIssue}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <BookOpen size={18} />
                {isBorrowed ? "Already borrowed" : available ? "Issue this book" : "Not available"}
              </button>
              <Link
                to="/dashboard"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 hover:border-emerald-800 hover:text-emerald-900"
              >
                <ShieldCheck size={18} /> My library
              </Link>
            </div>

            <p className="mt-4 text-xs leading-6 text-slate-500">
              Demo library: issuing a book requires member login. Book issues
              are simulated locally and do not contact a real college library.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}