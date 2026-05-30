'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import {cn} from '@/lib';

type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive.Root
> & {
  size?: 'sm' | 'default';
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({className, size = 'default', ...props}, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot='switch'
    data-size={size}
    className={cn(
      'group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors outline-none',
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',

      // size
      'data-[size=default]:h-[18.4px] data-[size=default]:w-[32px]',
      'data-[size=sm]:h-[14px] data-[size=sm]:w-[24px]',

      // state
      'data-[state=checked]:bg-primary',
      'data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',

      className
    )}
    {...props}>
    <SwitchPrimitive.Thumb
      data-slot='switch-thumb'
      className={cn(
        'pointer-events-none block rounded-full bg-background transition-transform',

        // size
        'group-data-[size=default]/switch:h-4 group-data-[size=default]/switch:w-4',
        'group-data-[size=sm]/switch:h-3 group-data-[size=sm]/switch:w-3',

        // state
        'group-data-[state=checked]/switch:translate-x-[calc(100%-2px)]',
        'group-data-[state=unchecked]/switch:translate-x-0'
      )}
    />
  </SwitchPrimitive.Root>
));

Switch.displayName = 'Switch';

export {Switch};
