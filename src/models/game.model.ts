import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";
import { IGameCategory } from "./game-category.model";
import { IGamePlatform } from "./game-platform.model";

interface IGame {
  _id?: string;

  enabled: boolean;

  category?: IGameCategory;
  platform?: IGamePlatform;

  title: string;
  shortTitle?: string;
  promotional: string;
  description: string;
  history?: string;
  releaseDate?: Date;
  players?: string;
  availableLanguages: string[];
  gamers: number;
  price: number;
  downloadLink: string;

  banner: string;
  splash: string;
  thumbnail: string;
  logos: string[];
  screenshots: string[];

  overview: {
    title: string;
    description: string;
    characters: {
      thumbnail: string;
      title: string;
      description?: string;
    }[];
  };

  features: {
    thumbnail: string;
    title: string;
    description: string;
  }[];

  story: {
    title: string;
    description: string;
  };

  videos: {
    thumbnail: string;
    title: string;
    src: string;
  }[];

  credits: string;

  creatorId?: string;
  modifierId?: string;
}

interface GameDocument extends Document {
  enabled: boolean;

  category?: IGameCategory;
  platform?: IGamePlatform;

  title: string;
  shortTitle?: string;
  promotional: string;
  description: string;
  history?: string;
  releaseDate?: Date;
  players?: string;
  availableLanguages: string[];
  gamers: number;
  price: number;
  downloadLink: string;

  banner: string;
  splash: string;
  thumbnail: string;
  logos: string[];
  screenshots: string[];

  overview: {
    title: string;
    description: string;
    characters: {
      thumbnail: string;
      title: string;
      description?: string;
    }[];
  };

  features: {
    thumbnail: string;
    title: string;
    description: string;
  }[];

  story: {
    title: string;
    description: string;
  };

  videos: {
    thumbnail: string;
    title: string;
    src: string;
  }[];

  credits: string;

  creatorId?: string;
  modifierId?: string;
}

const GameSchema: Schema = new Schema(
  {
    enabled: {
      type: Boolean,
      required: true
    },

    category: {
      type: ObjectId,
      ref: "GameCategory",
      required: false
    },
    platform: {
      type: ObjectId,
      ref: "GamePlatform",
      required: false
    },

    title: {
      type: String,
      required: true
    },
    shortTitle: {
      type: String,
      required: false
    },
    promotional: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    history: {
      type: String,
      required: false
    },
    releaseDate: {
      type: Date,
      required: false
    },
    players: {
      type: String,
      required: false
    },
    availableLanguages: {
      type: [String],
      required: true
    },
    gamers: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    downloadLink: {
      type: String,
      required: true
    },

    banner: {
      type: String,
      required: true
    },
    splash: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    logos: {
      type: [String],
      required: true
    },
    screenshots: {
      type: [String],
      required: true
    },

    overview: {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      characters: {
        type: [
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
              required: false
            }
          }
        ],
        required: true
      }
    },

    features: {
      type: [
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
          }
        }
      ],
      required: true
    },

    story: {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    },

    videos: {
      type: [
        {
          thumbnail: {
            type: String,
            required: true
          },
          title: {
            type: String,
            required: true
          },
          src: {
            type: String,
            required: true
          }
        }
      ],
      required: true
    },

    credits: {
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
    collection: "game"
  }
);

const Game: Model<GameDocument> = model<GameDocument>("Game", GameSchema);

export { IGame, GameDocument, Game };
