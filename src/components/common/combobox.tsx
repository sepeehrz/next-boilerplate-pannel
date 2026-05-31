'use client';

import {cn} from '@/lib';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useRef, useState, useEffect} from 'react';
import {Check, ChevronsUpDown} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup
} from '@/components/ui/command';

export interface ComboboxItem {
  value: string;
  label: string;
}

export interface DynamicComboboxProps {
  items?: ComboboxItem[];
  value: string;
  onChange?: (value: string) => void;
}

export function ComboboxComponent({
  items = [],
  value,
  onChange
}: DynamicComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [triggerWidth, setTriggerWidth] = useState<number>(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
    // eslint-disable-next-line react-hooks/refs
  }, [triggerRef.current?.offsetWidth]);

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (val: string) => {
    onChange?.(val);
    setOpen(false);
    setSearch('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'>
          {value ? items.find(i => i.value === value)?.label : 'انتخاب کنید...'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className='p-2 border-border'
        style={{width: triggerWidth}}>
        <Input
          placeholder='جستجو...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='mb-2'
        />
        <Command>
          <CommandList>
            {filteredItems.length === 0 && (
              <CommandEmpty>هیچ موردی یافت نشد.</CommandEmpty>
            )}
            <CommandGroup>
              {filteredItems.map(item => (
                <CommandItem
                  key={item.value}
                  onSelect={() => handleSelect(item.value)}>
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
