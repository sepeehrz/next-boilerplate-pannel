'use client';

import {Button} from '../ui/button';
import {useTranslations} from 'next-intl';
import {LogoutComponent} from '../logout';
import {ChangeTheme} from '../change-theme';
import {useDirection} from '@/hooks/useDirection';
import {User, Bell, User2} from 'lucide-react';
import {LanguageSwitcher} from '../common/switchLang';
import {SidebarTrigger} from '@/components/ui/sidebar';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {useRouter} from 'next/navigation';

export function AppHeader() {
  const translate = useTranslations('global');
  const {dir} = useDirection();
  const router = useRouter();
  return (
    <div className='flex items-center justify-between p-4 border-b border-border'>
      <div>
        <SidebarTrigger />
      </div>
      <div>
        <LanguageSwitcher />
        <ChangeTheme />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              variant='outline'
              className='border-none bg-inherit '>
              <Bell />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{translate('notifications')}</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenu modal={false} dir={dir as 'rtl' | 'ltr'}>
          <DropdownMenuTrigger asChild>
            <Button
              variant='default'
              aria-label='Open menu'
              size='icon'
              className='size-9 cursor-pointer rounded-full ms-4'>
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-40 border-border' align='end'>
            <DropdownMenuItem
              onClick={() => router.push('/profile')}
              className='cursor-pointer'>
              <User2 />
              {translate('profile')}
            </DropdownMenuItem>

            <LogoutComponent />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
