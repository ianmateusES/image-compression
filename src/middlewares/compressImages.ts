import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

import { compressFile } from '../config';

export async function compressImages(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!req.file) {
    throw new Error('File does not exist!');
  }

  try {
    await compressFile(req.file, 600);

    return next();
  } catch (err) {
    throw new Error('Error file!');
  }
}
