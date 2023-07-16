import { Request } from "express";

import { IUser } from "./User";

export interface CustomRequest extends Request {
  user?: IUser;
}
