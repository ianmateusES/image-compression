import fs from 'fs';
import sharp from 'sharp';

const compressFile = async (file, size) => {
  const pathFile = file.path.split('/');
  const fileName = pathFile.pop();

  const newFile = `${fileName.split('.')[0]}.webp`;
  const newPath = `${pathFile.join('/')}/${newFile}`;

  const data = await sharp(file.path)
    .resize(size)
    .toFormat('webp')
    .webp({
      quality: 80,
    })
    .toBuffer();

  fs.access(file.path, err => {
    if (err) {
      throw new Error(err.message);
    }
  });

  fs.writeFile(newPath, data, err => {
    if (err) {
      throw new Error(err.message);
    }
  });

  await fs.promises.unlink(file.path);

  return Object.assign(file, {
    path: newPath,
    filename: newFile,
  });
};

export { compressFile };
