import { BlogCategory } from "../models/blog-category.model";

export default async function seedBlogCategories() {
  await BlogCategory.deleteMany({});

  const categories = [
    {
      name: "Small Update / Patch Notes",
      description:
        "Most appropriate for fixes and changes smaller in nature that impact a subset of your players.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Regular Update",
      description:
        "Most appropriate for normal feature updates that typically occur weekly or monthly.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Major Update",
      description:
        "Save these for your biggest updates, typically once a quarter or a few times a year.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Game is Releasing Now!",
      description: "Let players know that your game is now available.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Game is Releasing on a Specific Date",
      description: "Let players know the specific time you're releasing.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Beta Invitation / News",
      description: "Schedule or Announce beta participation details.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "DLC Release",
      description:
        "Announce new DLC content available to purchase for your game.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Season / Pass",
      description:
        "Describe the launch of your new Season or Battle pass. This is typically a period of weeks or months that includes extra content, perks, or sub-events.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Discount on This Game",
      description: "Announce a limited-time discount on this game.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Discount on In-Game Items or DLC",
      description:
        "Announce a discount on items that may be of interest to existing players. For example, virtual items, virtual currency, or DLC.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Free Trial",
      description:
        "A limited time free offer for Steam customers to try out your game. DLC, or in-game content. This might be a Free Weekend, game demo, or other form of limited-time access to content.",
      enabled: true,
      creatorId: null,
      modifierId: null
    }
  ];

  await BlogCategory.insertMany(categories);
}
