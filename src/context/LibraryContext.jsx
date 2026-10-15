import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import initialBooks from "../data/books";

const LibraryContext = createContext(null);

const BOOKS_KEY = "librora-books-v1";
const USER_KEY = "librora-user-v1";
const BORROWED_KEY = "librora-borrowed-v1";
const HISTORY_KEY = "librora-history-v1";

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(() =>
    readStorage(BOOKS_KEY, initialBooks),
  );

  const [user, setUser] = useState(() =>
    readStorage(USER_KEY, null),
  );

  const [borrowedBooks, setBorrowedBooks] = useState(() =>
    readStorage(BORROWED_KEY, []),
  );

  const [history, setHistory] = useState(() =>
    readStorage(HISTORY_KEY, []),
  );

  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(BORROWED_KEY, JSON.stringify(borrowedBooks));
  }, [borrowedBooks]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const showNotice = useCallback((message) => {
    setNotice(message);
  }, []);

  const login = useCallback((name, email) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim() || !normalizedEmail) {
      return { success: false, message: "Enter your name and email." };
    }

    const nextUser = {
      name: name.trim(),
      email: normalizedEmail,
      memberId: "LIB" + normalizedEmail.replace(/[^a-z0-9]/g, "").slice(0, 8).toUpperCase(),
    };

    setUser(nextUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    showNotice("You have signed out.");
  }, [showNotice]);

  const issueBook = useCallback(
    (bookId) => {
      if (!user) {
        return { success: false, message: "Please sign in to issue a book." };
      }

      const book = books.find((item) => item.id === bookId);

      if (!book) {
        return { success: false, message: "Book not found." };
      }

      if (borrowedBooks.some((item) => item.bookId === bookId)) {
        return {
          success: false,
          message: "You have already borrowed this book.",
        };
      }

      if (book.available <= 0) {
        return { success: false, message: "This book is currently unavailable." };
      }

      const borrowedAt = new Date();
      const dueAt = new Date();
      dueAt.setDate(dueAt.getDate() + 14);

      const record = {
        bookId,
        borrowedAt: borrowedAt.toISOString(),
        dueAt: dueAt.toISOString(),
      };

      setBorrowedBooks((previous) => [...previous, record]);

      setBooks((previous) =>
        previous.map((item) =>
          item.id === bookId
            ? { ...item, available: Math.max(0, item.available - 1) }
            : item,
        ),
      );

      setHistory((previous) => [
        {
          bookId,
          title: book.title,
          action: "Borrowed",
          date: borrowedAt.toISOString(),
        },
        ...previous,
      ]);

      return { success: true, message: `"${book.title}" has been issued successfully.` };
    },
    [user, books, borrowedBooks],
  );

  const returnBook = useCallback(
    (bookId) => {
      const record = borrowedBooks.find((item) => item.bookId === bookId);

      if (!record) {
        return { success: false, message: "This book is not in your borrowed list." };
      }

      const book = books.find((item) => item.id === bookId);

      setBorrowedBooks((previous) =>
        previous.filter((item) => item.bookId !== bookId),
      );

      setBooks((previous) =>
        previous.map((item) =>
          item.id === bookId
            ? { ...item, available: Math.min(item.copies, item.available + 1) }
            : item,
        ),
      );

      setHistory((previous) => [
        {
          bookId,
          title: book?.title ?? "Library book",
          action: "Returned",
          date: new Date().toISOString(),
        },
        ...previous,
      ]);

      return { success: true, message: "Book returned successfully." };
    },
    [borrowedBooks, books],
  );

  const value = useMemo(
    () => ({
      books,
      user,
      borrowedBooks,
      history,
      notice,
      showNotice,
      login,
      logout,
      issueBook,
      returnBook,
    }),
    [
      books,
      user,
      borrowedBooks,
      history,
      notice,
      showNotice,
      login,
      logout,
      issueBook,
      returnBook,
    ],
  );

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);

  if (!context) {
    throw new Error("useLibrary must be used inside LibraryProvider.");
  }

  return context;
}