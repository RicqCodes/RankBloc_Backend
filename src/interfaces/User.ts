import { IBadge } from "./Badge";
import { Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email?: string;
  publicAddress: string;
  nonce: string;
  photoUrl: string;
  signedMessage: string;
  reputation: number;
  tokens: number;
  role: "user" | "admin";
  badges: IBadge[];
}
