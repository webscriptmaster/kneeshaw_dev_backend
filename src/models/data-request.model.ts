import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

import { IUser } from "./user.model";

interface IDataRequest {
  _id?: string;
  data: string;
  availableAt: Date;
  creator: IUser;
  createdAt: Date;
}

interface DataRequestDocument extends Document {
  data: string;
  createdAt: Date;
  creator: IUser;
  availableAt: Date;
}

const DataRequestSchema: Schema = new Schema(
  {
    data: {
      type: String,
      required: true
    },
    availableAt: {
      type: Date,
      required: true
    },
    creator: {
      type: ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
    collection: "data-request"
  }
);

const DataRequest: Model<DataRequestDocument> = model<DataRequestDocument>(
  "DataRequest",
  DataRequestSchema
);

export { IDataRequest, DataRequestDocument, DataRequest };
