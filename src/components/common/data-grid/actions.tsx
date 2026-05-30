import {ReactNode} from 'react';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';
import {useDirection} from '@/hooks/useDirection';
import {Edit, Trash2, EllipsisVertical} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';

export interface IMoreActions<T> {
  title: string;
  icon?: ReactNode;
  cb: (value: T) => void;
}
export interface IFlatActions<T> {
  title: string;
  icon: ReactNode;
  cb: (value: T) => void;
}

interface IProps<T> {
  withEdit?: boolean;
  withDelete?: boolean;
  moreActions?: IMoreActions<T>[];
  flatActions?: IFlatActions<T>[];
  rowData: T;
  editAction?: (value: T) => void;
  deleteAction?: (value: T) => void;
}
export function DataGridActions<T>({
  withEdit = true,
  withDelete = true,
  flatActions = [],
  editAction,
  deleteAction,
  rowData,
  moreActions = []
}: IProps<T>) {
  const translate = useTranslations('dataGrid');
  const {dir} = useDirection();
  function handleEditAction() {
    if (editAction) editAction(rowData);
  }
  function handleDeleteAction() {
    if (deleteAction) deleteAction(rowData);
  }
  return (
    <div className='flex items-center space-x-1'>
      {withEdit && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              variant='outline'
              className='border-none bg-inherit size-9 cursor-pointer'
              onClick={handleEditAction}>
              <Edit />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{translate('edit')}</p>
          </TooltipContent>
        </Tooltip>
      )}
      {Boolean(flatActions?.length) &&
        flatActions?.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                size='icon'
                variant='outline'
                className='border-none bg-inherit size-9 cursor-pointer'
                onClick={() => item.cb(rowData)}>
                {item.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      {withDelete && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              variant='outline'
              className='border-none bg-inherit size-9 cursor-pointer'
              onClick={handleDeleteAction}>
              <Trash2 color='var(--destructive)' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{translate('delete')}</p>
          </TooltipContent>
        </Tooltip>
      )}
      {Boolean(moreActions?.length) && (
        <DropdownMenu modal={false} dir={dir as any}>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              aria-label='Open menu'
              size='icon'
              className='border-none bg-inherit size-9 cursor-pointer'>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-40 border-border' align='end'>
            {moreActions?.map((item, index) => (
              <DropdownMenuItem
                className='cursor-pointer text-sm'
                key={index}
                onClick={() => item.cb(rowData)}>
                <span>{item.icon}</span>
                {item.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
