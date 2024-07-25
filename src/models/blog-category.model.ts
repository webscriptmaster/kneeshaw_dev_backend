import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IBlogCategory {
  _id?: string;
  name: string;
  description: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

interface BlogCategoryDocument extends Document {
  name: string;
  description: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

const BlogCategorySchema: Schema = new Schema(
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
    collection: "blog-category"
  }
);

const BlogCategory: Model<BlogCategoryDocument> = model<BlogCategoryDocument>(
  "BlogCategory",
  BlogCategorySchema
);

export { IBlogCategory, BlogCategoryDocument, BlogCategory };
