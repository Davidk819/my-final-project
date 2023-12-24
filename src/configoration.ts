import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretKey = "david"
// const token = jwt.sign("1", secretKey, { expiresIn: "30d" });

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url = req.headers.authorization;
    next();
  
    const token = req.headers["authorization"];
    if (!token) {
      res.status(400).send("token is required");
      return;
    }
    if (token !== "1") {
        res.status(400).send("Failed to verify token:");
    } else {
        next()
    }
  }
