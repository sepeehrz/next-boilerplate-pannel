'use client';

import dynamic from 'next/dynamic';
import {useTheme} from 'next-themes';
import {Sun, Moon} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';

export const ChangeTheme = dynamic(() => Promise.resolve(ChangeThemeInner), {
  ssr: false
});

function ChangeThemeInner() {
  const {resolvedTheme, setTheme} = useTheme();
  const translate = useTranslations('global');

  const isLight = resolvedTheme === 'light';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='outline'
          className='border-none bg-inherit'
          onClick={() => setTheme(isLight ? 'dark' : 'light')}>
          {isLight ? <Moon /> : <Sun />}

          <span className='hidden sm:block'>
            {isLight ? translate('dark') : translate('light')}
          </span>

          <span className='sr-only'>Toggle theme</span>
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <p>{translate('changeTheme')}</p>
      </TooltipContent>
    </Tooltip>
  );
}
