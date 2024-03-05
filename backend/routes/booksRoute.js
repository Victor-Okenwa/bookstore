import express from "express";
import { Book } from "../models/BookModel.js";
const router = express.Router();
// Route for saving new books
router.post('/', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Send all required fields'
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }
        const book = await Book.create(newBook);
        response.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        response.status(400).send({ message: err.message });
    }
});

// Route to get all books from db
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).send({
            count: books.length,
            data: books
        });
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});

// Route to get a book
router.get('/:id', async (request, response) => {
    try {
        // fetching book by requested id
        const book = await Book.findById(request.params.id);
        console.log(book)
        return response.status(200).send(book);
    } catch (err) {
        console.log(err.message);
        response.status(500).json({ message: err.message });
    }
});

// Route to update a book
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Send all required fields'
            })
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) return response.status(404).send({ message: "Book not found" });
        return response.status(200).send({ message: "Book has been updated", data: result });
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});

// Route to delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) return response.status(404).send({ message: "Book not found" });
        return response.status(200).send({ message: "Book has been deleted" });
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});

export default router;