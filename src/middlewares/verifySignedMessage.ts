import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import { ethers } from "ethers";

import User from "../models/userModel";
import { IUser } from "../interfaces/User";
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

interface CustomRequest extends Request {
  user?: Document<any, any, IUser> | null;
}

const verifySignedMessage = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    // Signed message from headers
    const signedMessage = req.headers.signedMessage as string;
    const { address } = req.body;

    // Check if address is available on body
    if (!address) {
      next(new AppError("Missing address in the body", 400));
    }

    //   Retrieve message to be signed
    const message = process.env.SIGN_MESSAGE?.replace("<ADDRESS>", address);

    if (!signedMessage) {
      next(
        new AppError("Missing signed message or signature in the header", 400)
      );
    }

    const recoveredAddress = ethers.verifyMessage(message || "", signedMessage);

    // Find user with the signed message
    const user = await User.findOne({ publicAddress: recoveredAddress });

    if (!user) {
      next(new AppError("Unauthorized", 401));
    }

    // Attach the user to the request object for further processing in subsequent middleware or route handlers
    req.user = user;

    next();
  }
);

export default verifySignedMessage;
