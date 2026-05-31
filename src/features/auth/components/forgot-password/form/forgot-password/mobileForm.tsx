import type {IMode} from '../..';
import {useForm} from 'react-hook-form';
import {useTranslations} from 'next-intl';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {zodResolver} from '@hookform/resolvers/zod';
import {createForgotPasswordMobileSchema} from '../../../../validations/forgotPasswordShcema';
import type {ForgotPasswordMobileFormValues} from '../../../../validations/forgotPasswordShcema';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';

interface IProps {
  changeMode: (value: IMode) => void;
}
export function MobileFormComponent({changeMode}: IProps) {
  const translate = useTranslations('forgotPassowrd.Form');
  const validationT = useTranslations('loginPage.validations.forgetPassword');
  const form = useForm<ForgotPasswordMobileFormValues>({
    resolver: zodResolver(createForgotPasswordMobileSchema(validationT)),
    defaultValues: {
      mobile: ''
    }
  });

  async function onSubmit(data: ForgotPasswordMobileFormValues) {
    changeMode('reset-password');
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-2'>
          <FormField
            control={form.control}
            name='mobile'
            render={({field}) => (
              <FormItem className='space-y-2 '>
                <FormLabel className='text-left rtl:text-right'>
                  {translate('mobileInputTitle')}
                </FormLabel>
                <FormControl>
                  <Input
                    id='mobile'
                    {...field}
                    placeholder={translate('mobileInputPlaceholder')}
                    autoComplete='off'
                    className='h-10 w-full'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            variant='default'
            className='w-full rounded-md h-10 text-sm font-medium leading-normal'>
            {translate('verifyBtn')}
          </Button>
        </form>
      </Form>
    </>
  );
}
