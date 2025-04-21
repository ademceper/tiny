'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DottedSeperator } from '@/components/ui/dotted-separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  OrganizationRequest,
  OrganizationSchema
} from '@/app/modules/schemas/organizationSchema';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { OrganizationService } from '@/services/organization.service';
import { usePathname, useRouter } from 'next/navigation';

interface CreateOrgFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

const CreateOrgForm = ({ onCancel, onSuccess }: CreateOrgFormProps) => {
  const pathname = usePathname();
  const hideCancel = pathname === '/organization/create';
  const router = useRouter();

  const form = useForm<OrganizationRequest>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: '',
      domain: null
    }
  });

  const onSubmit = async (data: OrganizationRequest) => {
    try {
      const response = await OrganizationService.create({
        name: data.name,
        domain: data.domain ?? null
      });

      if (response?.success) {
        toast.success('Organization başarıyla oluşturuldu!');
        await OrganizationService.getAll();
        onSuccess?.();
        router.push('/');
      } else {
        toast.error(response?.error?.message || 'Organization oluşturulamadı');
      }
    } catch (error) {
      toast.error('Organization oluşturulurken bir hata oluştu');
    }
  };

  return (
    <Card className='h-full w-full border-none shadow-none dark:border-zinc-700 dark:bg-zinc-900'>
      <CardHeader className='px-7'>
        <CardTitle className='text-xl font-semibold text-zinc-900 dark:text-zinc-100'>
          Create a new organization
        </CardTitle>
      </CardHeader>

      <div className='px-7'>
        <DottedSeperator />
      </div>

      <CardContent className='px-7 text-zinc-800 dark:text-zinc-200'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Organization Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter organization name'
                      className='w-full bg-white dark:bg-zinc-800'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='domain'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain (optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder='example.com'
                      className='w-full bg-white dark:bg-zinc-800'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DottedSeperator className='py-2' />

            <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
              {!hideCancel && (
                <Button
                  type='button'
                  size='lg'
                  onClick={onCancel}
                  className='w-full md:w-auto'
                  variant='outline'
                >
                  Cancel
                </Button>
              )}
              <Button type='submit' size='lg' className='w-full md:w-auto'>
                Create Organization
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateOrgForm;
