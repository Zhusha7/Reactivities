import { DateArg, format } from "date-fns";
import { z } from "zod";

export const formatDate = (date: DateArg<Date>) => {
    return format(date, "dd MMM yyyy h:mm a");
};

export const requiredString = (fieldName: string) =>
    z.string({ required_error: `${fieldName} is required` }).min(3, {
        message: `${fieldName} must be at least 3 characters`,
    });
