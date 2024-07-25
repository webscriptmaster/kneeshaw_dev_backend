import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IFaq {
  _id?: string;
  question: string;
  answer: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

interface FaqDocument extends Document {
  question: string;
  answer: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

const FaqSchema: Schema = new Schema(
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    enabled: {
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
    collection: "faq"
  }
);

const Faq: Model<FaqDocument> = model<FaqDocument>("Faq", FaqSchema);

export { IFaq, FaqDocument, Faq };
