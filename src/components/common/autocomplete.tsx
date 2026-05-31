'use client';

import {cn} from '@/lib';
import * as React from 'react';
import {Button} from '@/components/ui/button';
import {Check, ChevronsUpDown} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandInput
} from '@/components/ui/command';

export type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
};

export function AutocompleteComponent({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...'
}: Props) {
  const [open, setOpen] = React.useState(false);

  const selected = options.find(o => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'>
          {selected?.label ?? placeholder}

          <ChevronsUpDown className='ml-2 h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align='start'
        style={{width: 'var(--radix-popover-trigger-width)'}}
        className='p-0 border-border'>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {options.map(option => (
              <CommandItem
                key={option.value}
                value={option.label}
                onSelect={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />

                {option.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
