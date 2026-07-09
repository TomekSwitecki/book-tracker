import { useState, useEffect } from 'react'
import BookList from './components/BookList';
import { mockBooks } from './data/bookData';
import AddBookForm from './components/AddBookForm';
import type { Book, NewBook } from './types/books';


function App() {
  const [books, setBooks] = useState(mockBooks);
  const [search, setSearch] = useState("");

  async function handleAddBook(book: NewBook) {
    const response = await fetch("https://backend-production-7655a.up.railway.app/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });


    const responseData = await response.json();

    const newBook: Book = {
      id: responseData.id,
      ...book,
    }
    setBooks((currentBooks) => [...currentBooks, newBook]);
    setSearch("");
  }






  async function handleBookDelete(id: number) {
    try {
      await fetch(`https://backend-production-7655a.up.railway.app/books/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }

    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id != id)
    )

  }

  const searchFilteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    );
  })


  useEffect(() => {
    fetch("https://backend-production-7655a.up.railway.app/books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);


  return (
    <div className='app-container'>
      <h1>Book tracker</h1>
      <AddBookForm onAddBook={handleAddBook} />
      <div>
        <h2>Search</h2>
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <BookList books={searchFilteredBooks} onBookDelete={handleBookDelete} />
    </div>
  )
}

export default App
