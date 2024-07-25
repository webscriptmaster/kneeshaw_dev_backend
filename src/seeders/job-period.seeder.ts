import { JobPeriod } from "../models/job-period.model";

export default async function seedJobPeriods() {
  await JobPeriod.deleteMany({});

  const jobPeriods = [
    {
      name: "Less than 1 month",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "1 to 3 months",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "3 to 6 months",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    }
  ];

  await JobPeriod.insertMany(jobPeriods);
}
