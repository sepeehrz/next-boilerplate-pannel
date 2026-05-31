'use client';

import {Globe} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';
import {useChangeLanguage} from '@/hooks/use-change-language';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const {locale, changeLanguage} = useChangeLanguage();
  const translate = useTranslations('global');

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='border-none bg-inherit'>
              <Globe className='size-4' />
              <span className='hidden sm:block'>
                {locale === 'en' ? 'English' : 'فارسی'}
              </span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        <TooltipContent>
          <p>{translate('changeLanguage')}</p>
        </TooltipContent>

        <DropdownMenuContent className='w-40 border-border' align='end'>
          <DropdownMenuItem
            onClick={() => changeLanguage('en')}
            disabled={locale === 'en'}
            className='font-latin'>
            English
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => changeLanguage('fa')}
            disabled={locale === 'fa'}
            className='font-sans'>
            فارسی
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Tooltip>
  );
}
