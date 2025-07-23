import { Request, Response } from "express";
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