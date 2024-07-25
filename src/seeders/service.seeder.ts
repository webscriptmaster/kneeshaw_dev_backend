import { Service } from "../models/service.model";

export default async function seedServices() {
  await Service.deleteMany({});

  const services = [
    {
      thumbnail: "static/services/01.png",
      title: "Mobile Game Development",
      description: "Specialized in creating captivating and immersive games",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      thumbnail: "static/services/02.png",
      title: "Unity 2D Game",
      description:
        "Tailoring mechanics, graphics, and animations to suit your vision",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      thumbnail: "static/services/03.png",
      title: "Unity 3D Game",
      description:
        "Creating realistic environments, lifelike characters, and dynamic gameplay",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      thumbnail: "static/services/04.png",
      title: "Unreal Game Development",
      description: "Transforming your ideas into a polished and thrilling game",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      thumbnail: "static/services/05.png",
      title: "Godot Game Development",
      description:
        "Developing high-quality games that run smoothly across various platforms",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      thumbnail: "static/services/06.png",
      title: "HTML5 Game Development",
      description:
        "Interactive games that are compatible with desktops, laptops, and mobile devices",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      thumbnail: "static/services/07.png",
      title: "Web3 Game Development",
      description: "Creating innovative and immersive gaming experiences",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      thumbnail: "static/services/08.png",
      title: "Dapps Development",
      description:
        "We leverage our expertise to build secure and user-friendly dApps",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      thumbnail: "static/services/09.png",
      title: "Blockchain Integration",
      description: "Specialized in creating captivating and immersive games",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      thumbnail: "static/services/10.png",
      title: "Bug Fixing",
      description:
        "Tailoring mechanics, graphics, and animations to suit your vision",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      thumbnail: "static/services/11.png",
      title: "System Design",
      description:
        "Creating realistic environments, lifelike characters, and dynamic gameplay",
      enabled: true,
      creatorId: null,
      modifierId: null
    },
    {
      thumbnail: "static/services/12.png",
      title: "API Creation",
      description:
        "Creating realistic environments, lifelike characters, and dynamic gameplay",
      enabled: true,
      creatorId: null,
      modifierId: null
    }
  ];

  await Service.insertMany(services);
}
