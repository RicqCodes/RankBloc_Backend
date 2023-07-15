import { Schema, model } from "mongoose";
import { ethers } from "ethers";

import { IUser } from "../interfaces/User";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      validate: {
        message: "Email is not valid",
        validator: (email: string): Boolean => {
          var validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (email.match(validRegex)) {
            return true;
          } else {
            return false;
          }
        },
      },
    },
    publicAddress: {
      type: String,
      required: [true, "A wallet address must be present!"],
      unique: true,
      validate: {
        message: "Provide a valid ERC20 wallet address",
        validator: function (address: string) {
          return ethers.isAddress(address);
        },
      },
    },
    signedMessage: {
      type: String,
      required: [true, "A signed Message is required"],
      select: false,
    },
    reputation: {
      type: Number,
      default: 0,
    },
    tokens: {
      type: Number,
      default: 0,
    },
    badges: [
      {
        type: Schema.Types.ObjectId,
        ref: "Badge",
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
