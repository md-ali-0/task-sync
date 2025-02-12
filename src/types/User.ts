export const user_role = {
    admin: "admin",
    user: "user",
} as const;

export const user_status = {
    active: "active",
    blocked: "blocked",
} as const;

export type User = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    bio: string | null;
    password: string;
    status: keyof typeof user_status;
    role: keyof typeof user_role;
    createdAt: Date;
    updatedAt: Date;
};
