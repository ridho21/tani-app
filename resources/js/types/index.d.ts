export interface User {
    id: number;
    name: string;
    username: string;
    user_verified_at?: string;
    role : "admin" | "member"
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
