'use client';

import {LogOut} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useAlertDialog} from '@/hooks/use-alert-dialog';
import {DropdownMenuItem} from '@/components/ui/dropdown-menu';

export function LogoutComponent() {
  const confirm = useAlertDialog();

  const translate = useTranslations('global');

  async function handleLogout() {
    const accepted = await confirm({
      title: translate('exitPanel'),
      actionText: translate('yes'),
      cancelText: translate('no')
    });
    if (accepted) {
    }
  }

  return (
    <DropdownMenuItem
      className='cursor-pointer text-destructive text-sm font-normal leading-none'
      onClick={handleLogout}>
      <LogOut color='var(--destructive)' />
      {translate('signOut')}
    </DropdownMenuItem>
  );
}
