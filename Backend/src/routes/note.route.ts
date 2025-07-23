import express from "express";
import { createNote, getNotes, getNoteById, updateNote } from "../controllers/note.controller";
import { verifyToken } from "../middleware/verifyToken"

const noteRouter = express.Router();

noteRouter.post("/", verifyToken, createNote);
noteRouter.get("/", verifyToken, getNotes);
noteRouter.get("/:id", verifyToken, getNoteById);
noteRouter.patch("/:id", verifyToken, updateNote);

export default noteRouter;
