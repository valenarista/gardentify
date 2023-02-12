import { Request, Response } from 'express';

export type GardentifyContext = {
  req: Request;
  res: Response;
};
