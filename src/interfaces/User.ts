import { IBadge } from "./Badge";
import { Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email?: string;
  publicAddress: string;
  signedMessage: string;
  reputation: number;
  tokens: number;
  badges: IBadge[];
}
