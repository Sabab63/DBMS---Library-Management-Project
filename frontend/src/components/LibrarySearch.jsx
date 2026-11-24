import "../CSS/LibrarySearch.css";

const resources = [
    "Classic Catalogue",
    "Databases A-Z",
    "Institutional Repository",
    "Data Repository",
];

function LibrarySearch() {
    return (
        <section className="library-search-panel" aria-label="Library catalogue">
            <div className="library-search-form" role="search">
                <label className="visually-hidden" htmlFor="library-search">
                    Search library resources
                </label>
                <input
                    id="library-search"
                    type="search"
                    placeholder="Search for books, ebooks, journals and repository items..."
                />
                <button type="button" aria-label="Search">
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
            </div>

            <nav className="library-search-resources" aria-label="Library resources">
                {resources.map((resource) => (
                    <span key={resource}>{resource}</span>
                ))}
            </nav>
        </section>
    );
}

export default LibrarySearch;
