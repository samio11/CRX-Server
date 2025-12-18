import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import config from "../config";
import { TErrorSources } from "../errors/types";
import { handleDuplicateError } from "../errors/HandleDuplicateError";
import { handleCastError } from "../errors/HandleCastError";
import { handleValidationError } from "../errors/HandleValidationError";
import { handleZodError } from "../errors/HandleZodError";
import { deleteImageFromCloudinary } from "../config/cloudinary.config";

export const GlobalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Error Occurs";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Opps! Error Occurs",
    },
  ];
  if (req.file) {
    await deleteImageFromCloudinary(req.file.path);
  }

  if (err?.code === 11000) {
    const x = handleDuplicateError(err);
    statusCode = x.statusCode;
    message = x.message;
    errorSources = x.errorSources;
  } else if (err?.name === "CastError") {
    const x = handleCastError(err);
    statusCode = x.statusCode;
    message = x.message;
    errorSources = x.errorSources;
  } else if (err?.name === "ValidationError") {
    const x = handleValidationError(err);
    statusCode = x.statusCode;
    message = x.message;
    errorSources = x.errorSources;
  } else if (err?.name === "ZodError") {
    const x = handleZodError(err);
    statusCode = x.statusCode;
    message = x.message;
    errorSources = x.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : "",
  });
};
