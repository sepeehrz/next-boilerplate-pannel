'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useTranslations} from 'next-intl';
import {ArrowLeft, Mail, Smartphone} from 'lucide-react';
import {MailFormComponent} from './mailForm';
import {MobileFormComponent} from './mobileForm';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import type {IMode} from '../..';

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
