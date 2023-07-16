import { Schema, model } from "mongoose";

const NotificationSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Notification = model("Notification", NotificationSchema);

export default Notification;
