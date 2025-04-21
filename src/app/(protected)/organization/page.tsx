'use server';

import { OrganizationService } from '@/services/organization.service';
import { redirect } from 'next/navigation';

export default async function Organization() {
  const response = await OrganizationService.getAll();
  const organizations = response?.data?.organizations;

  if (!organizations || organizations.length === 0) {
    redirect('/organization/create');
  }
  redirect(`/organization/${organizations[0].id}`);
}