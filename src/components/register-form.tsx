'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AuthService } from '@/services/auth.service'; // AuthServis örneği, backend ile iletişimde kullanılacak
import { RegisterSchema, RegisterRequest } from '@/app/modules/schemas/registerSchema'; // Register Schema örneği

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterRequest>({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Step 1: Validation
    const result = RegisterSchema.safeParse(form);

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

    // Step 2: API Request (kayıt işlemi)
    try {
      const res = await AuthService.register(form); // Burada kendi register servis fonksiyonunuzu kullanın

      if (res?.data?.user) {
        // Kayıt başarılı, kullanıcı bilgilerini sakla
        toast.success("Registration successful", {
          description: `Welcome ${res.data.user.name}`
        });
        // Kullanıcı başarılı bir şekilde kaydedildiyse login sayfasına yönlendir
        router.push('/sign-in');
      } else {
        toast.error("Registration failed", {
          description: res?.message || 'Unknown error occurred',
          richColors: true,
        });
      }
    } catch (err: any) {
      const errorMsg = err?.response?.data?.error?.message || 'An unexpected error occurred';
      toast.error("Registration error", {
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
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
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
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/sign-in" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </>
  );
}
