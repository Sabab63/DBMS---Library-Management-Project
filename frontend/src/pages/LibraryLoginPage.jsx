import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/LibraryLogin.css";


function LibraryLoginPage() {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        try {
            
            const formData = new URLSearchParams();

            formData.append("username", username);
            formData.append("password", password);

            const response = await fetch("http://127.0.0.1:8000/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Login failed");
            }

            
            localStorage.setItem("access_token", data.access_token);
            setMessage("Login successful!");
            navigate("/");

        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <main className="library-login-page">
            <section className="library-login-card" aria-labelledby="library-login-title">
                <Link className="library-login-home" to="/">
                    Library
                </Link>
                <h1 id="library-login-title">Welcome back</h1>
                <p className="library-login-intro">Sign in to your library account.</p>

                <form className="library-login-form" onSubmit={handleLogin}>
                    <label htmlFor="library-username">Library ID</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        required
                    />

                    <label htmlFor="library-password">Password</label>
                    <input
                        id="library-password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
