import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface IJobSkill {
  _id?: string;
  name: string;
  description?: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

interface JobSkillDocument extends Document {
  name: string;
  description?: string;
  enabled: boolean;
  creatorId?: string;
  modifierId?: string;
}

const JobSkillSchema: Schema = new Schema(
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
    collection: "job-skill"
  }
);

const JobSkill: Model<JobSkillDocument> = model<JobSkillDocument>(
  "JobSkill",
  JobSkillSchema
);

export { IJobSkill, JobSkillDocument, JobSkill };
