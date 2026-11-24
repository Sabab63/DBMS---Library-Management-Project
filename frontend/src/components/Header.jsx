
import "../CSS/Header.css";
import AccountMenu from "./AccountMenu";

function Header() {
    return (
        <header className="header">
            <div className="header-container">

                <div className="logo">
                    MyWebsite
                </div>

                <AccountMenu />

            </div>
        </header>
    );
}

export default Header;