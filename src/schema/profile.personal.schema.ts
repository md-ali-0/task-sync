import { File } from "buffer";
import { z } from "zod";

export const profilePersonalSchema = z.object({
    avatar:
        z.any().optional() ||
        z.string().optional() ||
        z.instanceof(File).optional() ||
        z.string().url("Invalid avatar URL").optional(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    company: z.string().optional(),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
});
