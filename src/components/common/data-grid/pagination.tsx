'use client';

import {Table} from '@tanstack/react-table';
import {usePaginationRange} from './hooks/use-pagination-range';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {useDirection} from '@/hooks/useDirection';

interface DataGridPaginationProps<TData> {
  table: Table<TData>;
}

export function DataGridPagination<TData>({
  table
}: DataGridPaginationProps<TData>) {
  const {pageIndex, pageSize} = table.getState().pagination;
  const pageCount = table.getPageCount();
  const {dir} = useDirection();
  const pages = usePaginationRange(pageIndex, pageCount);
  const disabledClass = 'pointer-events-none opacity-50';

  return (
    <div className='flex items-center justify-between px-4 min-h-20 w-full'>
      <Select
        dir={dir as 'ltr' | 'rtl'}
        value={String(pageSize)}
        onValueChange={value => {
          table.setPageIndex(0);
          table.setPageSize(Number(value));
        }}>
        <SelectTrigger className='w-25'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          align={dir === 'rtl' ? 'end' : 'start'}
          className='border-border'>
          {[5, 10, 20, 50].map(size => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Pagination dir={dir} className='mx-0 justify-start w-fit'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              aria-disabled={!table.getCanPreviousPage()}
              className={!table.getCanPreviousPage() ? disabledClass : ''}
            />
          </PaginationItem>

          {pages.map((item, index) => (
            <PaginationItem key={`${item}-${index}`}>
              {item === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={item === pageIndex}
                  onClick={() => table.setPageIndex(item)}>
                  {item + 1}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              aria-disabled={!table.getCanNextPage()}
              className={!table.getCanNextPage() ? disabledClass : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
