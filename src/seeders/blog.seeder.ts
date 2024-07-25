import { BlogCategory } from "../models/blog-category.model";
import { Blog } from "../models/blog.model";
import { Game } from "../models/game.model";

export default async function seedBlogs() {
  const categories = await BlogCategory.find();
  const games = await Game.find();

  await Blog.deleteMany({});

  const blogs = [
    {
      category: categories.length > 0 ? categories[0] : null,
      game: games.length > 0 ? games[0] : null,
      title: "Titan Saga’s  Sneak Peak",
      description:
        "Create a story that the players can actually impact using the D&D Skill System, that accomplishes the measure the ability of a character to succeed at a task.",
      details:
        "Create a story that the players can actually impact using the D&D Skill System, that accomplishes the measure the ability of a character to succeed at a task.",
      thumbnail: {
        small:
          "static/blogs/1710182766386-978389677-titansaga-thumbnail-small.png",
        large:
          "static/blogs/1710182766389-780898360-titansaga-thumbnail-large.png"
      },
      screenshots: [
        "static/blogs/1710182766391-331917097-titansaga-screenshot-01.png",
        "static/blogs/1710182766392-13210006-titansaga-screenshot-02.png",
        "static/blogs/1710182766393-426090149-titansaga-screenshot-03.png"
      ],
      features: [
        {
          title: "Proposed future improvements",
          thumbnail:
            "static/blogs/1710182766394-90862331-titansaga-feature-thumbnail-01.png",
          items: [
            "Animated Difficulty Dice Roll",
            "Special Bonuses At Specific Levels of Talents",
            "Special Skills At Specific Levels of Talents"
          ]
        },
        {
          title: "Updated future improvements",
          thumbnail:
            "static/blogs/1710182766397-998533788-titansaga-feature-thumbnail-02.png",
          items: [
            "Special Skills At Specific Levels of Talents",
            "Animated Difficulty Dice Roll",
            "Special Bonuses At Specific Levels of Talents"
          ]
        },
        {
          title: "Created future improvements",
          thumbnail:
            "static/blogs/1710182766400-658742100-titansaga-feature-thumbnail-03.png",
          items: [
            "Special Bonuses At Specific Levels of Talents",
            "Special Skills At Specific Levels of Talents",
            "Animated Difficulty Dice Roll"
          ]
        }
      ],
      enabled: true
    }
  ];

  await Blog.insertMany(blogs);
}
