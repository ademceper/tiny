'use client';

import * as React from 'react';
import data from '@/constants/menu';

import { NavMain } from '@/components/layout/nav-main';
import { NavProjects } from '@/components/layout/nav-projects';
import { NavSecondary } from '@/components/layout/nav-secondary';
import { NavUser } from '@/components/layout/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from '@/components/ui/sidebar';
import { OrgSwitcher } from '../organization/org-switcher';
import { ScrollArea } from '@/components/ui/scroll-area';
import Search from '../search';

export function AppLeftbar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <OrgSwitcher />
        <Search />
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <ScrollArea className="h-[calc(100dvh-152px)] overflow-auto">
          <div className="flex flex-col">
            <NavMain items={data.navMain} />
            <NavProjects projects={data.projects} />
            <NavSecondary items={data.navSecondary} />
          </div>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
