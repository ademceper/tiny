'use client';

import * as React from 'react';
import {
  Building,
  LogOut,
  Users,
  AlertTriangle,
  Mail,
  Globe,
  ShieldCheck,
  Lock,
  Calendar,
  Scroll
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { DottedSeperator } from '../ui/dotted-separator';
import { ScrollArea } from '../ui/scroll-area';
import OrgFileUploader from './organization-file-uploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useEffect, useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarComp } from '@/components/ui/calendar';
import { format } from 'date-fns';
import MultipleSelector, { Option } from '../ui/multiselect';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title: string;
  description?: string;
}

const MAX_HEIGHT = 100;

export function ResponsiveDialog({
  open,
  onOpenChange,
  children,
  title,
  description,
}: DialogProps) {
  const isMobile = useIsMobile();
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!open) return;

    const calculateHeight = () => {
      if (!contentRef.current) return;
      const contentHeight = contentRef.current.scrollHeight;
      const viewportMaxHeight = window.innerHeight * 0.9 - 152;
      setMaxHeight(contentHeight > viewportMaxHeight ? `${viewportMaxHeight}px` : undefined);
    };

    calculateHeight();

    const resizeObserver = new ResizeObserver(calculateHeight);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [open, children]);

  const renderContent = () => (
    <>
      <DottedSeperator />
      <ScrollArea 
        className={`overflow-y-auto ${maxHeight ? 'overscroll-contain' : ''}`}
        style={{ maxHeight }}
      >
        <div className="px-4 pb-4" ref={contentRef}>
          {children}
        </div>
      </ScrollArea>
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="pt-5 text-left">
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          {renderContent()}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}

export function InviteDialog({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [inviteTab, setInviteTab] = useState('email');
  const teams: Option[] = [
    { label: 'Frontend Team', value: '12' },
    { label: 'Backend Team', value: '8' },
    { label: 'Design Team', value: '5' },
    { label: 'Marketing Team', value: '7' },
    { label: 'Product Team', value: '6' }
  ];

  const projects: Option[] = [
    { label: 'Frontend Projets', value: '12' },
    { label: 'Backend Projets', value: '8' },
    { label: 'Design Projets', value: '5' },
    { label: 'Marketing Projets', value: '7' },
    { label: 'Product Projets', value: '6' }
  ];

  const [inviteData, setInviteData] = useState({
    emails: '',
    role: 'MEMBER',
    expiration: '7',
    teams: [] as number[],
    projects: [] as number[],
    message: '',
    linkExpiration: new Date()
  });

  const [date, setDate] = useState<Date>();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Invite to Acme Inc'
      description='Choose how you want to invite people to your organization'
    >
      <Tabs value={inviteTab} onValueChange={setInviteTab} className='mt-4'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='email'>
            <Mail className='mr-2 h-4 w-4' />
            Email Invites
          </TabsTrigger>
          <TabsTrigger value='link'>
            <Globe className='mr-2 h-4 w-4' />
            Invite Link
          </TabsTrigger>
        </TabsList>

        <TabsContent value='email' className='space-y-4'>
          <div className='grid gap-2 py-4'>
            <Label htmlFor='emails'>Email Addresses</Label>

            <Textarea
              id='emails'
              placeholder='john@example.com, jane@example.com'
              className='max-h-15 min-h-12'
              value={inviteData.emails}
              rows={3}
              onChange={(e) =>
                setInviteData({
                  ...inviteData,
                  emails: e.target.value
                })
              }
            />
            <p className='text-muted-foreground text-xs'>
              Separate multiple emails with commas or spaces
            </p>

            <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
              <div className='grid flex-1 gap-2'>
                <Label>Role</Label>
                <Select
                  value={inviteData.role}
                  onValueChange={(value) =>
                    setInviteData({ ...inviteData, role: value })
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='MEMBER'>
                      <div className='flex items-center gap-2'>
                        <Users className='h-4 w-4' />
                        Member
                      </div>
                    </SelectItem>
                    <SelectItem value='MANAGER'>
                      <div className='flex items-center gap-2'>
                        <ShieldCheck className='h-4 w-4' />
                        Manager
                      </div>
                    </SelectItem>
                    <SelectItem value='ADMIN'>
                      <div className='flex items-center gap-2'>
                        <Lock className='h-4 w-4' />
                        Admin
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator
                orientation='vertical'
                className='mx-4 hidden h-auto sm:block'
              />
              <div className='grid flex-1 gap-2'>
                <Label>Expires After</Label>
                <Select
                  value={inviteData.expiration}
                  onValueChange={(value) =>
                    setInviteData({ ...inviteData, expiration: value })
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select duration' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>24 hours</SelectItem>
                    <SelectItem value='7'>7 days</SelectItem>
                    <SelectItem value='30'>30 days</SelectItem>
                    <SelectItem value='never'>Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='space-y-2'>
              <div className='*:not-first:mt-2'>
                <Label>Add to Teams</Label>
                <MultipleSelector
                  commandProps={{
                    label: 'Select teams'
                  }}
                  value={teams.slice(0, 1)}
                  defaultOptions={teams}
                  placeholder='Select teams'
                  hideClearAllButton
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className='text-center text-sm'>No results found</p>
                  }
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div className='*:not-first:mt-2'>
                <Label>Add to Projects</Label>
                <MultipleSelector
                  commandProps={{
                    label: 'Select projects'
                  }}
                  value={projects.slice(0, 1)}
                  defaultOptions={projects}
                  placeholder='Select projects'
                  hideClearAllButton
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className='text-center text-sm'>No results found</p>
                  }
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='message'>Personal Message (Optional)</Label>
              <Textarea
                id='message'
                placeholder="We'd love to have you on our team!"
                className='max-h-16 min-h-12'
                value={inviteData.message}
                onChange={(e) =>
                  setInviteData({
                    ...inviteData,
                    message: e.target.value
                  })
                }
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value='link' className='space-y-4'>
          <div className='grid gap-2 py-4'>
            <Label>Invite Link</Label>

            <div className='flex gap-2'>
              <Input
                value={`${process.env.APP_URL}/join/xyz123`}
                readOnly
                className='font-mono text-sm'
              />
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  copyToClipboard(`${process.env.APP_URL}/join/xyz123`)
                }
              >
                Copy
              </Button>
            </div>
            <p className='text-muted-foreground text-xs'>
              Share this link with anyone you want to invite
            </p>

            <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
              <div className='grid flex-1 gap-2'>
                <Label>Role</Label>
                <Select
                  value={inviteData.role}
                  onValueChange={(value) =>
                    setInviteData({ ...inviteData, role: value })
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='MEMBER'>
                      <div className='flex items-center gap-2'>
                        <Users className='h-4 w-4' />
                        Member
                      </div>
                    </SelectItem>
                    <SelectItem value='MANAGER'>
                      <div className='flex items-center gap-2'>
                        <ShieldCheck className='h-4 w-4' />
                        Manager
                      </div>
                    </SelectItem>
                    <SelectItem value='ADMIN'>
                      <div className='flex items-center gap-2'>
                        <Lock className='h-4 w-4' />
                        Admin
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator
                orientation='vertical'
                className='mx-4 hidden h-auto sm:block'
              />
              <div className='grid flex-1 gap-2'>
                <Label>Maximum Uses</Label>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='No limit' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='10'>10 uses</SelectItem>
                    <SelectItem value='25'>25 uses</SelectItem>
                    <SelectItem value='50'>50 uses</SelectItem>
                    <SelectItem value='100'>100 uses</SelectItem>
                    <SelectItem value='none'>No limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='space-y-2'>
              <div className='*:not-first:mt-2'>
                <Label>Add to Teams</Label>
                <MultipleSelector
                  commandProps={{
                    label: 'Select teams'
                  }}
                  value={teams.slice(0, 1)}
                  defaultOptions={teams}
                  placeholder='Select teams'
                  hideClearAllButton
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className='text-center text-sm'>No results found</p>
                  }
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div className='*:not-first:mt-2'>
                <Label>Add to Projects</Label>
                <MultipleSelector
                  commandProps={{
                    label: 'Select projects'
                  }}
                  value={projects.slice(0, 1)}
                  defaultOptions={projects}
                  placeholder='Select projects'
                  hideClearAllButton
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className='text-center text-sm'>No results found</p>
                  }
                />
              </div>
            </div>

            <Label>Expiration Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full justify-start text-left font-normal'
                >
                  <Calendar className='mr-2 h-4 w-4' />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <CalendarComp
                  mode='single'
                  selected={inviteData.linkExpiration}
                  onSelect={(date) =>
                    date &&
                    setInviteData({
                      ...inviteData,
                      linkExpiration: date
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </TabsContent>
      </Tabs>

      <DottedSeperator className='mb-3' />

      <div className='flex items-center justify-between'>
        <Button variant='outline' onClick={() => onOpenChange(false)}>
          Cancel
        </Button>

        <Button
          onClick={() => {
            {
              inviteTab === 'email'
                ? toast.success('Invitation sent successfully')
                : toast.success('Link created successfully');

              onOpenChange(false);
            }
          }}
        >
          {inviteTab === 'email' ? (
            <>
              <Mail className='mr-2 h-4 w-4' />
              Send Invites
            </>
          ) : (
            <>
              <Globe className='mr-2 h-4 w-4' />
              Create Link
            </>
          )}
        </Button>
      </div>
    </ResponsiveDialog>
  );
}

// Edit Organization Dialog
export function EditOrganizationDialog({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [formData, setFormData] = React.useState({
    name: 'Acme Inc',
    description:
      'Enterprise software solutions for modern businesses. Founded in 2015.',
    website: 'https://acme-inc.com',
    industry: 'technology'
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Edit Organization'
      description="Update your organization's information"
    >
      <div className='grid gap-4 py-4'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='logo'>Logo</Label>
            <OrgFileUploader />
          </div>
          <Separator
            orientation='vertical'
            className='mx-4 hidden h-auto sm:block'
          />
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='industry'>Industry</Label>
            <Select
              value={formData.industry}
              onValueChange={(value) => handleSelectChange('industry', value)}
            >
              <SelectTrigger id='industry' className='w-full'>
                <SelectValue placeholder='Select industry' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='technology'>Technology</SelectItem>
                <SelectItem value='healthcare'>Healthcare</SelectItem>
                <SelectItem value='finance'>Finance</SelectItem>
                <SelectItem value='education'>Education</SelectItem>
                <SelectItem value='other'>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid gap-2'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className='grid gap-2'>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            className='max-h-25 min-h-15'
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className='grid gap-2'>
          <Label htmlFor='website'>Website</Label>
          <Input
            id='website'
            name='website'
            value={formData.website}
            onChange={handleChange}
          />
        </div>
      </div>

      <DottedSeperator className='mb-3' />

      <div className='flex items-center justify-between'>
        <Button variant='outline' onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            toast.success('Changes saved successfully');
            onOpenChange(false);
          }}
        >
          Save Changes
        </Button>
      </div>
    </ResponsiveDialog>
  );
}

export function SecurityDialog({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [securitySettings, setSecuritySettings] = React.useState({
    twoFactor: true,
    ssoEnabled: false,
    passwordPolicy: 'strong',
    sessionTimeout: '30'
  });

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Security Settings'
      description='Configure organization security settings'
    >
      <div className='grid gap-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label htmlFor='twoFactor'>Two-Factor Authentication</Label>
            <p className='text-muted-foreground text-sm'>
              Require 2FA for all members
            </p>
          </div>
          <Switch
            id='twoFactor'
            checked={securitySettings.twoFactor}
            onCheckedChange={(checked) =>
              handleSwitchChange('twoFactor', checked)
            }
          />
        </div>
        <Separator />
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
          <div className='grid min-w-0 basis-1/2 gap-2'>
            <Label htmlFor='passwordPolicy'>Password Policy</Label>
            <Select
              value={securitySettings.passwordPolicy}
              onValueChange={(value) =>
                handleSelectChange('passwordPolicy', value)
              }
            >
              <SelectTrigger
                id='passwordPolicy'
                className='w-full **:data-desc:hidden'
              >
                <SelectValue placeholder='Select policy' />
              </SelectTrigger>
              <SelectContent className='[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2'>
                <SelectItem value='basic'>
                  Basic
                  <span
                    className='text-muted-foreground mt-1 block text-xs'
                    data-desc
                  >
                    (8+ characters)
                  </span>
                </SelectItem>
                <SelectItem value='medium'>
                  Medium
                  <span
                    className='text-muted-foreground mt-1 block text-xs'
                    data-desc
                  >
                    (8+ chars, mixed case)
                  </span>
                </SelectItem>
                <SelectItem value='strong'>
                  Strong
                  <span
                    className='text-muted-foreground mt-1 block text-xs'
                    data-desc
                  >
                    (8+ chars, mixed case, numbers, symbols)
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator
            orientation='vertical'
            className='mx-4 hidden h-auto sm:block'
          />

          <div className='grid min-w-0 basis-1/2 gap-2'>
            <Label htmlFor='sessionTimeout'>Session Timeout (minutes)</Label>
            <Select
              value={securitySettings.sessionTimeout}
              onValueChange={(value) =>
                handleSelectChange('sessionTimeout', value)
              }
            >
              <SelectTrigger id='sessionTimeout' className='w-full'>
                <SelectValue placeholder='Select timeout' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='15'>15 minutes</SelectItem>
                <SelectItem value='30'>30 minutes</SelectItem>
                <SelectItem value='60'>60 minutes</SelectItem>
                <SelectItem value='120'>2 hours</SelectItem>
                <SelectItem value='never'>Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <DottedSeperator className='mb-3' />
      <div className='flex items-center justify-between'>
        <Button variant='outline' onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            toast.success('Changes saved successfully');
            onOpenChange(false);
          }}
        >
          Save Changes
        </Button>
      </div>
    </ResponsiveDialog>
  );
}

// Visibility Dialog
export function VisibilityDialog({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [visibilitySettings, setVisibilitySettings] = React.useState({
    visibility: 'public',
    discoverability: true,
    memberListVisibility: 'all'
  });

  const handleRadioChange = (value: string) => {
    setVisibilitySettings((prev) => ({ ...prev, visibility: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setVisibilitySettings((prev) => ({ ...prev, discoverability: checked }));
  };

  const handleSelectChange = (value: string) => {
    setVisibilitySettings((prev) => ({ ...prev, memberListVisibility: value }));
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Visibility Settings'
      description='Control who can see your organization'
    >
      <div className='grid gap-4 py-4'>
        <div className='grid gap-2'>
          <Label>Organization Visibility</Label>
          <RadioGroup
            value={visibilitySettings.visibility}
            onValueChange={handleRadioChange}
          >
            <div className='flex items-start space-x-2 rounded-md border p-3'>
              <RadioGroupItem value='public' id='public' className='mt-1' />
              <div className='space-y-1'>
                <Label htmlFor='public' className='font-medium'>
                  Public
                </Label>
                <p className='text-muted-foreground text-sm'>
                  Anyone can find and view your organization
                </p>
              </div>
            </div>
            <div className='flex items-start space-x-2 rounded-md border p-3'>
              <RadioGroupItem value='private' id='private' className='mt-1' />
              <div className='space-y-1'>
                <Label htmlFor='private' className='font-medium'>
                  Private
                </Label>
                <p className='text-muted-foreground text-sm'>
                  Only members can view organization details
                </p>
              </div>
            </div>
            <div className='flex items-start space-x-2 rounded-md border p-3'>
              <RadioGroupItem value='unlisted' id='unlisted' className='mt-1' />
              <div className='space-y-1'>
                <Label htmlFor='unlisted' className='font-medium'>
                  Unlisted
                </Label>
                <p className='text-muted-foreground text-sm'>
                  Anyone with the link can view your organization
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
        <Separator />
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label htmlFor='discoverability'>Discoverability</Label>
            <p className='text-muted-foreground text-sm'>
              Allow organization to appear in search results
            </p>
          </div>
          <Switch
            id='discoverability'
            checked={visibilitySettings.discoverability}
            onCheckedChange={handleSwitchChange}
          />
        </div>
        <Separator />
        <div className='grid gap-2'>
          <Label htmlFor='memberListVisibility'>Member List Visibility</Label>
          <Select
            value={visibilitySettings.memberListVisibility}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className='w-full' id='memberListVisibility'>
              <SelectValue placeholder='Select visibility' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>
                All members visible to everyone
              </SelectItem>
              <SelectItem value='members'>
                Only visible to other members
              </SelectItem>
              <SelectItem value='admins'>Only visible to admins</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DottedSeperator className='mb-3' />
      <div className='flex items-center justify-between'>
        <Button variant='outline' onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            toast.success('Changes saved successfully');
            onOpenChange(false);
          }}
        >
          Save Changes
        </Button>
      </div>
    </ResponsiveDialog>
  );
}

// Leave Organization Dialog
export function LeaveOrganizationDialog({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [confirmText, setConfirmText] = React.useState('');

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Leave Organization'
      description='Are you sure you want to leave this organization?'
    >
      <div className='grid gap-4 py-4'>
        <div className='rounded-md bg-amber-50 p-4 text-amber-800'>
          <div className='flex items-start gap-3'>
            <AlertTriangle className='h-5 w-5 text-amber-600' />
            <div>
              <h3 className='font-medium'>Warning</h3>
              <p className='text-sm'>
                Leaving this organization will remove your access to all
                projects, resources, and settings. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='confirm'>
            Type <span className='font-semibold'>leave organization</span> to
            confirm
          </Label>
          <Input
            id='confirm'
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder='leave organization'
          />
        </div>
      </div>
      <DottedSeperator className='mb-3' />
      <div className='flex items-center justify-between'>
        <Button variant='outline' onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          variant='destructive'
          disabled={confirmText !== 'leave organization'}
          onClick={() => {
            toast.success('You have left the organization');
            onOpenChange(false);
          }}
        >
          <LogOut className='mr-2 h-4 w-4' />
          Leave Organization
        </Button>
      </div>
    </ResponsiveDialog>
  );
}

// New Team Dialog
export function NewTeamDialog({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [teamData, setTeamData] = React.useState({
    name: '',
    description: '',
    visibility: 'private'
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTeamData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setTeamData((prev) => ({ ...prev, visibility: value }));
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Create New Team'
      description='Create a new team to organize members'
    >
      <div className='grid gap-4 py-4'>
        <div className='grid gap-2'>
          <Label htmlFor='teamName'>Team Name</Label>
          <Input
            id='teamName'
            name='name'
            value={teamData.name}
            onChange={handleChange}
            placeholder='e.g. Engineering Team'
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='teamDescription'>Description (Optional)</Label>
          <Textarea
            className='max-h-25 min-h-15'
            id='teamDescription'
            name='description'
            value={teamData.description}
            onChange={handleChange}
            placeholder='What does this team do?'
            rows={3}
          />
        </div>
        <div className='grid gap-2'>
          <Label>Team Visibility</Label>
          <RadioGroup
            value={teamData.visibility}
            onValueChange={handleRadioChange}
          >
            <div className='flex items-start space-x-2 rounded-md border p-3'>
              <RadioGroupItem value='public' id='teamPublic' className='mt-1' />
              <div className='space-y-1'>
                <Label htmlFor='teamPublic' className='font-medium'>
                  Public
                </Label>
                <p className='text-muted-foreground text-sm'>
                  Visible to all organization members
                </p>
              </div>
            </div>
            <div className='flex items-start space-x-2 rounded-md border p-3'>
              <RadioGroupItem
                value='private'
                id='teamPrivate'
                className='mt-1'
              />
              <div className='space-y-1'>
                <Label htmlFor='teamPrivate' className='font-medium'>
                  Private
                </Label>
                <p className='text-muted-foreground text-sm'>
                  Only visible to team members
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
      <DottedSeperator className='mb-3' />
      <div className='flex items-center justify-between'>
        <Button variant='outline' onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          disabled={!teamData.name.trim()}
          onClick={() => {
            toast.success(`Team "${teamData.name}" created successfully`);
            onOpenChange(false);
          }}
        >
          <Building className='mr-2 h-4 w-4' />
          Create Team
        </Button>
      </div>
    </ResponsiveDialog>
  );
}

// Settings Dialog
export function SettingsDialog({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [activeTab, setActiveTab] = React.useState('members');

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Organization Settings'
      description='Manage your organization settings'
    >
      <div className='grid gap-4 py-4'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
          <div className='flex flex-row space-x-2 overflow-x-auto sm:flex-col sm:space-y-1 sm:space-x-0'>
            <Button
              variant={activeTab === 'members' ? 'default' : 'ghost'}
              className='justify-start'
              onClick={() => setActiveTab('members')}
            >
              <Users className='mr-2 h-4 w-4' />
              Members
            </Button>
            <Button
              variant={activeTab === 'teams' ? 'default' : 'ghost'}
              className='justify-start'
              onClick={() => setActiveTab('teams')}
            >
              <Building className='mr-2 h-4 w-4' />
              Teams
            </Button>
          </div>
          <div className='flex-1'>
            {activeTab === 'members' && (
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>Member Settings</h3>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label htmlFor='allowInvites'>Allow Member Invites</Label>
                    <p className='text-muted-foreground text-sm'>
                      Let members invite others
                    </p>
                  </div>
                  <Switch id='allowInvites' defaultChecked />
                </div>
                <Separator />
                <div className='grid gap-2'>
                  <Label htmlFor='defaultRole'>Default Member Role</Label>
                  <Select defaultValue='member'>
                    <SelectTrigger id='defaultRole' className='w-full'>
                      <SelectValue placeholder='Select role' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='member'>Member</SelectItem>
                      <SelectItem value='contributor'>Contributor</SelectItem>
                      <SelectItem value='admin'>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {activeTab === 'teams' && (
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>Team Settings</h3>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label htmlFor='allowTeamCreation'>
                      Allow Team Creation
                    </Label>
                    <p className='text-muted-foreground text-sm'>
                      Let members create teams
                    </p>
                  </div>
                  <Switch id='allowTeamCreation' defaultChecked />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label htmlFor='teamDiscoverability'>
                      Team Discoverability
                    </Label>
                    <p className='text-muted-foreground text-sm'>
                      Let members discover teams
                    </p>
                  </div>
                  <Switch id='teamDiscoverability' defaultChecked />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ResponsiveDialog>
  );
}

// Export all dialogs as a single component
export function OrganizationDialogs() {
  return <></>;
}
