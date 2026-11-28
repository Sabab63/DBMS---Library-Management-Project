import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import "../CSS/Books.css";

const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", year: 1925, available: 3, cover: "gatsby", initials: "GG" },
    { id: 2, title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", year: 1988, available: 1, cover: "time", initials: "BH" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", year: 1960, available: 0, cover: "mockingbird", initials: "TK" },
    { id: 4, title: "The Design of Everyday Things", author: "Don Norman", category: "Design", year: 1988, available: 4, cover: "design", initials: "DE" },
    { id: 5, title: "Sapiens", author: "Yuval Noah Harari", category: "History", year: 2011, available: 2, cover: "sapiens", initials: "SA" },
    { id: 6, title: "Clean Code", author: "Robert C. Martin", category: "Technology", year: 2008, available: 5, cover: "code", initials: "CC" },
    { id: 7, title: "The Midnight Library", author: "Matt Haig", category: "Fiction", year: 2020, available: 2, cover: "midnight", initials: "ML" },
    { id: 8, title: "The Selfish Gene", author: "Richard Dawkins", category: "Science", year: 1976, available: 0, cover: "gene", initials: "SG" },
    { id: 9, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Psychology", year: 2011, available: 3, cover: "thinking", initials: "TF" },
];

function BooksPage() {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [category, setCategory] = useState("All categories");
    const [availability, setAvailability] = useState("All");

    const categories = ["All categories", ...new Set(books.map((book) => book.category))];

    const filteredBooks = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return books.filter((book) => {
            const matchesQuery =
                !normalizedQuery ||
                book.title.toLowerCase().includes(normalizedQuery) ||
                book.author.toLowerCase().includes(normalizedQuery);
            const matchesCategory =
                category === "All categories" || book.category === category;
            const matchesAvailability =
                availability === "All" ||
                (availability === "Available" && book.available > 0) ||
                (availability === "Unavailable" && book.available === 0);

            return matchesQuery && matchesCategory && matchesAvailability;
        });
    }, [query, category, availability]);

    return (
        <div className="books-page">
            <Header />

            <main className="books-main">
                <div className="books-heading">
                    <div>
                        <Link className="books-breadcrumb" to="/">Library</Link>
                        <span aria-hidden="true"> / </span>
                        <span>Catalogue</span>
                    </div>
                    <h1>Explore our books</h1>
                    <p>{filteredBooks.length} title{filteredBooks.length === 1 ? "" : "s"} found</p>
                </div>

                <section className="books-toolbar" aria-label="Book filters">
                    <label className="books-search">
                        <span className="visually-hidden">Search books</span>
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="10.8" cy="10.8" r="7.1" />
                            <path d="m16 16 5 5" />
                        </svg>
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search by title or author"
                        />
                    </label>

                    <label className="books-select">
                        <span className="visually-hidden">Category</span>
                        <select value={category} onChange={(event) => setCategory(event.target.value)}>
                            {categories.map((item) => <option key={item}>{item}</option>)}
                        </select>
                    </label>

                    <label className="books-select">
                        <span className="visually-hidden">Availability</span>
                        <select value={availability} onChange={(event) => setAvailability(event.target.value)}>
                            <option>All</option>
                            <option>Available</option>
                            <option>Unavailable</option>
                        </select>
                    </label>
                </section>

                {filteredBooks.length > 0 ? (
                    <section className="books-grid" aria-label="Library books">
                        {filteredBooks.map((book) => (
                            <article className="book-card" key={book.id}>
                                <div className={`book-cover book-cover-${book.cover}`} aria-label={`${book.title} cover`}>
                                    <span className="book-cover-mark">{book.initials}</span>
                                    <div className="book-cover-lines" aria-hidden="true">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </div>
                                <div className="book-details">
                                    <span className="book-category">{book.category}</span>
                                    <h2>{book.title}</h2>
                                    <p className="book-author">by {book.author}</p>
                                    <div className="book-meta">
                                        <span>{book.year}</span>
                                        <span className={book.available ? "status-available" : "status-unavailable"}>
                                            {book.available ? `${book.available} available` : "Unavailable"}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                ) : (
                    <section className="books-empty">
                        <h2>No books found</h2>
                        <p>Try a different title, author, or filter.</p>
                        <button type="button" onClick={() => {
                            setQuery("");
                            setCategory("All categories");
                            setAvailability("All");
                        }}>
                            Clear filters
                        </button>
                    </section>
                )}
            </main>
        </div>
    );
}

export default BooksPage;
