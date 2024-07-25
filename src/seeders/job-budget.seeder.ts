import { JobBudget } from "../models/job-budget.model";

export default async function seedJobBudgets() {
  await JobBudget.deleteMany({});

  const jobBudget = [
    {
      fixedMin: 0,
      fixedMax: 10000,
      rateMin: 0,
      rateMax: 200,
      creatorId: null,
      modifierId: null
    }
  ];

  await JobBudget.insertMany(jobBudget);
}
