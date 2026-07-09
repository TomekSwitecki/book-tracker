import express from "express";
import cors from "cors";
import db from "./database.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/books", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM books");

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Database error",
        });
    }
});

app.post("/books", async (req, res) => {
    const { title, author, isbn, pages, rating } = req.body;

    if (!title || !author || !isbn || !pages || !rating) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const result = await db.query(
            `INSERT INTO books
            (title, author, isbn, pages, rating)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id`,
            [title, author, isbn, pages, rating]
        );

        res.status(201).json({
            id: result.rows[0].id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Database error",
        });
    }
});

app.delete("/books/:id", async (req, res) => {
    try {
        const result = await db.query(
            "DELETE FROM books WHERE id = $1 RETURNING id",
            [req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Database error",
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});