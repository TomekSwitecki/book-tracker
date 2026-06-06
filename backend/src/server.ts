import express from "express";
import db from "./database";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

app.get("/books", (req, res) => {
    const books = db.prepare("SELECT * FROM books").all();
    res.json(books);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


app.post("/books", (req, res) => {
    const { title, author, isbn, pages, rating } = req.body;
    if (!title || !author || !isbn || !pages || !rating) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }



    const result = db
        .prepare(`
        INSERT INTO books
        (title, author, isbn, pages, rating)
        VALUES (?, ?, ?, ?, ?)
    `)
        .run(title, author, isbn, pages, rating);

    res.status(201).json({
        id: result.lastInsertRowid,
    });
});

app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const result = db
        .prepare("DELETE FROM books WHERE id = ?")
        .run(id);

    if (result.changes === 0) {
        return res.status(404).json({
            message: "Book not found",
        });
    }

    res.status(204).send();
});