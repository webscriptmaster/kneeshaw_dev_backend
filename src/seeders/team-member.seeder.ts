import { TeamMember } from "../models/team-member.model";

export default async function seedTeamMembers() {
  await TeamMember.deleteMany({});

  const members = [
    {
      avatar: "static/teams/members/01.png",
      firstName: "Michael",
      lastName: "Kneeshaw",
      position: "CEO",
      enabled: true,
      memo: "Github: https://github.com/Kneeshaw-Developments",
      creatorId: null,
      modifierId: null
    },
    {
      avatar: "static/teams/members/02.png",
      firstName: "Aidan",
      lastName: "Abat",
      position: "Developer",
      enabled: true,
      memo: "Github: https://github.com/aidanabat",
      creatorId: null,
      modifierId: null
    },
    {
      avatar: "static/teams/members/03.png",
      firstName: "Steven",
      lastName: "Universe",
      position: "Developer",
      enabled: true,
      memo: "Github: https://github.com/truthfuldev",
      creatorId: null,
      modifierId: null
    }
  ];

  await TeamMember.insertMany(members);
}
