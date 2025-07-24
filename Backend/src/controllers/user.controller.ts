import { Response } from "express";
import { prisma } from "../../config/prisma.conf";
import { AuthRequest } from "../middleware/verifyToken";

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