import { Faq } from "../models/faq.model";

export default async function seedFaqs() {
  await Faq.deleteMany({});

  const faqs = [
    {
      question: "What is game development?",
      answer:
        "Game development is the process of creating video games. It involves designing the game concept, creating the graphics and sound effects, programming the game mechanics, and testing the game to ensure it is fun and playable.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is a game engine?",
      answer:
        "A game engine is a software framework designed for the creation and development of video games.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is the purpose of game design documents (GDD)?",
      answer:
        "Game design documents outline the overall vision, mechanics, and features of a video game before development begins.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is the role of a game designer?",
      answer:
        "A game designer is responsible for creating the gameplay, rules, and overall experience of a video game.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is the difference between 2D and 3D game development?",
      answer:
        "2D games are created in two-dimensional space, while 3D games are developed in three-dimensional space with depth.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is AI in game development?",
      answer:
        "AI (Artificial Intelligence) in game development refers to programming computer-controlled characters to behave intelligently within the game world.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is a level editor in game development?",
      answer:
        "A level editor is a tool used by developers to design and build levels or environments within a video game.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is procedural generation in games?",
      answer:
        "Procedural generation is a technique used in game development to create content algorithmically rather than manually.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is the role of sound design in video games?",
      answer:
        "Sound design involves creating and implementing audio elements such as music, sound effects, and voiceovers to enhance the gaming experience.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is virtual reality (VR) in game development?",
      answer:
        "Virtual reality is a technology that immerses players in a simulated environment using VR headsets and motion-tracking devices.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is monetization in game development?",
      answer:
        "Monetization refers to the methods used by developers to generate revenue from their games, such as in-app purchases, ads, or subscriptions.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is playtesting in game development?",
      answer:
        "Playtesting involves gathering feedback from players to identify and address issues with gameplay, mechanics, and overall user experience.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is the role of a game producer?",
      answer:
        "A game producer oversees the development process, manages resources, schedules, and ensures that the game meets its goals and deadlines.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is multiplayer networking in game development?",
      answer:
        "Multiplayer networking involves creating systems that allow multiple players to connect and interact with each other in real-time within a game.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What are shaders in game development?",
      answer:
        "Shaders are programs used to manipulate graphics and create visual effects in games, such as lighting, shadows, and textures.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is gamification?",
      answer:
        "Gamification is the process of applying game design elements and principles to non-game contexts to engage users and solve problems.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question:
        "What is the difference between game development for mobile and PC/console platforms?",
      answer:
        "Mobile game development focuses on optimizing games for touchscreens and smaller screens, while PC/console development offers more processing power and input options.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is the role of a narrative designer in game development?",
      answer:
        "A narrative designer is responsible for creating the story, characters, dialogues, and overall narrative structure of a video game.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question:
        "What is the importance of user experience (UX) design in game development?",
      answer:
        "UX design focuses on creating interfaces and interactions that are intuitive, engaging, and enjoyable for players, enhancing their overall gaming experience.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What is early access in game development?",
      answer:
        "Early access allows developers to release their games to players before completion, gathering feedback and funding to further develop and improve the game.",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      question: "What are some popular game development tools and engines?",
      answer:
        "Popular game development tools and engines include Unity, Unreal Engine, Godot Engine, Construct, RPG Maker, and GameMaker Studio.",
      enabled: true,
      creatorId: null,
      modifierId: null
    }
  ];

  await Faq.insertMany(faqs);
}
