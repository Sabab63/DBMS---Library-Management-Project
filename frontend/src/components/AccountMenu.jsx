import { Link } from "react-router-dom";
import "../CSS/AccountMenu.css";

function AccountMenu() {
    return (
        <div className="account-menu">
            <Link
                className="account-button"
                to="/login"
                aria-label="Account, sign in"
                aria-describedby="account-popover"
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                </svg>
            </Link>
            <div className="account-popover" id="account-popover" role="tooltip">
                <strong>Account</strong>
                <span>Sign in to access your library profile.</span>
            </div>
        </div>
    );
}

export default AccountMenu;
