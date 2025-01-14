import { Request } from "express";
import multer from "multer";

export default function upload(subpath: string) {
  const storage = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: CallableFunction
    ) => {
      cb(null, `static/${subpath}`);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: CallableFunction
    ) => {
      const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniquePrefix}-${file.originalname}`);
    }
  });

  return multer({ storage });
}
