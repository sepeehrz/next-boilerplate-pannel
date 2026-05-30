'use client';

import {ArrowLeft} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';

export function BackBtnComponent() {
  const router = useRouter();
  const translate = useTranslations('global');

  return (
    <Button
      variant='outline'
      className='border-none bg-inherit flex items-center gap-2 text-sm font-medium cursor-pointer'
      onClick={() => router.back()}>
      <ArrowLeft className='rtl:rotate-180' />
      <span>{translate('back')}</span>
    </Button>
  );
}
