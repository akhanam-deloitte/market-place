import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

// Augment Express Request with `user` type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}

const JWT_SECRET = "super_secret_key";

export const verifyToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as {
      id: number;
      email: string;
    };

    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (err) {
    console.log(err,"--------------------")
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
};
