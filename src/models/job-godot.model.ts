import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IJobGodot {
  _id?: string;
  name: string;
  description?: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

interface JobGodotDocument extends Document {
  name: string;
  description?: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

const JobGodotSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
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
    collection: "job-godot"
  }
);

const JobGodot: Model<JobGodotDocument> = model<JobGodotDocument>(
  "JobGodot",
  JobGodotSchema
);

export { IJobGodot, JobGodotDocument, JobGodot };
