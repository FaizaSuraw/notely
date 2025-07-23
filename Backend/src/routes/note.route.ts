import express from "express";
import { createNote, getNotes } from "../controllers/note.controller";
import { verifyToken } from "../middleware/verifyToken"

const noteRouter = express.Router();

noteRouter.post("/", verifyToken, createNote);
noteRouter.get("/", verifyToken, getNotes);

export default noteRouter;
