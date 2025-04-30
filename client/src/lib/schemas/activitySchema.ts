import { z } from "zod";

const requiredString = (fieldName: string) => {
    return z.string({ required_error: `${fieldName} is required` }).min(3, {
        message: `${fieldName} must be at least 3 characters`,
    });
};

export const activitySchema = z.object({
    title: requiredString("Title"),
    description: requiredString("Description"),
    category: requiredString("Category"),
    date: z
        .date({ required_error: "Date is required" })
        .min(new Date(), { message: "Date must be in the future" }),
    location: z.object({
        venue: requiredString("Venue"),
        city: z.string().optional(),
        latitude: z.coerce.number(),
        longitude: z.coerce.number(),
    }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
