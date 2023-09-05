import { Request, Response, NextFunction } from "express";
import { generate } from "rand-token";

import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";
import User from "../models/userModel";
import { SignatureLike, ethers } from "ethers";
import { generateAuthToken } from "../utils/generateAuthToken";

export const authenticate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { publicAddress, signature } = req.body; // Get the public address and signature from the request body
    const user = await User.findOne({ publicAddress }); // Find the user by their public address

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    console.log("user", user);

    const nonce = user.nonce; // Get the nonce associated with the user
    const message = `I affix my digital seal to verify address for RankBloc.
    NONCE: ${nonce}
    `;

    const recoveredAddress = ethers.verifyMessage(
      message as string,
      signature as SignatureLike
    );

    console.log(recoveredAddress);

    if (recoveredAddress.toLowerCase() === publicAddress.toLowerCase()) {
      // User is authenticated
      user.nonce = generate(16);

      // Update Nonce
      await user.save();
      const token = generateAuthToken(publicAddress);
      return res.status(200).json({ token });
    } else {
      // Authentication failed
      return res.status(401).json({ message: "Authentication failed." });
    }
  }
);
