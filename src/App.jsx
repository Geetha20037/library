import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CheckCircle2, X } from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ProtectedRoute from "./components/ProtectedRoute";

import { LibraryProvider, useLibrary } from "./context/LibraryContext";

import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function AppContent() {
  const location = useLocation();
  const { notice, showNotice } = useLibrary();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fbfaf6] text-slate-900">
      <Navbar />

      {notice && (
        <div className="fixed right-4 top-20 z-[70] w-[calc(100%-2rem)] max-w-sm animate-slide-in rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-xl sm:right-6 sm:top-24">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#e5eee7] text-emerald-900">
              <CheckCircle2 size={19} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900">
                Library update
              </p>
              <p role="status" className="mt-1 break-words text-sm leading-6 text-slate-600">
                {notice}
              </p>
            </div>
            <button
              type="button"
              onClick={() => showNotice("")}
              aria-label="Dismiss notification"
              className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-900"
            >
              <X size={17} />
            </button>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <LibraryProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LibraryProvider>
  );
}
