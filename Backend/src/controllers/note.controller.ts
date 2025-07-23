import { Response } from "express";
import { prisma } from "../../config/prisma.conf";
import { AuthRequest } from "../middleware/verifyToken";

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, synopsis, content } = req.body;
    if (!title || !synopsis || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const note = await prisma.note.create({
      data: {
        title,
        synopsis,
        content,
        userId: req.user.userID,
      },
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await prisma.note.findMany({
      where: {
        userId: req.user.userID,
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export async function getNoteById(req: AuthRequest, res: Response) {
  const userId = req.user.userID;
  const { id } = req.params;

  try {
    const note = await prisma.note.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or has been deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch note",
      data: error,
    });
  }
};

export async function updateNote(req: AuthRequest, res: Response) {
  const userId = req.user.userID;
  const { id } = req.params;
  const { title, synopsis, content } = req.body;

  try {
    const note = await prisma.note.findFirst({
      where: { id, userId, isDeleted: false },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or has been deleted",
      });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        synopsis,
        content,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update note",
      data: error,
    });
  }
};

export async function deleteNote(req: AuthRequest, res: Response) {
  const userId = req.user.userID;
  const { id } = req.params;

  try {
    const note = await prisma.note.findFirst({
      where: { id, userId, isDeleted: false },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or already deleted",
      });
    }

    await prisma.note.update({
      where: { id },
      data: {
        isDeleted: true,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "Note deleted (soft delete)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete note",
      data: error,
    });
  }
};
