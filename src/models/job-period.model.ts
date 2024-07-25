import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IJobPeriod {
  _id?: string;
  name: string;
  description?: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

interface JobPeriodDocument extends Document {
  name: string;
  description?: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

const JobPeriodSchema: Schema = new Schema(
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
    collection: "job-period"
  }
);

const JobPeriod: Model<JobPeriodDocument> = model<JobPeriodDocument>(
  "JobPeriod",
  JobPeriodSchema
);

export { IJobPeriod, JobPeriodDocument, JobPeriod };
