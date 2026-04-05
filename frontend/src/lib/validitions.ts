import * as z from "zod";

export const userInput = z.object({
    email: z
        .email()
        .min(6, "Tên tối thiểu 6 kí tự")
        .max(20, "tên tối đa 20 kí tự"),

    password: z
        .string()
        .min(3, "Tên phòng tối thiểu 6 kí tự")
        .max(30, "Tên phòng tối đa 30 kí tự"),


})

export type userInput = z.infer<typeof userInput>