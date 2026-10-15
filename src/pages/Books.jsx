import { useMemo, useState } from "react";
import { BookOpen, Search, SlidersHorizontal, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import SectionHeading from "../components/SectionHeading";
import { useLibrary } from "../context/LibraryContext";
import { categories } from "../data/books";

export default function Books() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "All Books");
  const [availability, setAvailability] = useState("All");

  const { books, user, issueBook, showNotice } = useLibrary();

  const filteredBooks = useMemo(() => {
    const search = query.trim().toLowerCase();

    return books.filter((book) => {
      const matchesSearch =
        !search ||
        [book.title, book.author, book.category, book.isbn]
          .some((value) => String(value).toLowerCase().includes(search));

      const matchesCategory =
        category === "All Books" || book.category === category;

      const matchesAvailability =
        availability === "All" ||
        (availability === "Available" && book.available > 0) ||
        (availability === "Unavailable" && book.available === 0);

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [books, query, category, availability]);

  function handleIssue(id) {
    const result = issueBook(id);

    if (!result.success && !user) {
      navigate("/login", { state: { from: `/books/${id}` } });
      return;
    }

    showNotice(result.message);
  }

  function clearFilters() {
    setQuery("");
    setCategory("All Books");
    setAvailability("All");
    navigate("/books", { replace: true });
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6] pt-[72px]">
      <section className="border-b border-slate-200 bg-[#f0efe6] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-emerald-900">
            THE LIBRARY COLLECTION
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-[#18372e] sm:text-5xl lg:text-6xl">
            Good books. Great ideas. Endless possibilities.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Search the collection, discover new subjects, and find the right
            book for your next study session.
          </p>

          <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm focus-within:border-emerald-800">
            <Search size={21} className="shrink-0 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, author, category, or ISBN..."
              aria-label="Search the library collection"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="EXPLORE & DISCOVER"
            title="The book collection."
            description="Find your next read from our growing demo library."
          />
          <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
            <BookOpen size={18} />
            <span>
              <strong className="text-slate-900">{filteredBooks.length}</strong>{" "}
              {filteredBooks.length === 1 ? "book" : "books"} found
            </span>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <SlidersHorizontal size={17} />
            Refine your search
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                  category === item
                    ? "border-emerald-950 bg-emerald-950 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-800 hover:text-emerald-900"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <div className="flex flex-wrap gap-2">
              {["All", "Available", "Unavailable"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setAvailability(item)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                    availability === item
                      ? "bg-[#e5eee7] text-emerald-950"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {(query || category !== "All Books" || availability !== "All") && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900"
              >
                <X size={14} /> Clear filters
              </button>
            )}
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} onIssue={handleIssue} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#e5eee7] text-emerald-900">
              <Search size={25} />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold text-slate-900">
              No books found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try a different title, author, or category.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Show all books
            </button>
          </div>
        )}
      </section>
    </main>
  );
}