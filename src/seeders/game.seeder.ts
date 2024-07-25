import { GameCategory } from "../models/game-category.model";
import { GamePlatform } from "../models/game-platform.model";
import { Game } from "../models/game.model";

export default async function seedGames() {
  const categories = await GameCategory.find();
  const platforms = await GamePlatform.find();

  await Game.deleteMany({});

  const games = [
    {
      enabled: true,
      category: categories.length > 0 ? categories[0] : null,
      platform: platforms.length > 0 ? platforms[0] : null,
      title: "Titan Saga: Chains of Kronos",
      shortTitle: "Titan Saga",
      promotional:
        "Titan saga is an open world fantasy rpg, focused on deep customization of characters and town. Through tough choices, tactical battles and epic dungeons, you will experience an exciting and unique adventure.",
      description:
        "It is a turn-based RPG (role-playing game) that takes place in a fantasy world filled with magic and mythical creatures. The game features a deep and immersive story, with players taking on the role of a hero tasked with saving the world from destruction.",
      history: "",
      releaseDate: null,
      players: null,
      availableLanguages: ["English"],
      gamers: 7000,
      price: 14.99,
      downloadLink:
        "https://store.steampowered.com/app/659140/Titan_Saga_Chains_of_Kronos/",
      banner: "static/games/titansaga-banner.png",
      splash: "static/games/titansaga-splash.jpg",
      thumbnail: "static/games/titansaga-thumbnail.png",
      logos: [
        "static/games/titansaga-logo-01.png",
        "static/games/titansaga-logo-02.jpg"
      ],
      screenshots: [
        "static/games/titansaga-screenshot-01.jpg",
        "static/games/titansaga-screenshot-02.jpg",
        "static/games/titansaga-screenshot-03.jpg",
        "static/games/titansaga-screenshot-04.jpg",
        "static/games/titansaga-screenshot-05.jpg",
        "static/games/titansaga-screenshot-06.jpg",
        "static/games/titansaga-screenshot-07.jpg"
      ],
      overview: {
        title: "Build a Royal House",
        description:
          "In Titan Saga, players can explore a vast and diverse world filled with hidden secrets and treasures. They can also recruit a team of powerful heroes with unique abilities and skills, which can be leveled up and customized to suit their play style. The game also features challenging boss battles and a variety of quests and side missions to keep players engaged.\r\nOverall, Titan Saga aims to offer an engaging and immersive RPG experience for players who enjoy epic stories, deep gameplay mechanics, and beautiful visuals.\r\nRebuild a fallen house, choose the strongest warriors in the land.",
        characters: [
          {
            thumbnail: "static/games/titansaga-character-01.png",
            title: "The Axe of the West",
            description:
              "The retired hero of the Eleven wars, experienced and wise"
          },
          {
            thumbnail: "static/games/titansaga-character-02.png",
            title: "The Titan-Bond",
            description:
              "A young nobleman with a forsaken and destroyed house, desperately seeking to save his kingdom"
          },
          {
            thumbnail: "static/games/titansaga-character-03.png",
            title: "Arrow of the Lake",
            description:
              "A strong hearted Noble with the eye of an Eagle and a will of an Ox"
          },
          {
            thumbnail: "static/games/titansaga-character-04.png",
            title: "The Sorcerer of Gems",
            description:
              "A run away heiress with two powerful opposing elements, seeking adventure and her lost mother"
          },
          {
            thumbnail: "static/games/titansaga-character-05.png",
            title: "The Dragon Paladin",
            description:
              "A Commoner clad in fireproof steel with an unquenchable thirst for dragon hunting"
          }
        ]
      },
      features: [
        {
          thumbnail: "static/games/titansaga-feature-01.png",
          title: "Dynamic Lighting",
          description:
            "As players venture through the intricate environments, they will witness the dynamic lighting system in action. Whether it's exploring ancient dungeons, wandering through dense forests, or traversing bustling cities, the lighting dynamically adjusts to create a truly atmospheric experience. "
        },
        {
          thumbnail: "static/games/titansaga-feature-02.png",
          title: "Action Battle System",
          description:
            "Visually stunning and immersive battlegrounds. Engage in dynamic, high-octane battles with dazzling animations and explosive special effects. Whether you're facing off against colossal bosses or engaging in intense skirmishes with hordes of enemies, every fight feels like an epic showdown."
        },
        {
          thumbnail: "static/games/titansaga-feature-03.png",
          title: "Customizable Equipments",
          description:
            "With customizable equipment in TitanSaga, you have the freedom to craft a legendary hero whose gear matches their legend. Fine-tune your weaponry, amplify your defenses, and create a visual masterpiece that sets you apart from the rest. The possibilities are limitless, and the path to becoming an unstoppable force lies in your hands."
        },
        {
          thumbnail: "static/games/titansaga-feature-04.png",
          title: "Unique Enemies",
          description:
            "Explore the far reaches of the game world and encounter enemies that challenge you both physically and mentally. Adapt to their combat styles, study their patterns, and exploit their vulnerabilities to gain the upper hand. Each encounter is an opportunity to showcase your strategic prowess and prove your worth as a formidable hero."
        }
      ],
      story: {
        title: "Explore Titan Saga’ Story",
        description:
          "Imperial Unity, it was supposed to save the humans and bring back order. As the lord ruler began to lose his influence to the growing houses, he made law that the higher houses would have to wed their heirs to the lesser houses on the fringes of human lands. He said the Titan of Fire had commanded it, but even the common folk know he can no longer hear that voice. The lord ruler needed to redistribute the power, to stop the potential coup from the most powerful house. He would do anything to keep his power. Unbeknownst to all, an ancient force had awakened. The elves had found their paragon, The Titan of Air. He had crafted the first elves in the times before. The magic they once had, began to return. Human long knew they would never be able to turn back to magic. The Chains of Kronos sealed the Titan of Fire. But they were a people who looked forward and soon a large empire-wide guild of engineers had formed. With black powder and steam, humans had become the most powerful race. As magic begins a new, that may not last. Kronos the Titan who sealed all with not be able to hold be the Titan of Air for long. You begin your journey as an unfortunate young heir, to a lesser noble house, forced to flee from your city. Elves were provoked to attack your small city on the edge of the human empire. Nefarious human enemies seem to want you dead and your family name destroyed. You must safe your family, your name, your people, your land and maybe... your race. As you begin your adventure, you notice more and more strange magical anomalies, you know something bigger than just you is happening. Choose your allies wisely, as this journey will not be easy."
      },
      videos: [
        {
          thumbnail: "static/games/titansaga-video-thumbnail-01.jpg",
          title: "Titans Saga: Chains of Kronos! New game, new start!",
          src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        }
      ],
      credits:
        "We kindly request that you credit any assets used from the Press Kit to Kneeshaw Games and provide a link back to our official website.\r\nShould you require any additional information or have specific media requests, please don't hesitate to reach out to our dedicated press contact listed in the Press Kit.\r\nThank you for your support, and we look forward to seeing your coverage of TitanSaga!",
      creatorId: null,
      modifierId: null
    },
    {
      enabled: true,
      category: categories.length > 0 ? categories[0] : null,
      platform: platforms.length > 0 ? platforms[0] : null,
      title: "Old Salt",
      shortTitle: "",
      promotional:
        "A player obtains victory over the other players by controlling 6 islands or being the last ship sailing. There are many routes to that victory but the journey will without a doubt involve sailing your ships, firing cannons, seizing islands, and using faction abilities.",
      description:
        "Players begin the game as one of six factions with control of three islands, a fleet of ships and a handful of gold. A player obtains victory over the other players by controlling 6 islands or being the last ship sailing. There are many routes to that victory but the journey will without a doubt involve sailing your ships, firing cannons, seizing islands, and using faction abilities.",
      history: "",
      releaseDate: new Date("2022-01-20"),
      players: null,
      availableLanguages: ["English"],
      gamers: 8000,
      price: 9.99,
      downloadLink: "https://kneeshawdevelopments.itch.io/old-salt/purchase",
      banner: "static/games/oldsalt-banner.jpg",
      splash: "static/games/oldsalt-splash.jpg",
      thumbnail: "static/games/oldsalt-thumbnail.png",
      logos: ["static/games/oldsalt-logo-01.png"],
      screenshots: [
        "static/games/oldsalt-screenshot-01.jpg",
        "static/games/oldsalt-screenshot-02.jpg",
        "static/games/oldsalt-screenshot-03.jpg",
        "static/games/oldsalt-screenshot-04.jpg",
        "static/games/oldsalt-screenshot-05.jpg",
        "static/games/oldsalt-screenshot-06.jpg"
      ],
      overview: {
        title: "Bring Unique Faction",
        description:
          'Embark on a gripping survival adventure in the captivating world of the early 19th century. Stranded on a deserted island as a sailor, you must navigate the treacherous waters of survival in Old Salt. \r\nEngross yourself in a narrative that unfolds through journal entries and evocative flashbacks, providing a deeper connection to your character\'s plight.\r\nEmbark on a memorable journey of survival, exploration, and self-discovery in "Old Salt" – the game that challenges your resilience and captivates your imagination. Choose your allegiance from a diverse lineup of six unique factions, each with its distinct play style, units, and abilities. ',
        characters: [
          {
            thumbnail: "static/games/oldsalt-character-01.png",
            title: "Forgotten",
            description: ""
          },
          {
            thumbnail: "static/games/oldsalt-character-02.png",
            title: "Eternal",
            description: ""
          },
          {
            thumbnail: "static/games/oldsalt-character-03.png",
            title: "Engineers",
            description: ""
          },
          {
            thumbnail: "static/games/oldsalt-character-04.png",
            title: "Bootleggers",
            description: ""
          },
          {
            thumbnail: "static/games/oldsalt-character-05.png",
            title: "Barbarians",
            description: ""
          },
          {
            thumbnail: "static/games/oldsalt-character-06.png",
            title: "Elite",
            description: ""
          }
        ]
      },
      features: [
        {
          thumbnail: "static/games/oldsalt-feature-01.png",
          title: "Single Player Campaign",
          description:
            "Immerse yourself on an epic journey through a richly crafted world. Experience a thrilling storyline, engaging characters, and challenging missions as you uncover the secrets of this immersive game. Whether you're a seasoned player or new to the genre, the single-player campaign offers an exciting adventure tailored to your skill level."
        },
        {
          thumbnail: "static/games/oldsalt-feature-02.png",
          title: "Map Maker",
          description:
            "Test your skills against players from around the world in intense online multiplayer matches. Engage in thrilling head-to-head battles, team-based skirmishes, or join larger-scale conflicts in massive multiplayer modes. Rise through the ranks, earn prestigious rewards, and become a renowned commander in the competitive online multiplayer arena."
        },
        {
          thumbnail: "static/games/oldsalt-feature-03.png",
          title: "Multiplayer Matches",
          description:
            "Craft intricate landscapes, set strategic checkpoints, and customize every detail to create the perfect environment for thrilling encounters. Share your creations with the community and challenge others to conquer your masterfully designed maps. Endless possibilities for both casual players and aspiring level designers to leave their mark on the game."
        }
      ],
      story: {
        title: "Explore Old Salt’ Story",
        description:
          "Old Salt features various gameplay mechanics, including crafting, building, and hunting, as well as day and night cycles, and weather effects. The player must explore the island and solve various puzzles and obstacles to progress further in the game. The story is told through various means, such as journal entries and flashbacks, which provide insight into the character's background and motivations.\r\nOld Salt is designed to provide a challenging and immersive survival experience for players who enjoy exploring and overcoming obstacles in a detailed and historically accurate environment."
      },
      videos: [
        {
          thumbnail: "static/games/oldsalt-video-thumbnail.png",
          title: "Old Salt: Naval Combat and Area Control",
          src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        }
      ],
      credits:
        "We kindly request that you credit any assets used from the Press Kit to Kneeshaw Games and provide a link back to our official website.\r\nShould you require any additional information or have specific media requests, please don't hesitate to reach out to our dedicated press contact listed in the Press Kit.\r\nThank you for your support, and we look forward to seeing your coverage of TitanSaga!",
      creatorId: null,
      modifierId: null
    }
  ];

  await Game.insertMany(games);
}
