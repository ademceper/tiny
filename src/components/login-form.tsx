'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AuthService } from '@/services/auth.service';
import { setToken } from '@/lib/tokenStorage';
import { LoginSchema, LoginRequest } from '@/app/modules/schemas/loginSchema';

export function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginRequest>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Step 1: Validation
    const result = LoginSchema.safeParse(form);

    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error("Validation Error", {
          description: err.message,
          richColors: true,
        });
      });
      setIsLoading(false);
      return;
    }

    // Step 2: API Request
    try {
      const res = await AuthService.login(form);

      if (res?.data?.token) {
        setToken(res.data.token);
        router.push('/');
      } else {
        toast.error("Login failed", {
          description: res?.message || 'Unknown error occurred',
          richColors: true,
        });
      }
    } catch (err: any) {
      const errorMsg = err?.response?.data?.error?.message || 'An unexpected error occurred';
      toast.error("Login error", {
        description: errorMsg,
        
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" onClick={handleSubmit} className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </>
  );
}
