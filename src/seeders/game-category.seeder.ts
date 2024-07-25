import { GameCategory } from "../models/game-category.model";

export default async function seedGameCategories() {
  await GameCategory.deleteMany({});

  const gameCategories = [
    {
      name: "Action",
      description:
        "Action games typically involve physical challenges, including hand-eye coordination and reaction time. These games often feature fast-paced gameplay and intense combat sequences.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Adventure",
      description:
        "Adventure games focus on exploration, puzzle-solving, and storytelling. Players often navigate through a virtual world, interact with characters, and uncover mysteries to progress through the game.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Role-playing",
      description:
        "Role-playing games (RPGs) allow players to assume the roles of characters in a fictional setting. Players can customize their characters, make decisions that affect the game's outcome, and engage in quests and battles.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Simulation",
      description:
        "Simulation games aim to replicate real-world activities or systems. Players can experience simulations of various scenarios, such as driving vehicles, managing cities, or running businesses.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Strategy",
      description:
        "Strategy games require players to use critical thinking, planning, and resource management to achieve victory. These games often involve tactical decision-making, building structures or armies, and outsmarting opponents.",
      enabled: true,
      creatorId: null,
      modifierId: null
    }
  ];

  await GameCategory.insertMany(gameCategories);
}
