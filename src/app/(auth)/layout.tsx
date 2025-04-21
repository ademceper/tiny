import type { Metadata } from 'next';
import '../globals.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator'
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Authentication | Tiny',
  description: 'Login or register to access the platform'
};

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-2 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <a href='#' className='flex items-center gap-2 self-center font-medium'>
          <div className='text-primary-foreground flex size-6 items-center justify-center rounded-md'>
            <Image src="async.svg" width={120} height={40} alt="" />
          </div>
          Async Inc.
        </a>
        <div className={'flex flex-col gap-2'}>
          <Card className='w-full h-full  border-none shadow-none'>
            <CardHeader className='flex items-center justify-center text-center p-3'>
              <CardTitle className='text-2xl'>Welcome back!</CardTitle>
            </CardHeader>
            <div className='px-7'>
              <Separator/>
            </div>
            <CardContent>
              <form>
                <div className='grid gap-2'>{children}</div>
              </form>
            </CardContent>
          </Card>
          <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
            By clicking continue, you agree to our{' '}
            <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
