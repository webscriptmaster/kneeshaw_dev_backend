import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IJobBudget {
  _id?: string;
  fixedMin: number;
  fixedMax: number;
  rateMin: number;
  rateMax: number;
  creatorId?: string;
  modifierId?: string;
}

interface JobBudgetDocument extends Document {
  fixedMin: number;
  fixedMax: number;
  rateMin: number;
  rateMax: number;
  creatorId?: string;
  modifierId?: string;
}

const JobBudgetSchema: Schema = new Schema(
  {
    fixedMin: {
      type: Number,
      required: true
    },
    fixedMax: {
      type: Number,
      required: true
    },
    rateMin: {
      type: Number,
      required: true
    },
    rateMax: {
      type: Number,
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
    collection: "job-budget"
  }
);

const JobBudget: Model<JobBudgetDocument> = model<JobBudgetDocument>(
  "JobBudget",
  JobBudgetSchema
);

export { IJobBudget, JobBudgetDocument, JobBudget };
