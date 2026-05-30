'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ComponentType
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';

type DialogComponentProps = {
  closeDialog: () => void;
};

type DialogContextType = {
  openDialog: <P extends object>(
    component: ComponentType<P & DialogComponentProps>,
    props?: P
  ) => void;
  closeDialog: () => void;
};

export const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({children}: {children: ReactNode}) {
  const [open, setOpen] = useState(false);
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);
  const [props, setProps] = useState<Record<string, any>>({});

  const openDialog = <P extends object>(
    component: ComponentType<P & DialogComponentProps>,
    componentProps?: P
  ) => {
    setComponent(() => component);
    setProps(componentProps ?? {});
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value) {
      setTimeout(() => {
        setComponent(null);
        setProps({});
      }, 200);
    }
  };

  return (
    <DialogContext.Provider value={{openDialog, closeDialog}}>
      {children}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className='border-border'>
          <VisuallyHidden>
            <DialogTitle>Dialog</DialogTitle>
            <DialogDescription>description</DialogDescription>
          </VisuallyHidden>

          {Component && <Component {...props} closeDialog={closeDialog} />}
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
}
