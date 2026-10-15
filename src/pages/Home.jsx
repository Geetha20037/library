import {
  ArrowDown,
  ArrowRight,
  BookMarked,
  BookOpen,
  CalendarDays,
  Clock,
  GraduationCap,
  Headphones,
  LibraryBig,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import SectionHeading from "../components/SectionHeading";
import { useLibrary } from "../context/LibraryContext";
import { categories } from "../data/books";

const categoryInfo = [
  { name: "Technology", icon: LibraryBig, color: "bg-[#e5eee7]" },
  { name: "Fiction", icon: BookOpen, color: "bg-[#f5e8dc]" },
  { name: "Finance", icon: Sparkles, color: "bg-[#f2edda]" },
  { name: "Biography", icon: GraduationCap, color: "bg-[#e8e7f2]" },
  { name: "Self Development", icon: Users, color: "bg-[#f3e4e7]" },
  { name: "Productivity", icon: BookMarked, color: "bg-[#dfeaf0]" },
];

const services = [
  {
    icon: BookOpen,
    title: "Book borrowing",
    description:
      "Explore our curated collection and borrow books for your academic and personal growth.",
  },
  {
    icon: Search,
    title: "Research support",
    description:
      "Find the right learning resources, reference books, and reading material for your studies.",
  },
  {
    icon: Headphones,
    title: "Quiet study spaces",
    description:
      "Discover a calm, welcoming environment designed for focused learning and reflection.",
  },
  {
    icon: CalendarDays,
    title: "Reading programs",
    description:
      "Build a consistent reading habit and discover fresh perspectives through new books.",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const { books, user, issueBook, showNotice } = useLibrary();
  const navigate = useNavigate();

  const featuredBooks = books.filter((book) => book.featured).slice(0, 4);

  function searchBooks(event) {
    event.preventDefault();
    navigate(`/books?q=${encodeURIComponent(query.trim())}`);
  }

  function handleIssue(id) {
    const result = issueBook(id);

    if (!result.success && !user) {
      navigate("/login", { state: { from: `/books/${id}` } });
      return;
    }

    showNotice(result.message);
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-[#f5f3eb]">
        <div className="pointer-events-none absolute -right-24 -top-20 size-80 rounded-full bg-[#dfe8d8]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-0 size-72 rounded-full bg-[#e7d9bd]/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12 lg:pb-24 lg:pt-20">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/75 px-3.5 py-2 text-xs font-semibold text-emerald-950">
              <Sparkles size={14} />
              YOUR CAMPUS, YOUR KNOWLEDGE
            </div>

            <h1 className="max-w-3xl font-display text-[clamp(2.8rem,7vw,5.7rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-[#18372e]">
              Every book opens a{" "}
              <span className="italic text-[#a17b46]">new world.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Your campus library, reimagined. Discover inspiring reads,
              explore new ideas, and find the knowledge that moves you forward.
            </p>

            <form
              onSubmit={searchBooks}
              className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_12px_35px_rgba(20,40,30,0.07)] focus-within:border-emerald-800"
            >
              <Search size={20} className="ml-2 shrink-0 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, author, or subject..."
                aria-label="Search books by title, author, or subject"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[#287653] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1d5d40] sm:px-6"
              >
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-emerald-800" />
                Easy book discovery
              </span>
              <span className="flex items-center gap-2">
                <Clock size={17} className="text-emerald-800" />
                Track your due dates
              </span>
            </div>

            <a
              href="#featured"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-950 transition hover:gap-3"
            >
              Explore the collection <ArrowDown size={16} />
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -left-3 top-12 z-10 hidden rounded-2xl border border-white bg-white/95 p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-[#e5eee7] text-emerald-950">
                  <BookOpen size={21} />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">Find your next read</p>
                  <p className="mt-1 text-xs text-slate-500">Knowledge awaits you</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-[#deded0] p-3 sm:p-5">
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85"
                alt="Warm, inviting library with bookshelves and study spaces"
                className="h-[350px] w-full rounded-[1.5rem] object-cover sm:h-[450px] lg:h-[530px]"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/30 bg-[#112d25]/90 p-5 text-white backdrop-blur-md sm:inset-x-9 sm:bottom-9 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                  The joy of learning
                </p>
                <p className="mt-2 font-display text-2xl sm:text-3xl">
                  A little reading. A lot of growth.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-2 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:block lg:-right-5">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-[#f1ead9] text-[#856638]">
                  <GraduationCap size={22} />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">Learn at your pace</p>
                  <p className="mt-1 text-xs text-slate-500">One page at a time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-5 px-5 py-8 sm:px-8 md:grid-cols-4 lg:px-12">
          {[
            { value: String(books.length).padStart(2, "0"), label: "Books to explore" },
            { value: String(categories.length - 1).padStart(2, "0"), label: "Book categories" },
            { value: "14", label: "Demo borrowing period (days)" },
            { value: "365", label: "Days of discovery" },
          ].map((stat) => (
            <div key={stat.label} className="py-2 md:text-center">
              <p className="font-display text-3xl font-semibold text-emerald-950 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="featured" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="THE LIBRARY EDIT"
              title="Books worth your time."
              description="Handpicked titles to inspire your next idea, sharpen your skills, and take your curiosity further."
            />
            <Link
              to="/books"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:gap-3"
            >
              View all books <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} onIssue={handleIssue} />
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-24 bg-[#f5f3eb] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="FIND YOUR INTEREST"
            title="A shelf for every curiosity."
            description="From technical knowledge to timeless stories, choose a category and follow your curiosity."
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categoryInfo.map(({ name, icon: Icon, color }) => (
              <Link
                key={name}
                to={`/books?category=${encodeURIComponent(name)}`}
                className="group rounded-2xl border border-slate-200/70 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-emerald-800/30 hover:shadow-lg sm:p-5"
              >
                <span className={`mb-5 grid size-12 place-items-center rounded-xl ${color} text-emerald-950 transition group-hover:scale-105`}>
                  <Icon size={23} />
                </span>
                <h3 className="text-sm font-semibold leading-5 text-slate-900">
                  {name}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 group-hover:text-emerald-900">
                  Explore <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="MORE THAN BOOKS"
            title="Your library, here for you."
            description="A supportive learning space for students to explore resources, develop skills, and enjoy the process of learning."
            align="center"
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-800/30 hover:shadow-lg sm:p-7"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-[#e5eee7] text-emerald-950">
                  <Icon size={24} />
                </span>
                <p className="mb-3 mt-6 text-xs font-bold tracking-widest text-[#a17b46]">
                  0{index + 1}
                </p>
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="guidelines" className="scroll-mt-24 bg-[#f5f3eb] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="A SHARED SPACE"
              title="A few simple rules. A better library."
              description="Help us maintain a welcoming, comfortable environment where everyone can learn."
            />
            <Link
              to="/books"
              className="inline-flex items-center gap-2 rounded-xl bg-[#287653] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1d5d40]"
            >
              Find your next book <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                number: "01",
                title: "Return books on time",
                text: "The demo borrowing period is 14 days. Return books by their due date.",
              },
              {
                number: "02",
                title: "Respect quiet spaces",
                text: "Keep conversations low and silence your phone in reading areas.",
              },
              {
                number: "03",
                title: "Handle books with care",
                text: "Keep library resources clean, safe, and ready for the next reader.",
              },
              {
                number: "04",
                title: "Keep your account updated",
                text: "Use your member dashboard to track borrowed books and due dates.",
              },
            ].map((rule) => (
              <article key={rule.number} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <span className="text-xs font-bold tracking-widest text-[#a17b46]">
                  {rule.number}
                </span>
                <h3 className="mt-3 font-semibold text-slate-900">{rule.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{rule.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 overflow-hidden rounded-[2rem] bg-[#e9ede2] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-900">
              YOUR NEXT CHAPTER STARTS HERE
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-[#18372e] sm:text-4xl">
              Make room for a little more knowledge.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
              Browse the collection, find your next favorite, and keep track of
              your reading journey.
            </p>
          </div>
          <Link
            to={user ? "/dashboard" : "/login"}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#287653] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#1d5d40]"
          >
            {user ? "My dashboard" : "Join the library"} <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
