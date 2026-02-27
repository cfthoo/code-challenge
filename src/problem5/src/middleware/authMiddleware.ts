import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../errors/customErrors";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    // Check for the Authorization header and ensure it's a Bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract the token from the header ('Bearer TOKEN')
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AuthenticationError("Not authorized, no token provided");
    }

    // Verify the token using the secret key
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    jwt.verify(token, secret); // This will throw an error if the token is invalid

    // If verification is successful, call next() to proceed to the route handler
    next();
  } catch (error) {
    // If any error occurs (missing token, invalid token), pass an AuthenticationError
    // to our central error handler.
    next(new AuthenticationError("Not authorized, token failed"));
  }
};
