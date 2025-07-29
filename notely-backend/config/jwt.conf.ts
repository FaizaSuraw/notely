import { Secret } from "jsonwebtoken";

export const jwtSecretKey: Secret = process.env.JWT_SECRET as Secret;
