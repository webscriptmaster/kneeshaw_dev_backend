import { JobDatabase } from "../models/job-database.model";

export default async function seedJobDatabases() {
  await JobDatabase.deleteMany({});

  const jobDatabases = [
    {
      name: "MongoDB",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "MySQL",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "PostgreSQL",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "SQLite",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Oracle",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    }
  ];

  await JobDatabase.insertMany(jobDatabases);
}
