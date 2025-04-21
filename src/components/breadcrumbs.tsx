'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import { IconSlash } from '@tabler/icons-react';
import { Fragment } from 'react';

export function Breadcrumbs() {
  const items = useBreadcrumbs();

  // Eğer breadcrumb öğelerinde GUID'yi engellemek istiyorsanız, link'leri filtreleyebiliriz
  const filteredItems = items.map(item => ({
    ...item,
    // Eğer link içinde GUID varsa, onu temizleyebiliriz
    link: item.link.replace(/\/[a-f0-9\-]{36}$/, '')  // URL sonundaki GUID'yi kaldırıyoruz
  }));

  if (filteredItems.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {filteredItems.map((item, index) => (
          <Fragment key={item.title}>
            {index !== filteredItems.length - 1 && (
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < filteredItems.length - 1 && (
              <BreadcrumbSeparator className='hidden md:block'>
                <IconSlash />
              </BreadcrumbSeparator>
            )}
            {index === filteredItems.length - 1 && (
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
