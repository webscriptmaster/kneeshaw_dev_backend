import { ObjectId } from "mongodb";
import { Document, model, Model, Schema } from "mongoose";

interface ITeamMember {
  _id?: string;
  avatar: string;
  firstName: string;
  lastName: string;
  position: string;
  enabled: boolean;
  memo?: string;
  creatorId?: string;
  modifierId?: string;
}

interface TeamMemberDocument extends Document {
  avatar: string;
  firstName: string;
  lastName: string;
  position: string;
  enabled: boolean;
  memo?: string;
  creatorId?: string;
  modifierId?: string;
}

const TeamMemberSchema: Schema = new Schema(
  {
    avatar: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    enabled: {
      type: Boolean,
      required: true
    },
    memo: {
      type: String,
      required: false
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
    collection: "team-member"
  }
);

const TeamMember: Model<TeamMemberDocument> = model<TeamMemberDocument>(
  "TeamMember",
  TeamMemberSchema
);

export { ITeamMember, TeamMemberDocument, TeamMember };
