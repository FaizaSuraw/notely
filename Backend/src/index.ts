import express from "express";
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.route"
import noteRouter from "./routes/note.route";
import singleEntryRouter from "./routes/single.routes";
import userRoutes from "./routes/user.routes";
dotenv.config()
const app = express();


app.use (express.json());

app.use("/api/auth", authRoutes);
app.use("/api/entries", noteRouter);
app.use("/api/entry", singleEntryRouter);
app.use("/api", userRoutes);

app.get ("/", (_req, res) => {
    res.send("Welcome to Notely Backend");
});

const PORT = process.env.PORT || 5000;
app.listen( PORT, () => {
    console.log (`server running on port ${PORT}`)
})