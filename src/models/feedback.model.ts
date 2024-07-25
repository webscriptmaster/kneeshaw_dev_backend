import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IFeedback {
  _id?: string;
  fullName: string;
  email: string;
  message: string;
  from: string;
  link: string;
  isRead: boolean;
  creatorId?: string;
  modifierId?: string;
}

interface FeedbackDocument extends Document {
  fullName: string;
  email: string;
  message: string;
  from: string;
  link: string;
  isRead: boolean;
  creatorId?: string;
  modifierId?: string;
}

const FeedbackSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      required: true
    },
    creatorId: {
      type: ObjectId,
      required: false
    },
    modifierId: {
      type: ObjectId,
      required: false
    }
  },
  {
    timestamps: true,
    collection: "feedback"
  }
);

const Feedback: Model<FeedbackDocument> = model<FeedbackDocument>(
  "Feedback",
  FeedbackSchema
);

export { IFeedback, FeedbackDocument, Feedback };
