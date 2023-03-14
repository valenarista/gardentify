import * as fs from 'fs';
import { FileUpload } from 'graphql-upload-minimal';

export const saveImageFile = async (imageUpload: Promise<FileUpload>) => {
  const { createReadStream, mimetype } = await imageUpload;

  const fileExtension = mimetype.split('/')[1];

  const datePrefix = new Date()
    .toLocaleDateString('en-US')
    .replaceAll('/', '-');
  const fileName = `${datePrefix}.${fileExtension}`;

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
