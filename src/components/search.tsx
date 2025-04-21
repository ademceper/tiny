'use client';

import * as React from 'react';
import {
  ArrowUpRightIcon,
  CircleFadingPlusIcon,
  FileInputIcon,
  FolderPlusIcon,
  SearchIcon
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command';
import { useRouter } from 'next/navigation';
import data from '@/constants/menu';

export default function Search() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const isMac =
    typeof window !== 'undefined' && window.navigator.platform.includes('Mac');
  const keySymbol = isMac ? '⌘' : 'Ctrl';

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key.toLowerCase() === 'k' && !open) {
          e.preventDefault();
          setOpen((open) => !open);
          return;
        }

        const matchedItem = data.navMain.find(
          (item) =>
            item.shortcut && item.shortcut.toLowerCase() === e.key.toLowerCase()
        );
        if (matchedItem) {
          e.preventDefault();
          handleNavigation(matchedItem.url);
        }
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  });

  const handleNavigation = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      <button
        className='border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]'
        onClick={() => setOpen(true)}
      >
        <span className='flex grow items-center'>
          <SearchIcon
            className='text-muted-foreground/80 -ms-1 me-3'
            size={16}
            aria-hidden='true'
          />
          <span className='text-muted-foreground/70 font-normal'>Search</span>
        </span>
        <kbd className='bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium'>
          <kbd>{keySymbol} K</kbd>
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Quick start'>
            <CommandItem onSelect={() => handleNavigation('/new-folder')}>
              <FolderPlusIcon
                size={16}
                className='opacity-60'
                aria-hidden='true'
              />
              <span>New folder</span>
              <CommandShortcut className='justify-center'>{keySymbol} N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => handleNavigation('/import-document')}>
              <FileInputIcon
                size={16}
                className='opacity-60'
                aria-hidden='true'
              />
              <span>Import document</span>
              <CommandShortcut className='justify-center'>{keySymbol} N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => handleNavigation('/add-block')}>
              <CircleFadingPlusIcon
                size={16}
                className='opacity-60'
                aria-hidden='true'
              />
              <span>Add block</span>
              <CommandShortcut className='justify-center'>{keySymbol} B</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Navigation'>
            {data.navMain.map((item) => (
              <CommandItem
                key={item.title}
                onSelect={() => handleNavigation(item.url)}
              >
                <ArrowUpRightIcon
                  size={16}
                  className='opacity-60'
                  aria-hidden='true'
                />
                <span>{`Go to ${item.title.toLowerCase()}`}</span>
                <CommandShortcut className='justift-center'>
                  {keySymbol} {item.shortcut}
                </CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
