// app/api/auth/register/route.ts

import { registerUser } from "@/app/modules/controllers/authController";


export async function POST(req: Request) {
  return await registerUser(req)
}
