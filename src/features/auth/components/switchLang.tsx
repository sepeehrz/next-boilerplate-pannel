'use client';

import {useChangeLanguage} from '@/hooks/use-change-language';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import {useDirection} from '@/hooks/useDirection';

export function LanguageSwitcher() {
  const {locale, changeLanguage} = useChangeLanguage();
  const {dir} = useDirection();
  return (
    <DropdownMenu dir={dir as any}>
      <DropdownMenuTrigger asChild>
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
