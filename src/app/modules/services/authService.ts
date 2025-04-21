import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import { RegisterRequest } from '../schemas/registerSchema';
import { LoginRequest } from '../schemas/loginSchema';
import { OrganizationService } from './organizationService';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function register(data: RegisterRequest) {
  const { email, password, name } = data;

  if (!email || !password || !name) {
    throw new Error('Email, password, and name are required');
  }

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('This email is already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  });

  const newOrganization = await OrganizationService.createOrganization({
    name: 'Default', 
    domain: 'default.com', 
  });

  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    },
    newOrganization
  };
}

export async function login(data: LoginRequest, ip: string, device: string) {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw new Error('Invalid credentials');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ 
    userId: user.id, 
    email: user.email, 
    name: user.name 
  }, JWT_SECRET, {
    expiresIn: '1d'
  });

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  await db.session.create({
    data: {
      userId: user.id,
      token,
      ip,
      device,
      expiresAt
    }
  });

  return {
    token,
    user: { id: user.id, email: user.email, name: user.name } // kullanıcı bilgilerini döndürüyoruz
  };
}