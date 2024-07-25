import dotenv from "dotenv";

import connectDB from "../services/db.service";

import seedUsers from "./user.seeder";

import seedGameCategories from "./game-category.seeder";
import seedGamePlatforms from "./game-platform.seeder";
import seedGames from "./game.seeder";

import seedJobSkills from "./job-skill.seeder";
import seedJobDatabases from "./job-database.seeder";
import seedJobGodots from "./job-godot.seeder";
import seedJobExperiences from "./job-experience.seeder";
import seedJobPeriods from "./job-period.seeder";
import seedJobScopes from "./job-scope.seeder";
import seedJobBudgets from "./job-budget.seeder";

import seedBlogCategories from "./blog-category.seeder";
import seedBlogs from "./blog.seeder";

import seedServices from "./service.seeder";
import seedFaqs from "./faq.seeder";
import seedTeamMembers from "./team-member.seeder";
import seedCookieConsent from "./cookie-consent.seeder";

dotenv.config();

connectDB()
  .then(async () => {
    console.info("Database connected successfully.");

    await seedUsers();
    console.info("Users seeded successfully.");

    await seedGameCategories();
    console.info("Game categories seeded successfully.");

    await seedGamePlatforms();
    console.info("Game platforms seeded successfully.");

    await seedGames();
    console.info("Games seeded successfully.");

    await seedJobSkills();
    console.info("Job skills seeded successfully.");

    await seedJobDatabases();
    console.info("Job databases seeded successfully.");

    await seedJobGodots();
    console.info("Job godots seeded successfully.");

    await seedJobScopes();
    console.info("Job scopes seeded successfully.");

    await seedJobPeriods();
    console.info("Job periods seeded successfully.");

    await seedJobExperiences();
    console.info("Job experiences seeded successfully.");

    await seedJobBudgets();
    console.info("Job budgets seeded successfully.");

    await seedBlogCategories();
    console.info("Blog categories seeded successfully.");

    await seedBlogs();
    console.info("Blogs seeded successfully.");

    await seedServices();
    console.info("Services seeded successfully.");

    await seedFaqs();
    console.info("Faqs seeded successfully.");

    await seedTeamMembers();
    console.info("Team members seeded successfully.");

    await seedCookieConsent();
    console.info("Cookie consent seeded successfully.");

    process.exit();
  })
  .catch((error: Error) => {
    console.error("Database connection failed. error: ", error);
    process.exit();
  });
