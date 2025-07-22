import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma.conf";
import { jwtSecretKey } from "../../config/jwt.conf";

export async function register(req: Request, res: Response) {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email or username already exists",
      });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong while hashing password",
        });
      }

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hash as string,
          avatar: "",
          isDeleted: false,
          createdAt: new Date(),
        },
      });

      const payload = {
        userID: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "2h" });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: token,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      data: error,
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/username and password are required",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: id }, { username: id }],
        isDeleted: false,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      userID: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "2h" });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      data: error,
    });
  }
}
