import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IJobDatabase {
  _id?: string;
  name: string;
  description?: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

interface JobDatabaseDocument extends Document {
  name: string;
  description?: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

const JobDatabaseSchema: Schema = new Schema(
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
    collection: "job-database"
  }
);

const JobDatabase: Model<JobDatabaseDocument> = model<JobDatabaseDocument>(
  "JobDatabase",
  JobDatabaseSchema
);

export { IJobDatabase, JobDatabaseDocument, JobDatabase };
