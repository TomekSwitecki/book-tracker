import type { Book } from "../types/books";


function BookCard({ book, onDelete }: { book: Book; onDelete: (id: number) => void }) {
    return (

        <div className="book-item" key={book.id}>
            <div className="book-item__main">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p className="book-item__isbn">ISBN: {book.isbn}</p>
            </div>
            <div className="book-item__details">
                <p><span className="book-item__details--bold">Pages:</span> {book.pages}</p>
                <p><span className="book-item__details--bold">Rating:</span> {book.rating}/5</p>
            </div>
            <button className="button button--remove" onClick={() => onDelete(book.id)}>X</button>
        </div >
    )
}
export default BookCard;