'use client';

import { useState } from 'react';
import {
  ChevronDown,
  Edit,
  ShieldCheck,
  ShieldOff,
  RefreshCw,
  Plus,
  Users,
  Building,
  Settings,
  Star,
  Globe,
  UserPlus,
  FolderKanban
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';

import { DottedSeperator } from '@/components/ui/dotted-separator';
import {
  EditOrganizationDialog,
  SecurityDialog,
  VisibilityDialog,
  LeaveOrganizationDialog,
  NewTeamDialog,
  SettingsDialog,
  InviteDialog
} from '@/components/organization/organization-dialogs';

interface OrganizationHeaderProps {
  isLoading?: boolean;
  handleRefresh?: () => void;
}

export function OrganizationHeader({
  isLoading: externalIsLoading = false,
  handleRefresh: externalHandleRefresh = () => {}
}: OrganizationHeaderProps) {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [localIsLoading, setLocalIsLoading] = useState(false);
  const [showOrganizationActions, setshowOrganizationActions] = useState(false);

  // Dialog states
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [tab, setTab] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);
  const [showVisibilityDialog, setShowVisibilityDialog] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  const isLoading = externalIsLoading || localIsLoading;

  const orgStats = {
    members: 56,
    teams: 8,
    activeProjects: 12,
    project: 15,
    storageUsed: 45
  };

  const handleRefresh = () => {
    if (isLoading) return;

    setLocalIsLoading(true);
    externalHandleRefresh();

    setTimeout(() => {
      setLocalIsLoading(false);
    }, 1000);
  };

  return (
    <div className='space-y-4'>
      <div className='p-6'>
        <div className='flex flex-col gap-6 md:flex-row md:items-start md:justify-between'>

          <div className='flex flex-1 items-start gap-4'>
            {isLoading ? (
              <Skeleton className='h-16 w-16 rounded-full' />
            ) : (
              <Avatar className='border-primary h-16 w-16 border-2'>
                <AvatarImage src='/organization-logo.png' alt='Acme Inc' />
                <AvatarFallback className='from-primary bg-gradient-to-br to-purple-600 text-lg font-semibold text-white'>
                  AI
                </AvatarFallback>
              </Avatar>
            )}

            <div className='flex-1 space-y-3'>
              <div className='flex flex-wrap items-center gap-2'>
                {isLoading ? (
                  <Skeleton className='h-7 w-40' />
                ) : (
                  <>
                    <h1 className='text-2xl font-bold tracking-tight'>
                      Acme Inc
                    </h1>
                    <Badge
                      variant='secondary'
                      className='border-primary/30 bg-primary/10 text-primary'
                    >
                      <Star className='fill-primary mr-1 h-3 w-3' />
                      Enterprise
                    </Badge>
                    <Badge
                      variant='outline'
                      className='flex items-center gap-1'
                    >
                      <Globe className='h-3 w-3' />
                      Public
                    </Badge>
                  </>
                )}

                <Popover
                  open={showOrganizationActions}
                  onOpenChange={setshowOrganizationActions}
                >
                  <PopoverTrigger asChild>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <ChevronDown className='h-4 w-4' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-56 space-y-1 p-1' align='start'>
                    <Button
                      variant='ghost'
                      onClick={() => {
                        setshowOrganizationActions(false);
                        setShowEditDialog(true);
                      }}
                      className='w-full justify-start gap-3 px-3 py-2 text-sm font-medium'
                    >
                      <div className='flex h-8 w-8 items-center justify-center rounded-full'>
                        <Edit className='h-4 w-4' />
                      </div>
                      <div className='text-left'>
                        <p>Edit Organization</p>
                        <p className='text-muted-foreground text-xs'>
                          Change name, logo, etc.
                        </p>
                      </div>
                    </Button>

                    <Button
                      variant='ghost'
                      onClick={() => {
                        setShowSecurityDialog(true);
                        setshowOrganizationActions(false);
                      }}
                      className='w-full justify-start gap-3 px-3 py-2 text-sm font-medium'
                    >
                      <div className='flex h-8 w-8 items-center justify-center rounded-full'>
                        <ShieldCheck className='h-4 w-4' />
                      </div>
                      <div className='text-left'>
                        <p>Security</p>
                        <p className='text-muted-foreground text-xs'>
                          Manage roles & access
                        </p>
                      </div>
                    </Button>

                    <Button
                      variant='ghost'
                      onClick={() => {
                        setshowOrganizationActions(false);
                        setShowVisibilityDialog(true);
                      }}
                      className='w-full justify-start gap-3 px-3 py-2 text-sm font-medium'
                    >
                      <div className='flex h-8 w-8 items-center justify-center rounded-full'>
                        <Globe className='h-4 w-4' />
                      </div>
                      <div className='text-left'>
                        <p>Visibility</p>
                        <p className='text-muted-foreground text-xs'>
                          Set organization privacy
                        </p>
                      </div>
                    </Button>

                    <div className='my-1 border-t' />

                    <Button
                      variant='ghost'
                      onClick={() => {
                        setshowOrganizationActions(false);
                        setShowLeaveDialog(true);
                      }}
                      className='text-destructive w-full justify-start gap-3 px-3 py-2 text-sm font-medium'
                    >
                      <div className='flex h-8 w-8 items-center justify-center rounded-full'>
                        <ShieldOff className='h-4 w-4' />
                      </div>
                      <div className='text-left'>
                        <p>Leave</p>
                        <p className='text-muted-foreground text-xs'>
                          Remove yourself from org
                        </p>
                      </div>
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>

              {isLoading ? (
                <Skeleton className='h-4 w-60' />
              ) : (
                <p className='text-muted-foreground'>
                  Enterprise software solutions for modern businesses. Founded
                  in 2015.
                </p>
              )}

              <div className='flex flex-wrap items-center gap-4 text-sm'>
                {isLoading ? (
                  <>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-20' />
                    <Skeleton className='h-4 w-28' />
                  </>
                ) : (
                  <>
                    <div className='text-muted-foreground flex items-center'>
                      <Users className='mr-2 h-3 w-3' />
                      <span>{orgStats.members} members</span>
                    </div>
                    <div className='text-muted-foreground flex items-center'>
                      <Building className='mr-2 h-3 w-3' />
                      <span>{orgStats.teams} teams</span>
                    </div>
                    <div className='text-muted-foreground flex items-center'>
                      <FolderKanban className='mr-2 h-3 w-3' />
                      <span>{orgStats.project} projects</span>
                    </div>
                    <div className='flex items-center'>
                      <div className='mr-2 h-2 w-2 rounded-full bg-green-500' />
                      <span className='text-green-600'>12 active</span>
                    </div>
                  </>
                )}
              </div>

              {!isLoading && (
                <div className='pt-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>Storage used</span>
                    <span className='font-medium'>45%</span>
                  </div>
                  <Progress value={orgStats.storageUsed} className='h-2' />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className='flex flex-col gap-2 sm:flex-row md:flex-col'>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={handleRefresh}
                disabled={isLoading}
                className='relative flex-1'
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
                />
                <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
                  Refresh
                </span>
              </Button>

              <Popover
                open={showQuickActions}
                onOpenChange={setShowQuickActions}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1 gap-2 transition-all hover:shadow-sm'
                  >
                    <Plus className='h-4 w-4' />
                    <span>Quick Actions</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${showQuickActions ? 'rotate-180' : ''}`}
                    />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className='w-56 p-2 shadow-lg'
                  align='end'
                  sideOffset={8}
                >
                  <div className='grid gap-1'>
                    <Button
                      variant='ghost'
                      className='w-full justify-start gap-3 px-3 py-2 text-sm font-medium'
                      onClick={() => {
                        setShowQuickActions(false);
                        setShowInviteDialog(true);
                      }}
                    >
                      <div className='flex h-8 w-8 items-center justify-center rounded-full'>
                        <UserPlus className='h-4 w-4' />
                      </div>
                      <div className='text-left'>
                        <p>Add Member</p>
                        <p className='text-muted-foreground text-xs'>
                          Invite via email
                        </p>
                      </div>
                    </Button>

                    <Button
                      variant='ghost'
                      className='w-full justify-start gap-3 px-3 py-2 text-sm font-medium'
                      onClick={() => {
                        setShowQuickActions(false);
                        setShowNewTeamDialog(true);
                      }}
                    >
                      <div className='flex h-8 w-8 items-center justify-center rounded-full'>
                        <Building className='h-4 w-4' />
                      </div>
                      <div className='text-left'>
                        <p>New Team</p>
                        <p className='text-muted-foreground text-xs'>
                          Organize members
                        </p>
                      </div>
                    </Button>

                    <Separator className='my-1' />

                    <Button
                      variant='ghost'
                      className='w-full justify-start gap-3 px-3 py-2 text-sm font-medium'
                      onClick={() => {
                        setShowQuickActions(false);
                        setShowSettingsDialog(true);
                      }}
                    >
                      <div className='flex h-8 w-8 items-center justify-center rounded-full'>
                        <Settings className='h-4 w-4' />
                      </div>
                      <div className='text-left'>
                        <p>Settings</p>
                        <p className='text-muted-foreground text-xs'>
                          Organization config
                        </p>
                      </div>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <Button
              size='sm'
              className='w-full'
              onClick={() => setShowInviteDialog(true)}
            >
              <Plus className='mr-2 h-4 w-4' />
              Invite Members
            </Button>
          </div>
        </div>
      </div>
      <DottedSeperator />

      {/* Render all the dialogs */}

      <InviteDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
      />
      <EditOrganizationDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
      <SecurityDialog
        open={showSecurityDialog}
        onOpenChange={setShowSecurityDialog}
      />
      <VisibilityDialog
        open={showVisibilityDialog}
        onOpenChange={setShowVisibilityDialog}
      />
      <LeaveOrganizationDialog
        open={showLeaveDialog}
        onOpenChange={setShowLeaveDialog}
      />
      <NewTeamDialog
        open={showNewTeamDialog}
        onOpenChange={setShowNewTeamDialog}
      />
      <SettingsDialog
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
      />
    </div>
  );
}
