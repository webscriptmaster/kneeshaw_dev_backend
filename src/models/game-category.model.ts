import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IGameCategory {
  _id?: string;
  name: string;
  description: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

interface GameCategoryDocument extends Document {
  name: string;
  description: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

const GameCategorySchema: Schema = new Schema(
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
    collection: "game-category"
  }
);

const GameCategory: Model<GameCategoryDocument> = model<GameCategoryDocument>(
  "GameCategory",
  GameCategorySchema
);

export { IGameCategory, GameCategoryDocument, GameCategory };
