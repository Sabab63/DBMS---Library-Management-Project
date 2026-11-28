import "../CSS/LibrarySearch.css";
import { useState } from "react";
import {useNavigate } from "react-router-dom";


function LibrarySearch() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleSearch(event) {
        event.preventDefault();
        const searchParams = new URLSearchParams();
        const normalizedQuery = query.trim();

        if (normalizedQuery) {
            searchParams.set("q", normalizedQuery);
        }

        navigate(`/books${searchParams.size ? `?${searchParams}` : ""}`);
    }

    return (
        <section className="library-search-panel" aria-label="Library catalogue">
            <form className="library-search-form" role="search" onSubmit={handleSearch}>
                <label className="visually-hidden" htmlFor="library-search">
                    Search library resources
                </label>
                <input
                    id="library-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search for books, ebooks, journals and repository items..."
                />
                <button type="submit" aria-label="Search">
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    >
                        <circle cx="10.8" cy="10.8" r="7.1" />
                        <path d="m16 16 5 5" />
                    </svg>
                </button>
            </form>

            
        </section>
    );
}

export default LibrarySearch;
