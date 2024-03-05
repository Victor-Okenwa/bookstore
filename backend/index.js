import express, { json } from "express";
import { PORT, mongoDBURI } from "./config.js";

import mongoose from 'mongoose'
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
// Middleware for handling cors policy
app.use(cors());
// app.use(cors({
//     origin: "https://localhost:3000",
//     methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }));

app.use('/books', booksRoute)

app.get('/', (request, response) => {
    console.log(request);
    return response.status(204).send("<h5>Welcome Coddies</h5>");
});

mongoose
    .connect(mongoDBURI)
    .then(() => {
        app.listen(PORT, () => console.log(`App listening on localhost:${PORT}`));
        console.log(`App connected to DB`);
    })
    .catch((err) => console.log(err.message))