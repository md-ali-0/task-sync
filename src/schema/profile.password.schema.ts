import { z } from "zod";

export const profilePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
        newPassword: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .optional(),
        confirmPassword: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.newPassword && data.newPassword !== data.confirmPassword) {
                return false;
            }
            return true;
        },
        {
            message: "Passwords don't match",
            path: ["confirmPassword"],
        }
    );
