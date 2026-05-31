'use client';

import type {IMode} from '../..';
import {ArrowLeft} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {ResetFormComponent} from './reset-form';
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription
} from '@/components/ui/card';

interface IProps {
  changeMode: (value: IMode) => void;
}
export function ResetComponent({changeMode}: IProps) {
  const translate = useTranslations('resetPassword.Form');
  const router = useRouter();
  return (
    <>
      <Card className='w-full max-w-md bg-background border-primary rounded-lg shadow-lg p-6'>
        <CardHeader className='text-center'>
          <CardTitle className='text-primary text-2xl font-bold '>
            {translate('title')}
          </CardTitle>
          <CardDescription className='text-sm text-muted-foreground'>
            {translate('description')}
          </CardDescription>
        </CardHeader>
        <ResetFormComponent />
        <Button
          type='button'
          className='w-full h-10 border-none flex items-center'
          variant='outline'
          onClick={() => changeMode('forgot-password')}>
          <ArrowLeft className=' mb-1' />
          {translate('backBtn')}
        </Button>
      </Card>
    </>
  );
}
