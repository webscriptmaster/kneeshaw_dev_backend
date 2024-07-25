import { GamePlatform } from "../models/game-platform.model";

export default async function seedGamePlatforms() {
  await GamePlatform.deleteMany({});

  const gamePlatforms = [
    {
      name: "PC (Personal Computer)",
      description:
        "PC gaming offers a versatile platform with a wide range of games, from indie titles to AAA releases. Players can customize their hardware for optimal performance and enjoy a vast library of games available through digital distribution platforms like Steam.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "PlayStation",
      description:
        "PlayStation consoles, developed by Sony, are popular for their exclusive titles, powerful hardware, and online gaming services. The PlayStation platform offers a diverse range of games across various genres, appealing to a wide audience of gamers.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Xbox",
      description:
        "Xbox consoles, created by Microsoft, provide high-quality gaming experiences with exclusive titles, online multiplayer capabilities, and subscription services like Xbox Game Pass. Xbox platforms are known for their robust online community and integration with Windows PCs.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Nintendo Switch",
      description:
        "The Nintendo Switch is a hybrid console that can be used as both a handheld device and a home console. Known for its unique gameplay experiences and iconic franchises like Mario and Zelda, the Switch appeals to casual and hardcore gamers alike.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      name: "Mobile",
      description:
        "Mobile gaming has become increasingly popular due to the widespread availability of smartphones and tablets. Players can enjoy a wide variety of games on the go, from casual puzzles to competitive multiplayer titles, often available for free or at a low cost through app stores.",
      enabled: true,
      creatorId: null,
      modifierId: null
    }
  ];

  await GamePlatform.insertMany(gamePlatforms);
}
