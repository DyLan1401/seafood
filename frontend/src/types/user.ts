export interface User {
    id: string,
    email: string,
    password: string | null;
    role: string;
    customerName?: string | undefined;

}