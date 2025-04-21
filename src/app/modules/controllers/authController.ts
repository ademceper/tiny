import { NextResponse } from 'next/server';
import { login, register } from '../services/authService';
import { response } from '@/lib/apiResponse';
import { LoginSchema } from '../schemas/loginSchema';
import { RegisterSchema } from '../schemas/registerSchema';

export async function registerUser(req: Request) {
  const start = Date.now(); 

  try {
    const body = await req.json();
    const parseResult = RegisterSchema.safeParse(body);

    if (!parseResult.success) {
      throw new Error('Invalid request parameters');
    }
    const user = await register(body);
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        true,
        'Registration successful',
        201,
        { user },
        undefined,
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' } 
      )
    );
  } catch (error: any) {
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        false,
        'An error occurred during registration',
        500,
        undefined,
        {
          code: 'REGISTER_ERROR',
          message: error.message,
          category: 'system',
        },
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' } 
      )
    );
  }
}

export async function loginUser(req: Request) {
  const start = Date.now(); 
  try {
    const body = await req.json();
    const parseResult = LoginSchema.safeParse(body);
    if (!parseResult.success) {
      throw new Error('Invalid request parameters');
    }

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const result = await login(body, ip, userAgent);
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        true,
        'Login successful',
        200,
        { token: result.token, user: result.user },
        undefined,
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' } 
      )
    );
  } catch (error: any) {
    const processingTime = Date.now() - start;

    return NextResponse.json(
      response(
        false,
        'An error occurred during login',
        401,
        undefined,
        {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid credentials',
          category: 'authentication',
        },
        undefined,
        undefined,
        { processingTime, dataType: 'JSON' } 
      )
    );
  }
}
