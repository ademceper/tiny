// app/api/auth/register/route.ts

import { registerUser } from "@/app/modules/controllers/authController";
import { withCors, handleOptions } from "@/lib/cors"; 

export async function OPTIONS() {
  return handleOptions(); 
}

export async function POST(req: Request) {
  const response = await registerUser(req);
  return withCors(response); 
}
