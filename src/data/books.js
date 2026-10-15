const books = [
  {
    id: 1,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    isbn: "9780857197689",
    year: 2020,
    rating: 4.8,
    copies: 5,
    available: 4,
    featured: true,
    description:
      "A collection of timeless lessons about wealth, greed, happiness, and how people think about money. Explore the behavior and decisions that shape financial success.",
    cover:
      "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    isbn: "9780735211292",
    year: 2018,
    rating: 4.9,
    copies: 6,
    available: 3,
    featured: true,
    description:
      "A practical guide to building good habits, breaking bad ones, and making small improvements that compound into remarkable results.",
    cover:
      "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    isbn: "9780132350884",
    year: 2008,
    rating: 4.7,
    copies: 4,
    available: 2,
    featured: true,
    description:
      "Learn the principles, patterns, and practices of writing readable, maintainable, and professional software.",
    cover:
      "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    isbn: "9780062315007",
    year: 1988,
    rating: 4.7,
    copies: 5,
    available: 5,
    featured: true,
    description:
      "A young shepherd travels in search of treasure and discovers a story about purpose, courage, and listening to your heart.",
    cover:
      "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
  },
  {
    id: 5,
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    isbn: "9781455586691",
    year: 2016,
    rating: 4.6,
    copies: 3,
    available: 1,
    featured: false,
    description:
      "Discover how focused, distraction-free work can help you learn difficult skills and produce meaningful results.",
    cover:
      "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
  },
  {
    id: 6,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Technology",
    isbn: "9780262046305",
    year: 2022,
    rating: 4.8,
    copies: 4,
    available: 0,
    featured: false,
    description:
      "A comprehensive textbook covering algorithms, data structures, computational complexity, and algorithmic problem-solving.",
    cover:
      "https://covers.openlibrary.org/b/isbn/9780262046305-L.jpg",
  },
  {
    id: 7,
    title: "Ikigai",
    author: "Héctor García",
    category: "Self Development",
    isbn: "9780143130727",
    year: 2016,
    rating: 4.5,
    copies: 5,
    available: 3,
    featured: false,
    description:
      "Explore ideas about purpose, daily rituals, meaningful work, and the small practices that make life fulfilling.",
    cover:
      "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg",
  },
  {
    id: 8,
    title: "Wings of Fire",
    author: "A. P. J. Abdul Kalam",
    category: "Biography",
    isbn: "9788173711466",
    year: 1999,
    rating: 4.9,
    copies: 5,
    available: 4,
    featured: true,
    description:
      "The inspiring autobiography of A. P. J. Abdul Kalam, following his journey from childhood to becoming a renowned aerospace scientist.",
    cover:
      "https://covers.openlibrary.org/b/isbn/9788173711466-L.jpg",
  },
  {
    id: 9,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    isbn: "9780743273565",
    year: 1925,
    rating: 4.4,
    copies: 4,
    available: 2,
    featured: false,
    description:
      "A classic novel exploring ambition, wealth, love, and the elusive promise of the American dream.",
    cover:
      "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
  },
  {
    id: 10,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Finance",
    isbn: "9781585424337",
    year: 1937,
    rating: 4.5,
    copies: 3,
    available: 2,
    featured: false,
    description:
      "A classic personal achievement book examining goal setting, persistence, and the habits behind pursuing success.",
    cover:
      "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg",
  },
  {
    id: 11,
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    category: "Technology",
    isbn: "9780135957059",
    year: 2019,
    rating: 4.8,
    copies: 4,
    available: 2,
    featured: false,
    description:
      "Practical advice for improving your software development skills, making better engineering decisions, and growing as a programmer.",
    cover:
      "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg",
  },
  {
    id: 12,
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    category: "Biography",
    isbn: "9780807014271",
    year: 1946,
    rating: 4.8,
    copies: 3,
    available: 1,
    featured: false,
    description:
      "A profound reflection on resilience, human dignity, and the search for meaning through difficult experiences.",
    cover:
      "https://covers.openlibrary.org/b/isbn/9780807014271-L.jpg",
  },
];

export const categories = [
  "All Books",
  "Technology",
  "Fiction",
  "Finance",
  "Biography",
  "Self Development",
  "Productivity",
];

export default books;