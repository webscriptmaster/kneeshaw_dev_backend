import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface ICookieConsent {
  _id?: string;
  description: string;
  acceptLabel: string;
  declineLabel: string;
  position: string;
  creatorId?: string;
  modifierId?: string;
}

interface CookieConsentDocument extends Document {
  description: string;
  acceptLabel: string;
  declineLabel: string;
  position: string;
  creatorId?: string;
  modifierId?: string;
}

const CookieConsentSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true
    },
    acceptLabel: {
      type: String,
      required: true
    },
    declineLabel: {
      type: String,
      required: true
    },
    position: {
      type: String,
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
    collection: "cookie-consent"
  }
);

const CookieConsent: Model<CookieConsentDocument> =
  model<CookieConsentDocument>("CookieConsent", CookieConsentSchema);

export { ICookieConsent, CookieConsentDocument, CookieConsent };
