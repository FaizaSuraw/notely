import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  getDeletedNotes,
} from "../controllers/note.controller";
import { verifyToken } from "../middleware/verifyToken";

const noteRouter = express.Router();

noteRouter.post("/", verifyToken, createNote);
noteRouter.get("/", verifyToken, getNotes);
noteRouter.get("/trash", verifyToken, getDeletedNotes);

export default noteRouter;
