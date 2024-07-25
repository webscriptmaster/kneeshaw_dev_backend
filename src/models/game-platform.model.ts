import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IGamePlatform {
  _id?: string;
  name: string;
  description: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

interface GamePlatformDocument extends Document {
  name: string;
  description: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

const GamePlatformSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
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
    collection: "game-platform"
  }
);

const GamePlatform: Model<GamePlatformDocument> = model<GamePlatformDocument>(
  "GamePlatform",
  GamePlatformSchema
);

export { IGamePlatform, GamePlatformDocument, GamePlatform };
