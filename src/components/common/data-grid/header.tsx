import {cn} from '@/lib';
import {ReactNode} from 'react';
import {Button} from '@/components/ui/button';

interface IProps {
  title?: string;
  description?: string;
  btnContent?: {
    icon: ReactNode;
    text: string;
    className?: string;
  };
  headerActions?: ReactNode;
  addBtnHandler?: () => void;
}
export function DataGridHeader({
  title,
  description,
  btnContent,
  headerActions,
  addBtnHandler
}: IProps) {
  function handleBtn() {
    if (addBtnHandler) addBtnHandler();
  }
  return (
    <div
      className={cn(
        'flex mb-6',
        headerActions
          ? 'flex-col h-20 sm:flex-row sm:items-center sm:justify-between'
          : 'items-center justify-between'
      )}>
      {!title && !description ? null : (
        <div>
          {title && (
            <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-foreground'>
              {title}
            </h1>
          )}
          {description && (
            <p className='text-sm sm:text-base text-muted-foreground mt-1'>
              {description}
            </p>
          )}
        </div>
      )}
      {headerActions || btnContent ? (
        <div
          className={cn(
            'flex',
            headerActions
              ? 'items-center justify-end my-4 sm:my-0'
              : 'items-center'
          )}>
          {headerActions && headerActions}
          {btnContent && addBtnHandler && (
            <Button
              type='button'
              variant='default'
              className={cn(
                'cursor-pointer text-sm font-medium rounded-md! hover:shadow-md',
                btnContent.className
              )}
              onClick={handleBtn}>
              <span>{btnContent?.icon}</span>

              <span className={cn(headerActions ? 'hidden lg:block' : '')}>
                {btnContent?.text}
              </span>
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
