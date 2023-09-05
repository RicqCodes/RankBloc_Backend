import { sign } from "jsonwebtoken";

export const generateAuthToken = (publicAddress: string) => {
  // Create a payload containing user information
  const payload = {
    publicAddress,
    // Add any other user-related data you want to include in the token
  };

  // Sign the payload to create a token
  const token = sign(payload, process.env.SECRET_KEY as string);

  return token;
};
