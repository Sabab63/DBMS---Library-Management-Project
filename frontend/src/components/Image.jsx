import "../CSS/Image.css";
import src from "../assets/library.jpg";
import LibrarySearch from "./LibrarySearch";

function Image() {
    return (
        <div className="image-container">
            <img src={src} alt="Library" />
            <LibrarySearch />
        </div>
    );
}

export default Image;