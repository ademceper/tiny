'use client';

import * as React from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

interface OrgDrawerProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export const OrgDrawer = ({
  children,
  open,
  onOpenChange,
  className = '',
}: OrgDrawerProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={`hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none p-0 sm:max-w-lg ${className}`}
        >
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={`p-0 ${className} dark:bg-zinc-900`}>
        <div className='hide-scrollbar max-h-[85vh] overflow-y-auto'>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
