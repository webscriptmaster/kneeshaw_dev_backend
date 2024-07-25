import { JobSkill } from "../models/job-skill.model";

export default async function seedJobSkills() {
  await JobSkill.deleteMany({});

  const jobSkills = [
    {
      name: "Unity",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Unreal Engine",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Godot",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "HTML",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "CSS",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "JavaScript",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "TypeScript",
      description: "",
      enabled: true,
      creatorId: null,
      modifierId: null
    }
  ];

  await JobSkill.insertMany(jobSkills);
}
