'use client';

import type {IMode} from '../..';
import {useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';
import {MailFormComponent} from './mailForm';
import {Button} from '@/components/ui/button';
import {MobileFormComponent} from './mobileForm';
import {Mail, ArrowLeft, Smartphone} from 'lucide-react';
import {Tabs, TabsList, TabsContent, TabsTrigger} from '@/components/ui/tabs';
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription
} from '@/components/ui/card';

interface IProps {
  changeMode: (value: IMode) => void;
}
export function ForgotFormComponent({changeMode}: IProps) {
  const translate = useTranslations('forgotPassowrd.Form');
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
        <Tabs defaultValue='email'>
          <TabsList className='w-full h-10 rounded-sm'>
            <TabsTrigger value='email' className='rounded-sm'>
              <Mail />
              {translate('tabEmail')}
            </TabsTrigger>
            <TabsTrigger value='mobile' className='rounded-sm'>
              <Smartphone />
              {translate('tabMobile')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value='email'>
            <MailFormComponent changeMode={e => changeMode(e)} />
          </TabsContent>

          <TabsContent value='mobile'>
            <MobileFormComponent changeMode={e => changeMode(e)} />
          </TabsContent>
        </Tabs>
        <Button
          type='button'
          className='w-full h-10 border-none flex items-center'
          variant='outline'
          onClick={() => router.push('/login')}>
          <ArrowLeft className=' mb-1' />
          {translate('backBtn')}
        </Button>
      </Card>
    </>
  );
}
