'use client';

import {useTheme} from 'next-themes';
import {Sun, Moon} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';

export function ChangeTheme() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  const translate = useTranslations('global');

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='outline'
          className='border-none bg-inherit '
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? <Moon /> : <Sun />}
          <span className='hidden sm:block'>
            {theme === 'light' ? translate('dark') : translate('light')}
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
