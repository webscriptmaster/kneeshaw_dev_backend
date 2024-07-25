import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IJobExperience {
  _id?: string;
  name: string;
  description?: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

interface JobExperienceDocument extends Document {
  name: string;
  description?: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

const JobExperienceSchema: Schema = new Schema(
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
    collection: "job-experience"
  }
);

const JobExperience: Model<JobExperienceDocument> =
  model<JobExperienceDocument>("JobExperience", JobExperienceSchema);

export { IJobExperience, JobExperienceDocument, JobExperience };
