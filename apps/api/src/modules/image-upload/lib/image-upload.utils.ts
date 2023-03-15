import * as fs from 'fs';
import { FileUpload } from 'graphql-upload-minimal';
import { promisify } from 'util';

export const saveImageFile = async (imageUpload: Promise<FileUpload>) => {
  const { createReadStream, mimetype } = await imageUpload;

  const fileExtension = mimetype.split('/')[1];

  // const datePrefix = new Date().toJSON().slice(0, 10);

  const fileName = `${Date.now()}.${fileExtension}`;

  const basePath = process.cwd();
  const savePath = `${basePath}/uploads/${fileName}`;

  await new Promise((res, rej) => {
    const stream = createReadStream();
    stream
      .pipe(fs.createWriteStream(savePath))
      .on('error', (err) => {
        fs.unlink(savePath, () => {
          rej(err);
        });
      })
      .on('finish', res);
  });

  return fileName;
};

export const deleteImageFile = async (imageFileName: string) => {
  const unlink = promisify(fs.unlink);
  const basePath = process.cwd();
  const savePath = `${basePath}/uploads/${imageFileName}`;
  await unlink(savePath);
};
