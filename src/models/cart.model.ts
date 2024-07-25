import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

import { IGame } from "./game.model";
import { IUser } from "./user.model";

interface ICart {
  _id?: string;
  purchaser: IUser;
  game: IGame;
  quantity: number;
  amount: number;
  status: string;
}

interface CartDocument extends Document {
  purchaser: IUser;
  game: IGame;
  quantity: number;
  amount: number;
  status: string;
}

const CartSchema: Schema = new Schema(
  {
    purchaser: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    game: {
      type: ObjectId,
      ref: "Game",
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: "cart"
  }
);

const Cart: Model<CartDocument> = model<CartDocument>("Cart", CartSchema);

export { ICart, CartDocument, Cart };
