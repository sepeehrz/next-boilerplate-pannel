'use client';

import {DataGridHeader} from './header';
import {useTranslations} from 'next-intl';
import {DataGridFilters} from './filters';
import {DataGridActions} from './actions';
import {DataGridPagination} from './pagination';
import {Checkbox} from '@/components/ui/checkbox';
import {RowSelectionState} from '@tanstack/react-table';
import type {IMoreActions, IFlatActions} from './actions';
import {useMemo, useState, ReactNode, useEffect} from 'react';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader
} from '@/components/ui/table';
import {
  ColumnDef,
  flexRender,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table';

type PaginationMode = 'server' | 'client';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationMode?: PaginationMode;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  withSelect?: boolean;
  onSelectionChange?: (rows: TData[]) => void;
  onPaginationChange?: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;

  title?: string;
  description?: string;
  btnContent?: {
    icon: ReactNode;
    text: string;
    className?: string;
  };
  middleContent?: ReactNode;
  addBtnHandler?: () => void;
  headerActions?: ReactNode;
  withHeader?: boolean;
  withEdit?: boolean;
  withDelete?: boolean;
  moreActions?: IMoreActions<TData>[];
  flatActions?: IFlatActions<TData>[];
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
}

export function DataGrid<TData, TValue>({
  columns,
  data,
  paginationMode = 'server',
  pageCount,
  pageIndex,
  pageSize,
  onPaginationChange,
  title,
  description,
  btnContent,
  middleContent,
  addBtnHandler,
  onSelectionChange,
  withHeader = true,
  headerActions,
  withEdit = true,
  withDelete = true,
  withSelect = false,
  moreActions = [],
  flatActions = [],
  onEdit,
  onDelete
}: DataTableProps<TData, TValue>) {
  const translate = useTranslations('dataGrid');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const isServer = paginationMode === 'server';

  const [clientPagination, setClientPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const selectionColumn: ColumnDef<TData> = {
    id: 'select',
    header: ({table}) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  };

  const finalColumns = useMemo(() => {
    if (!withSelect) return columns;
    return [selectionColumn, ...columns];
  }, [columns, withSelect]);

  const paginationState = isServer
    ? {
        pageIndex: pageIndex ?? 0,
        pageSize: pageSize ?? 10
      }
    : clientPagination;

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: {
      pagination: paginationState,
      sorting,
      columnFilters,
      rowSelection
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    manualPagination: isServer,
    pageCount: isServer ? pageCount : undefined,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: updater => {
      const next =
        typeof updater === 'function' ? updater(paginationState) : updater;

      if (isServer) {
        onPaginationChange?.(next);
      } else {
        setClientPagination(next);
      }
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  useEffect(() => {
    if (!onSelectionChange) return;

    const rows = table.getSelectedRowModel().rows.map(r => r.original);

    onSelectionChange(rows);
  }, [rowSelection]);
  return (
    <>
      {withHeader && (
        <DataGridHeader
          title={title}
          headerActions={headerActions}
          description={description}
          btnContent={btnContent}
          addBtnHandler={addBtnHandler}
        />
      )}

      {middleContent}

      <div className='border border-border rounded-lg  hover:shadow-sm'>
        <div className='py-2'>
          <DataGridFilters table={table} />
        </div>
        <div className='overflow-hidden'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className=' border-border'>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{width: header.column.columnDef.meta?.width}}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={`flex items-center gap-1 text-nowrap ${
                              header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : ''
                            }`}
                            onClick={
                              header.column.getCanSort()
                                ? header.column.getToggleSortingHandler()
                                : undefined
                            }>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <span>
                                {{
                                  asc: '↑',
                                  desc: '↓'
                                }[header.column.getIsSorted() as string] ?? ''}
                              </span>
                            )}
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                  {(Boolean(moreActions?.length) || withDelete || withEdit) && (
                    <TableHead className='flex items-center'>
                      {translate('actions')}
                    </TableHead>
                  )}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    className=' border-border'
                    data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    {(Boolean(moreActions?.length) ||
                      Boolean(flatActions?.length) ||
                      withDelete ||
                      withEdit) && (
                      <TableCell>
                        <DataGridActions
                          rowData={row.original}
                          withDelete={withDelete}
                          withEdit={withEdit}
                          editAction={onEdit}
                          deleteAction={onDelete}
                          moreActions={moreActions}
                          flatActions={flatActions}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={
                      columns.length +
                      (Boolean(moreActions?.length) || withDelete || withEdit
                        ? 1
                        : 0)
                    }
                    className='h-24 text-center'>
                    {translate('noResult')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataGridPagination table={table} />
      </div>
    </>
  );
}
