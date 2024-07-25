import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IService {
  _id?: string;
  thumbnail: string;
  title: string;
  description: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

interface ServiceDocument extends Document {
  thumbnail: string;
  title: string;
  description: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

const ServiceSchema: Schema = new Schema(
  {
    thumbnail: {
      type: String,
      required: true
    },
    title: {
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
    collection: "service"
  }
);

const Service: Model<ServiceDocument> = model<ServiceDocument>(
  "Service",
  ServiceSchema
);

export { IService, ServiceDocument, Service };
