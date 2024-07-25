import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

import { IJobSkill } from "./job-skill.model";
import { IJobGodot } from "./job-godot.model";
import { IJobDatabase } from "./job-database.model";
import { IJobScope } from "./job-scope.model";
import { IJobPeriod } from "./job-period.model";
import { IJobExperience } from "./job-experience.model";

interface IJob {
  _id?: string;
  title: string;
  skills: IJobSkill[];
  godots: IJobGodot[];
  databases: IJobDatabase[];
  scope: IJobScope;
  period: IJobPeriod;
  experience: IJobExperience;
  budget: {
    mode: string;
    from: number;
    to: number;
  };
  location: {
    mode: string;
    region?: string;
  };
  creatorId?: string;
  modifierId?: string;
}

interface JobDocument extends Document {
  title: string;
  skills: IJobSkill[];
  godots: IJobGodot[];
  databases: IJobDatabase[];
  scope: IJobScope;
  period: IJobPeriod;
  experience: IJobExperience;
  budget: {
    mode: string;
    from: number;
    to: number;
  };
  location: {
    mode: string;
    region?: string;
  };
  creatorId?: string;
  modifierId?: string;
}

const JobSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    skills: [
      {
        type: ObjectId,
        ref: "JobSkill"
      }
    ],
    godots: [
      {
        type: ObjectId,
        ref: "JobGodot"
      }
    ],
    databases: [
      {
        type: ObjectId,
        ref: "JobDatabase"
      }
    ],
    scope: {
      type: ObjectId,
      ref: "JobScope"
    },
    period: {
      type: ObjectId,
      ref: "JobPeriod"
    },
    experience: {
      type: ObjectId,
      ref: "JobExperience"
    },
    budget: {
      type: {
        mode: String,
        from: Number,
        to: Number
      },
      required: true
    },
    location: {
      type: {
        mode: String,
        region: String
      },
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
    collection: "job"
  }
);

const Job: Model<JobDocument> = model<JobDocument>("Job", JobSchema);

export { IJob, JobDocument, Job };
