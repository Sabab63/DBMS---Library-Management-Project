
import "../CSS/Header.css";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";

function Header() {
    return (
        <header className="header">
            <div className="header-container">

                <Link className="logo" to="/" aria-label="Return to books">
                    MyWebsite
                </Link>

                <AccountMenu />

            </div>
        </header>
    );
}

export default Header;