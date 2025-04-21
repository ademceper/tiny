import * as z from "zod";

// Şema Tanımlaması
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
}).strict();

// DTO ve Validator: Login verisi için tip çıkarımı
export type LoginRequest = z.infer<typeof LoginSchema>;
