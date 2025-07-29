import { Response } from "express";
import { prisma } from "../../config/prisma.conf";
import { AuthRequest } from "../middleware/verifyToken";

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.user.userID;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        avatar: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
      data: error,
    });
  }
};

export const updateUserInfo = async (req: AuthRequest, res: Response) => {
  const userId = req.user.userID;
  const { firstName, lastName, username, email, avatar } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        username,
        email,
        avatar,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user profile",
      data: error,
    });
  }
};
