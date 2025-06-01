import { z } from "zod";
import { requiredString } from "../util/util";

export const editProfileSchema = z.object({
    displayName: requiredString("Display name"),
    bio: z.string().max(1000, "Bio must be less than 1000 characters").optional(),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;