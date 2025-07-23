import express from "express";
import { createNote, getNotes } from "../controllers/note.controller";
import { verifyToken } from "../middleware/verifyToken"
import { getNoteById } from "../controllers/note.controller";


const noteRouter = express.Router();

noteRouter.post("/", verifyToken, createNote);
noteRouter.get("/", verifyToken, getNotes);
noteRouter.get("/:id", verifyToken, getNoteById);

export default noteRouter;
