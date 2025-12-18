import { NextFunction, Request, Response } from "express";

export const parseFormData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body?.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  } catch (error) {
    next(error);
  }
};
