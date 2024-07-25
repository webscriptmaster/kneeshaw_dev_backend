import { JobExperience } from "../models/job-experience.model";

export default async function seedJobExperiences() {
  await JobExperience.deleteMany({});

  const jobExperiences = [
    {
      name: "Entry",
      description: "Looking for someone relatively new to this field",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Intermediate",
      description: "Looking for substantial experience in this field",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Expert",
      description: "Looking for comprehensive and deep expertise in this field",
      enabled: true,
      creatorId: null,
      modifierId: null
    }
  ];

  await JobExperience.insertMany(jobExperiences);
}
