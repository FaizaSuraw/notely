import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  deleteNote,
  getNoteById,
  permanentDeleteNote,
  restoreNote,
  updateNote,
} from "../controllers/note.controller";

const singleEntryRouter = Router();

singleEntryRouter.get("/:id", verifyToken, getNoteById);
singleEntryRouter.patch("/:id", verifyToken, updateNote);
singleEntryRouter.delete("/:id", verifyToken, deleteNote);
singleEntryRouter.patch("/restore/:id", verifyToken, restoreNote);
singleEntryRouter.delete("/permanent/:id", verifyToken, permanentDeleteNote);
export default singleEntryRouter;
