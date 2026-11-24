import { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/LibraryLogin.css";

function LibraryLoginPage() {
    const [message, setMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setMessage("Sign-in is not connected yet.");
    }

    return (
        <main className="library-login-page">
            <section className="library-login-card" aria-labelledby="library-login-title">
                <Link className="library-login-home" to="/">
                    Library
                </Link>
                <h1 id="library-login-title">Welcome back</h1>
                <p className="library-login-intro">Sign in to your library account.</p>

                <form className="library-login-form" onSubmit={handleSubmit}>
                    <label htmlFor="library-username">Library ID</label>
                    <input
                        id="library-username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                    />

                    <label htmlFor="library-password">Password</label>
                    <input
                        id="library-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                    />

                    <button type="submit">Sign in</button>
                    <p className="library-login-message" role="status">
                        {message}
                    </p>
                </form>

                <Link className="library-login-back" to="/">
                    Back to home
                </Link>
            </section>
        </main>
    );
}

export default LibraryLoginPage;
