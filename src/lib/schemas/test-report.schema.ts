import { z } from "zod";

export const TestReportSchema = z.object({
  config: z.any(),
  suites: z.array(z.any()),
  errors: z.array(z.any()),
  stats: z.any()
});
