'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { RiAddCircleFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';  // useRouter hook'u import edildi

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { OrganizationService } from '@/services/organization.service';
import { OrganizationRequest } from '@/app/modules/schemas/organizationSchema';
import { DottedSeperator } from '../ui/dotted-separator';
import CreateOrgModal from './create-org-modal';

type OrganizationResponse = OrganizationRequest & {
  id: string;
  plan: string;
};

export function OrgSwitcher() {
  const { isMobile } = useSidebar();
  const [teams, setTeams] = useState<OrganizationResponse[]>([]);
  const [activeTeam, setActiveTeam] = useState<OrganizationResponse | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const router = useRouter();  // useRouter hook'u ile router'ı alıyoruz

  const fetchOrganizations = async () => {
    try {
      const response = await OrganizationService.getAll();
      const organizations = response.data.organizations;

      if (organizations && organizations.length > 0) {
        setTeams(organizations);
        setActiveTeam(organizations[0]);
      } else {
        setTeams([]);
        setActiveTeam(null);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleAddOrganization = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    fetchOrganizations();
  };

  // Seçilen organizasyonu işaretlemek ve URL'yi güncellemek
  const handleOrganizationSelect = (team: OrganizationResponse) => {
    setActiveTeam(team);
    // Seçilen organizasyonun ID'sini URL'ye yerleştiriyoruz
    router.push(`/organization/${team.id}`);  // URL'yi güncelliyoruz
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DottedSeperator className='py-2' />
        <div className='gap-py-2 flex flex-col py-2'>
          <div className='flex items-center justify-between pr-1 pl-2.5'>
            <p className=' text-xs font-medium uppercase'>
              Organization
            </p>
            <RiAddCircleFill
              onClick={handleAddOrganization}
              className='size-5 cursor-pointer text-neutral-500 transition hover:opacity-75'
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                  {activeTeam ? activeTeam.name.charAt(0) : ''}
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {activeTeam ? activeTeam.name : 'No organization selected'}
                  </span>
                  <span className='truncate text-xs'>
                    {activeTeam?.domain || ''}
                  </span>
                </div>
                <ChevronsUpDown className='ml-auto' />
              </SidebarMenuButton>
              <DottedSeperator className='py-2' />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Organizations
            </DropdownMenuLabel>

            {teams.length === 0 ? (
              <DropdownMenuItem className='gap-2 p-2'>
                No organizations available
              </DropdownMenuItem>
            ) : (
              teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.id}
                  onClick={() => handleOrganizationSelect(team)}  // Organizasyonu seçince handleOrganizationSelect çalışacak
                  className='gap-2 p-2'
                >
                  <div className='flex size-6 items-center justify-center rounded-sm border font-medium'>
                    {team.name.charAt(0)}
                  </div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      {isDrawerOpen && <CreateOrgModal onClose={handleCloseDrawer} />}
    </SidebarMenu>
  );
}
