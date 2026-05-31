'use client';

import {useState, ReactNode, createContext} from 'react';
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription
} from '@/components/ui/alert-dialog';

interface ConfirmOptions {
  title: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

export const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function ConfirmDialogProvider({children}: {children: ReactNode}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(
    null
  );

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts);
    setOpen(true);

    return new Promise<boolean>(resolve => {
      setResolver(() => resolve);
    });
  };

  const handleClose = (result: boolean) => {
    setOpen(false);
    resolver?.(result);
    setResolver(null);
  };

  return (
    <ConfirmContext.Provider value={{confirm}}>
      {children}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='rtl:text-right'>
              {options?.title}
            </AlertDialogTitle>
            {options?.description && (
              <AlertDialogDescription>
                {options.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleClose(false)}>
              {options?.cancelText ?? 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleClose(true)}>
              {options?.actionText ?? 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmContext.Provider>
  );
}
