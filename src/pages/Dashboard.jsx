import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  History,
  Library,
  LogOut,
  RotateCcw,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getDueStatus(date) {
  const due = new Date(date);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const days = Math.round((due - today) / (1000 * 60 * 60 * 24));

  if (days < 0) {
    return { label: `${Math.abs(days)} day(s) overdue`, className: "text-rose-700 bg-rose-50" };
  }

  if (days === 0) {
    return { label: "Due today", className: "text-amber-800 bg-amber-50" };
  }

  return { label: `${days} day(s) remaining`, className: "text-emerald-800 bg-emerald-50" };
}

export default function Dashboard() {
  const {
    user,
    books,
    borrowedBooks,
    history,
    returnBook,
    showNotice,
    logout,
  } = useLibrary();

  const navigate = useNavigate();

  const activeBooks = borrowedBooks
    .map((record) => ({
      ...record,
      book: books.find((book) => book.id === record.bookId),
    }))
    .filter((record) => record.book);

  const uniqueBooksRead = new Set(history.map((item) => item.bookId)).size;

  function handleReturn(bookId) {
    const result = returnBook(bookId);
    showNotice(result.message);
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  if (!user) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-[#fbfaf6] px-5 pt-24 text-center">
        <div className="max-w-md">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#e5eee7] text-emerald-950">
            <UserRound size={29} />
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold text-slate-900">
            Your library awaits.
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Sign in to manage borrowed books and keep track of your reading history.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-950 px-5 py-3.5 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Student login <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6] px-5 pb-16 pt-[100px] sm:px-8 sm:pb-24 sm:pt-28 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-900">
              YOUR STUDENT SPACE
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#18372e] sm:text-4xl lg:text-5xl">
              Welcome back, {user.name.split(" ")[0]}.
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Your reading journey, all in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:text-rose-700"
          >
            <LogOut size={17} /> Sign out
          </button>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Books borrowed",
              value: activeBooks.length,
              icon: BookOpen,
              color: "bg-[#e5eee7]",
            },
            {
              label: "Books read / returned",
              value: uniqueBooksRead,
              icon: CheckCircle2,
              color: "bg-[#f1ead9]",
            },
            {
              label: "Reading activities",
              value: history.length,
              icon: History,
              color: "bg-[#e5e8f1]",
            },
            {
              label: "Days per issue",
              value: 14,
              icon: CalendarDays,
              color: "bg-[#f1e5e8]",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className={`grid size-11 place-items-center rounded-xl ${color} text-emerald-950`}>
                  <Icon size={22} />
                </span>
                <span className="font-display text-3xl font-semibold text-slate-900">{value}</span>
              </div>
              <p className="mt-5 text-sm text-slate-500">{label}</p>
            </article>
          ))}
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_0.8fr]">
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl font-semibold text-slate-900">
                  My borrowed books
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Keep an eye on your active issues and due dates.
                </p>
              </div>
              <Link
                to="/books"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-900 hover:gap-3"
              >
                Find more books <ArrowRight size={16} />
              </Link>
            </div>

            {activeBooks.length ? (
              <div className="mt-6 space-y-4">
                {activeBooks.map((record) => {
                  const status = getDueStatus(record.dueAt);

                  return (
                    <article
                      key={record.bookId}
                      className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-[#fbfaf6] p-4 sm:flex-row sm:items-center sm:p-5"
                    >
                      <img
                        src={record.book.cover}
                        alt={`${record.book.title} cover`}
                        className="h-32 w-24 shrink-0 rounded-lg bg-[#eeece2] object-contain p-1"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />

                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-medium text-emerald-900">
                          {record.book.category}
                        </span>
                        <Link to={`/books/${record.book.id}`}>
                          <h3 className="mt-1 font-display text-xl font-semibold text-slate-900 hover:text-emerald-900">
                            {record.book.title}
                          </h3>
                        </Link>
                        <p className="mt-1 text-sm text-slate-500">
                          {record.book.author}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={14} /> Issued {formatDate(record.borrowedAt)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock3 size={14} /> Due {formatDate(record.dueAt)}
                          </span>
                        </div>
                        <span className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}>
                          {status.label}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleReturn(record.bookId)}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-800 hover:text-emerald-900 sm:self-center"
                      >
                        <RotateCcw size={15} /> Return
                      </button>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-5 py-12 text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-xl bg-[#e5eee7] text-emerald-950">
                  <BookOpen size={23} />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-slate-900">
                  Your reading list starts here.
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  You don't have any active borrowed books yet.
                </p>
                <Link
                  to="/books"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  Browse the collection <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl bg-[#17392e] p-6 text-white sm:p-7">
              <span className="grid size-12 place-items-center rounded-xl bg-white/10">
                <GraduationCap size={25} />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold">
                Member profile
              </h2>
              <p className="mt-4 text-xs font-medium uppercase tracking-widest text-emerald-200">
                Student name
              </p>
              <p className="mt-1 break-words text-sm font-semibold">{user.name}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-widest text-emerald-200">
                Email address
              </p>
              <p className="mt-1 break-all text-sm">{user.email}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-widest text-emerald-200">
                Demo member ID
              </p>
              <p className="mt-1 text-sm">{user.memberId}</p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-slate-900">
                <History size={20} className="text-emerald-900" />
                Reading history
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Your latest borrowing and return activities.
              </p>

              {history.length ? (
                <div className="mt-5 space-y-4">
                  {history.slice(0, 6).map((item, index) => (
                    <div key={`${item.bookId}-${item.date}-${index}`} className="flex items-start gap-3">
                      <span className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ${item.action === "Returned" ? "bg-[#f1ead9] text-amber-800" : "bg-[#e5eee7] text-emerald-900"}`}>
                        {item.action === "Returned" ? <RotateCcw size={15} /> : <BookOpen size={15} />}
                      </span>
                      <div className="min-w-0">
                        <p className="break-words text-sm font-semibold text-slate-800">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.action} · {formatDate(item.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 rounded-xl bg-[#fbfaf6] p-4 text-sm leading-6 text-slate-500">
                  Your reading history will appear here when you borrow or return a book.
                </p>
              )}
            </section>

            <div className="rounded-2xl border border-emerald-900/10 bg-[#e5eee7] p-5">
              <div className="flex items-start gap-3">
                <Clock3 size={20} className="mt-0.5 shrink-0 text-emerald-950" />
                <div>
                  <h3 className="font-semibold text-emerald-950">Remember your due dates</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Demo books are issued for 14 days. Return books on time so other students can enjoy them too.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}