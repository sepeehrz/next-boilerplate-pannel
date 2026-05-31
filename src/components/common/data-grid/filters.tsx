'use client';

import {Search} from 'lucide-react';
import {Table} from '@tanstack/react-table';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/components/ui/input-group';

interface DataGridFiltersProps<TData> {
  table: Table<TData>;
}

export function DataGridFilters<TData>({table}: DataGridFiltersProps<TData>) {
  const filterableColumns = table
    .getAllLeafColumns()
    .filter(column => column.getCanFilter());

  if (filterableColumns.length === 0) return null;

  return (
    <div className='flex items-center gap-4 px-4 min-h-20'>
      {filterableColumns.map(column => (
        <div key={column.id} className='flex flex-col gap-1'>
          <span className='text-xs text-muted-foreground'>
            {String(column.columnDef.header)}
          </span>

          <InputGroup className='rounded-md text-sm font-normal leading-none'>
            <InputGroupInput
              value={(column.getFilterValue() as string) ?? ''}
              onChange={e => column.setFilterValue(e.target.value)}
              placeholder={`Filter ${column.columnDef.header}`}
              className='h-8'
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
      ))}
    </div>
  );
}
