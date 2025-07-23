import express from "express";
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.route"
import noteRouter from "./routes/note.route";
dotenv.config()
const app = express();


app.use (express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRouter);

app.get ("/", (_req, res) => {
    res.send("Welcome to Notely Backend");
});

const PORT = process.env.PORT || 5000;
app.listen( PORT, () => {
    console.log (`server running on port ${PORT}`)
})