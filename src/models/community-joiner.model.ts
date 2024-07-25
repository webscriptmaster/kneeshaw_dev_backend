import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface ICommunityJoiner {
  _id?: string;
  email: string;
  creatorId?: string;
  modifierId?: string;
}

interface CommunityJoinerDocument extends Document {
  email: string;
  creatorId?: string;
  modifierId?: string;
}

const CommunityJoinerSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
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
    collection: "community-joiner"
  }
);

const CommunityJoiner: Model<CommunityJoinerDocument> =
  model<CommunityJoinerDocument>("CommunityJoiner", CommunityJoinerSchema);

export { ICommunityJoiner, CommunityJoinerDocument, CommunityJoiner };
