import { Request, Response, NextFunction } from "express";
import { AppError, AuthenticationError } from "../errors/customErrors.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Handle specific, known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // For all other unexpected errors, we send a generic 500 Internal Server Error.
  // It's important not to leak implementation details of unexpected errors to the client.
  console.error("UNHANDLED ERROR:", err); // Log the full error for debugging
  return res.status(500).json({
    message: "An unexpected internal server error occurred.",
  });
};
