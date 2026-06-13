import type { Book } from "../types/books";
import "../styles/bookItem.scss";
import BookCard from "./BookCard";
function BookList({ books, onBookDelete }: { books: Book[]; onBookDelete: (id: number) => void }) {
    return (
        <div className="book-item__wrapper">
            <h2>Books</h2>
            {books.map((book) => (
                <BookCard key={book.id} book={book} onDelete={onBookDelete} />
            ))}
        </div>
    );
}
export default BookList;