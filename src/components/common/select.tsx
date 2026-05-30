'use client';

import * as React from 'react';
import {Check, ChevronsUpDown} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {cn} from '@/lib';
import {useDirection} from '@/hooks/useDirection';

import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

interface SelectOption {
  value: string;
  label: string;
  meta?: {
    status?: string | boolean;
  };
}

interface ComboboxComponentProps {
  options: SelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  withSearch?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

export function SelectComponent({
  options,
  placeholder,
  searchPlaceholder,
  withSearch,
  emptyText,
  value,
  onChange,
  multiple = false,
  className,
  disabled = false,
  error = false
}: ComboboxComponentProps) {
  const {dir} = useDirection();
  const translateGlobal = useTranslations('global');

  const [open, setOpen] = React.useState(false);

  const selectedValues = React.useMemo(
    () => (Array.isArray(value) ? value : []),
    [value]
  );

  const selectedLabel = React.useMemo(() => {
    if (!multiple) {
      const selected = options.find(option => option.value === value);
      return selected?.label;
    }

    if (!selectedValues.length) return '';

    return options
      .filter(option => selectedValues.includes(option.value))
      .map(option => option.label)
      .join(', ');
  }, [multiple, options, selectedValues, value]);

  const toggleValue = (val: string) => {
    if (!multiple) {
      onChange?.(val);
      setOpen(false);
      return;
    }

    const exists = selectedValues.includes(val);

    const newValue = exists
      ? selectedValues.filter(v => v !== val)
      : [...selectedValues, val];

    onChange?.(newValue);
  };

  const isSelected = (val: string) => {
    if (multiple) return selectedValues.includes(val);
    return value === val;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          role='combobox'
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'w-full justify-between bg-background font-normal',
            !selectedLabel && 'text-muted-foreground',
            error &&
              'border-destructive ring-destructive focus-visible:ring-destructive',
            className
          )}>
          <span className='truncate'>
            {selectedLabel || placeholder || 'Select an option'}
          </span>
          <ChevronsUpDown
            className={cn(
              'ml-2 h-4 w-4 shrink-0 opacity-50',
              error && 'text-destructive'
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className='w-(--radix-popover-trigger-width) p-0'
        align='start'
        dir={dir as 'ltr' | 'rtl'}>
        <Command>
          {withSearch && (
            <CommandInput
              placeholder={
                searchPlaceholder || placeholder || translateGlobal('search')
              }
            />
          )}

          <CommandList>
            <CommandEmpty>
              {emptyText || translateGlobal('NotFoundItems')}
            </CommandEmpty>

            <CommandGroup>
              {options.map(option => {
                const selected = isSelected(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    value={`${option.label} ${option.value}`}
                    onSelect={() => toggleValue(option.value)}
                    className='flex items-center justify-between gap-2'>
                    <div className='flex min-w-0 items-center gap-2'>
                      <Check
                        className={cn(
                          'h-4 w-4 shrink-0',
                          selected ? 'opacity-100' : 'opacity-0'
                        )}
                      />

                      <span className='truncate'>{option.label}</span>
                    </div>

                    {option.meta?.status !== undefined && (
                      <Badge
                        variant={option.meta?.status ? 'default' : 'secondary'}>
                        {translateGlobal(
                          option.meta?.status ? 'online' : 'offline'
                        )}
                      </Badge>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
