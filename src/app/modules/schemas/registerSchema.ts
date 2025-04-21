import * as z from "zod";

// Şema Tanımlaması
export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Password minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
}).strict();

// DTO ve Validator: Register verisi için tip çıkarımı
export type RegisterRequest = z.infer<typeof RegisterSchema>;
