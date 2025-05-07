import { z } from "zod";
import { requiredString } from "../util/util";


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
