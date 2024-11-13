import z from "zod";

export const locationEnum = ["Remote", "Onsite", "Hybrid"] as const;

export const jobTypeEnum = [
  "Fulltime",
  "Internship",
  "Contract",
  "Freelance",
] as const;

export const experienceEnum = [
  "Fresher",
  "0-1y",
  "1-3y",
  "3-5y",
  "5y",
] as const;

export const createJobSchema = z
  .object({
    position: z
      .string({ message: "Position is required" })
      .min(2, { message: "Extend it little" })
      .max(20, { message: "Keep it shorter" }),

    company: z
      .string({ message: "Company name is required" })
      .min(2, { message: "Extend it little" }),

    company_logo: z.union([z.any().optional(), z.string().optional()]),
    company_website: z
      .string()
      .optional()
      .refine(
        (value) => !value || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value),
        {
          message: "Company's website must be a valid URL",
        }
      ),

    role_description: z
      .string({ message: "Description is required" })
      .min(200, {
        message: "Description need to be long",
      }),
    location: z.enum(locationEnum, {
      message: "Unexpected Inputs",
    }),

    job_type: z.enum(jobTypeEnum, { message: "Unexpected Inputs" }),

    experience_level: z.enum(experienceEnum, { message: "Unexpected Inputs" }),

    salary_disclosed: z.boolean({ message: "Required" }),

    salary_min: z.coerce
      .number({ message: "Max salary must be a number" })
      .nonnegative()
      .optional()
      .transform((val) => (val === 0 ? null : val)),
    salary_max: z.coerce
      .number({ message: "Max salary must be a number" })
      .nonnegative()
      .optional()
      .transform((val) => (val === 0 ? null : val)),

    apply_link: z
      .string({ message: "Must provide apply link" })
      .url({ message: "Invalid url" }),

    author: z.string({ message: "Author is required" }).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.salary_disclosed) {
      if (!data.salary_min) {
        return ctx.addIssue({
          code: "custom",
          path: ["salary_min"],
          message: "Minimum salary is required when salary is disclosed",
        });
      }

      if (data.salary_min < 5000) {
        return ctx.addIssue({
          code: "too_small",
          path: ["salary_min"],
          minimum: 5000,
          inclusive: true,
          type: "number",
          message: "Number must be greater than or equal to 5000",
        });
      }

      if (!data.salary_max) {
        return ctx.addIssue({
          code: "custom",
          path: ["salary_max"],
          message: "Maximum salary is required when salary is disclosed",
        });
      }

      if (data.salary_max <= data.salary_min) {
        return ctx.addIssue({
          code: "custom",
          path: ["salary_max"],
          message: "Number must be greater than Minimum salary",
        });
      }
    }
  });

export type createJobSchemaType = z.infer<typeof createJobSchema>;
