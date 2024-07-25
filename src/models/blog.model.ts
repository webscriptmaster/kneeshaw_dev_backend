import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

import { IBlogCategory } from "./blog-category.model";
import { IGame } from "./game.model";

interface IBlog {
  _id?: string;

  enabled: boolean;

  category?: IBlogCategory;
  game?: IGame;

  title: string;
  description: string;
  details: string;

  thumbnail: {
    small: string;
    large: string;
  };
  screenshots: string[];

  features: {
    title: string;
    thumbnail: string;
    items: string[];
  }[];

  creatorId?: string;
  modifierId?: string;
}

interface BlogDocument extends Document {
  enabled: boolean;

  category?: IBlogCategory;
  game?: IGame;

  title: string;
  description: string;
  details: string;

  thumbnail: {
    small: string;
    large: string;
  };
  screenshots: string[];

  features: {
    title: string;
    thumbnail: string;
    items: string[];
  }[];

  creatorId?: string;
  modifierId?: string;
}

const BlogSchema: Schema = new Schema(
  {
    enabled: {
      type: Boolean,
      required: true
    },

    category: {
      type: ObjectId,
      ref: "BlogCategory",
      required: false
    },
    game: {
      type: ObjectId,
      ref: "Game",
      required: false
    },

    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },

    thumbnail: {
      type: {
        small: {
          type: String,
          required: true
        },
        large: {
          type: String,
          required: true
        }
      },
      required: true
    },
    screenshots: {
      type: [String],
      required: true
    },

    features: {
      type: [
        {
          title: {
            type: String,
            required: true
          },
          thumbnail: {
            type: String,
            required: true
          },
          items: {
            type: [String],
            required: true
          }
        }
      ],
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
    collection: "blog"
  }
);

const Blog: Model<BlogDocument> = model<BlogDocument>("Blog", BlogSchema);

export { IBlog, BlogDocument, Blog };
