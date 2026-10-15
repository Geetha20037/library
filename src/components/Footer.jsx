import {
  ArrowRight,
  BookOpen,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#102b25] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-14 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-white/10">
                <BookOpen size={23} />
              </span>
              <span className="font-display text-2xl font-bold">LIBRORA</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-emerald-50/70">
              A space for curiosity, discovery, and lifelong learning. Your
              next great idea begins with a book.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full border border-white/20 transition hover:bg-white hover:text-emerald-950"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid size-10 place-items-center rounded-full border border-white/20 text-sm font-bold transition hover:bg-white hover:text-emerald-950"
              >
                in
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold">Explore</h3>
            <div className="flex flex-col gap-3 text-sm text-emerald-50/70">
              <Link className="hover:text-white" to="/">Home</Link>
              <Link className="hover:text-white" to="/books">Browse all books</Link>
              <Link className="hover:text-white" to="/login">Student login</Link>
              <Link className="hover:text-white" to="/dashboard">My dashboard</Link>
              <a className="hover:text-white" href="/#guidelines">Library rules</a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold">Library hours</h3>
            <div className="flex items-start gap-3 text-sm leading-6 text-emerald-50/70">
              <Clock3 size={18} className="mt-1 shrink-0" />
              <div>
                <p>Monday - Friday</p>
                <p className="text-white">8:00 AM - 8:00 PM</p>
                <p className="mt-2">Saturday</p>
                <p className="text-white">9:00 AM - 5:00 PM</p>
                <p className="mt-2">Sunday & holidays: Closed</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold">Get in touch</h3>
            <div className="flex flex-col gap-4 text-sm text-emerald-50/70">
              <p className="flex items-start gap-3 leading-6">
                <MapPin size={18} className="mt-1 shrink-0" />
                College Campus, Library Block, India
              </p>
              <a
                href="mailto:library@example.edu"
                className="flex items-center gap-3 hover:text-white"
              >
                <Mail size={18} /> library@example.edu
              </a>
              <a
                href="tel:+910000000000"
                className="flex items-center gap-3 hover:text-white"
              >
                <Phone size={18} /> +91 90000 00000
              </a>
              <Link
                to="/books"
                className="mt-1 inline-flex items-center gap-2 font-semibold text-white hover:text-emerald-200"
              >
                Discover books <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-emerald-50/60 sm:flex-row sm:items-center sm:justify-between">
          <p>Â© {new Date().getFullYear()} LIBRORA College Library. Demo project.</p>
          <p>Read more. Discover more. Become more.</p>
        </div>
      </div>
    </footer>
  );
}




