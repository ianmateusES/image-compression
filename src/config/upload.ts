import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk';
  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };
}

const configUpload = {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'upload'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find(
        acceptedFormat => acceptedFormat === file.mimetype,
      );
      if (isAccepted) {
        return callback(null, true);
      }

      return callback(null, false);
    },
  },
} as IUploadConfig;

export { configUpload };
