import { JobGodot } from "../models/job-godot.model";

export default async function seedJobGodots() {
  await JobGodot.deleteMany({});

  const jobGodots = [
    {
      name: "2D",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "3D",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Shaders",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Environment",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "System",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    }
  ];

  await JobGodot.insertMany(jobGodots);
}
