import { Schema, model } from "mongoose";
import { ethers } from "ethers";
import { generate } from "rand-token";

import { IUser } from "../interfaces/User";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
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
    photoUrl: {
      type: String,
      required: [true, "A photo url must be present!"],
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
    nonce: {
      type: String,
      default: function () {
        return generate(16);
      },
    },

    reputation: {
      type: Number,
      default: 0,
    },
    tokens: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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

const User = model<IUser>("Users", userSchema);

export default User;
