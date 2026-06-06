import { useState } from "react";
import type { NewBook } from "../types/books";
import "../styles/form.scss";

function AddBookForm(props: { onAddBook: (book: NewBook) => void; }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [ISBN, setISBN] = useState("");
    const [pages, setPages] = useState("");
    const [rating, setRating] = useState("");



    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();


        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        if (!author.trim()) {
            alert("Author is required");
            return;
        }

        if (!ISBN.trim()) {
            alert("ISBN is required");
            return;
        }

        if (Number(pages) < 1) {
            alert("Pages must be greater than 0");
            return;
        }

        if (Number(rating) < 1) {
            alert("Rating must be greater than 0");
            return;
        }

        props.onAddBook({
            title,
            author,
            isbn: ISBN,
            pages: Number(pages),
            rating: Number(rating),
        });

        setTitle("");
        setAuthor("");
        setISBN("");
        setPages("");
        setRating("");
    }



    return (
        <div >
            <h2>Add Book</h2>

            <form className="input-form" onSubmit={handleSubmit}>
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <input placeholder="ISBN" value={ISBN} onChange={(e) => setISBN(e.target.value)} />
                <input placeholder="Pages" value={pages} type="number" onChange={(e) => setPages(e.target.value)} />
                <input placeholder="Rating" value={rating} min="1" max="5" type="number" onChange={(e) => setRating(e.target.value)} />

                <button className="button" type="submit">
                    Add Book
                </button>
            </form>
        </div>
    );
}

export default AddBookForm;