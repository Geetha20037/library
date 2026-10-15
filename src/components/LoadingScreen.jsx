import { useEffect, useState } from "react";

const books = [
  { title: "THE ART OF THINKING", color: "#24483D", width: "w-16" },
  { title: "A THOUSAND STORIES", color: "#9D493B", width: "w-20" },
  { title: "THE QUIET UNIVERSE", color: "#D4AD72", width: "w-14" },
  { title: "BEYOND THE PAGES", color: "#343D59", width: "w-16" },
];

export default function LoadingScreen() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % books.length);
    }, 650);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f1e8] px-5 text-[#242c26]">
      <div className="absolute left-0 top-0 h-1 w-full bg-[#e4ddd0]" />
      <div className="absolute left-0 top-0 h-1 w-1/3 origin-left animate-[shelfProgress_2s_ease-in-out_infinite] bg-[#24483d]" />

      <div className="absolute left-6 top-7 text-[10px] font-semibold tracking-[0.28em] text-[#74796d] sm:left-10 sm:top-10">
        L / R — LIBRARY SYSTEM
      </div>

      <div className="absolute right-6 top-7 text-[10px] tracking-[0.2em] text-[#74796d] sm:right-10 sm:top-10">
        EST. FOR READERS
      </div>

      <section className="relative flex w-full max-w-md flex-col items-center text-center">
        <div className="mb-8 flex items-center gap-2">
          <span className="h-px w-8 bg-[#b8a88d]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#77796b]">
            A place between worlds
          </span>
          <span className="h-px w-8 bg-[#b8a88d]" />
        </div>

        <div className="relative mb-10 flex h-52 w-full items-end justify-center overflow-hidden">
          <div className="absolute bottom-5 h-2 w-64 rounded-full bg-[#d8cdbb] blur-md" />

          <div className="relative flex h-40 w-full items-end justify-center gap-1.5 px-2 [perspective:800px]">
            {books.map((book, index) => (
              <div
                key={book.title}
                className={`${book.width} relative flex h-32 shrink-0 items-center justify-center overflow-hidden rounded-t-[3px] border-l-[5px] border-white/20 px-2 shadow-[4px_5px_0_rgba(36,44,38,0.08)] transition-all duration-500 ease-in-out`}
                style={{
                  backgroundColor: book.color,
                  transform: `translateY(${active === index ? "-14px" : "0px"}) rotateY(${index % 2 === 0 ? "-5deg" : "5deg"})`,
                  opacity: active === index ? 1 : 0.78,
                }}
              >
                <span className="absolute left-2 top-0 h-full w-px bg-white/20" />
                <div className="flex h-[88%] w-full flex-col items-center justify-center border-y border-white/25 px-1">
                  <span className="text-[7px] uppercase tracking-[0.22em] text-white/70">
                    LIBRORA EDITIONS
                  </span>
                  <span className="mt-3 text-[9px] font-semibold leading-4 tracking-[0.13em] text-white">
                    {book.title}
                  </span>
                  <span className="mt-3 text-[8px] text-white/60">✳</span>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-[8%] right-[8%] h-[3px] rounded-full bg-[#b8a88d]" />
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#77796b]">
          Welcome to
        </p>

        <h1 className="mt-3 text-5xl font-semibold tracking-[0.16em] text-[#24483d] sm:text-6xl">
          LIBRORA
        </h1>

        <p className="mt-4 max-w-xs text-sm leading-6 text-[#77796b]">
          A thousand stories. Endless possibilities.
        </p>

        <div className="mt-10 flex items-center gap-3">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="size-1.5 rounded-full bg-[#24483d] transition-all duration-300"
                style={{
                  opacity: active === dot ? 1 : 0.25,
                  transform: active === dot ? "scale(1.35)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#77796b]">
            Preparing your next chapter
          </span>
        </div>
      </section>

      <div className="absolute bottom-7 left-6 text-[9px] tracking-[0.18em] text-[#888778] sm:bottom-10 sm:left-10">
        READ · REFLECT · REPEAT
      </div>

      <div className="absolute bottom-7 right-6 text-[9px] tracking-[0.18em] text-[#888778] sm:bottom-10 sm:right-10">
        YOUR STORY STARTS HERE
      </div>

      <style>{`
        @keyframes shelfProgress {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(330%); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

