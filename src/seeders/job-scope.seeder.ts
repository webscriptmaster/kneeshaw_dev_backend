import { JobScope } from "../models/job-scope.model";

export default async function seedJobScopes() {
  await JobScope.deleteMany({});

  const jobScopes = [
    {
      name: "Small",
      description: "Quick Tasks",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Medium",
      description: "Well defined projects",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Large",
      description: "Long term, complex tasks",
      enabled: true,
      creatorId: null,
      modifierId: null
    }
  ];

  await JobScope.insertMany(jobScopes);
}
