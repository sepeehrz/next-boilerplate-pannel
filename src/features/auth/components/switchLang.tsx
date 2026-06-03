'use client';

import {Button} from '@/components/ui/button';
import {useDirection} from '@/hooks/useDirection';
import {useChangeLanguage} from '@/hooks/use-change-language';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const {locale, changeLanguage} = useChangeLanguage();
  const {dir} = useDirection();
  return (
    <DropdownMenu dir={dir as 'rtl' | 'ltr'}>
      <DropdownMenuTrigger asChild className='bg-background text-foreground'>
        <Button variant='outline'>
          {locale === 'en' ? 'English' : 'فارسی'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='border-border'>
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
  );
}
