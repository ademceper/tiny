import { loginUser } from "@/app/modules/controllers/authController";


export async function POST(req: Request) {
  return await loginUser(req)
}
