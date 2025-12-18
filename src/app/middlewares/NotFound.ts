import { NextFunction, Request, Response } from "express";

export const NotFound = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    success: false,
    message: "API not found",
    error: "",
  });
};
