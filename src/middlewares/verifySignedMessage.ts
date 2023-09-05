import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import { SignatureLike, ethers } from "ethers";

import User from "../models/userModel";
import { IUser } from "../interfaces/User";
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

interface CustomRequest extends Request {
  user?: Document<any, any, IUser> | null;
}

const verifySignedMessage = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const signedMessage = req.headers["x-signed-message"];
    const nonce = req.headers["x-nonce"];

    // console.log(req.headers);
    // Retrieve message to be signed
    if (signedMessage === "undefined") {
      return next(
        new AppError("Missing signed message or signature in the header", 400)
      );
    }

    const message = `I affix my digital seal to verify address for RankBloc.
    NONCE: ${nonce}
    `;

    const recoveredAddress = ethers.verifyMessage(
      message as string,
      signedMessage as SignatureLike
    );

    // Find user with the signed message
    const user = await User.findOne({ publicAddress: recoveredAddress });

    if (!user) {
      return next(new AppError("Unauthorized", 401));
    }

    // Attach the user to the request object for further processing in subsequent middleware or route handlers
    req.user = user;

    next();
  }
);

export default verifySignedMessage;
