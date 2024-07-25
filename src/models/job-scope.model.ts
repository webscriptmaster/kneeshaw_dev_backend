import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IJobScope {
  _id?: string;
  name: string;
  description?: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

interface JobScopeDocument extends Document {
  name: string;
  description?: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

const JobScopeSchema: Schema = new Schema(
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
    collection: "job-scope"
  }
);

const JobScope: Model<JobScopeDocument> = model<JobScopeDocument>(
  "JobScope",
  JobScopeSchema
);

export { IJobScope, JobScopeDocument, JobScope };
