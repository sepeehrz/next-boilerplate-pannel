import type {IMode} from '../..';
import {useForm} from 'react-hook-form';
import {useTranslations} from 'next-intl';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useLogin} from '../../../../hooks/useLogin';
import {zodResolver} from '@hookform/resolvers/zod';
import {createForgotPasswordMailSchema} from '../../../../validations/forgotPasswordShcema';
import type {ForgotPasswordMailFormValues} from '../../../../validations/forgotPasswordShcema';
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

export function MailFormComponent({changeMode}: IProps) {
  const translate = useTranslations('forgotPassowrd.Form');
  const validationT = useTranslations('loginPage.validations.forgetPassword');
  const {mutate: login, isPending} = useLogin();

  const form = useForm<ForgotPasswordMailFormValues>({
    resolver: zodResolver(createForgotPasswordMailSchema(validationT)),
    defaultValues: {
      mail: ''
    }
  });

  async function onSubmit(data: ForgotPasswordMailFormValues) {
    changeMode('reset-password');
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-2'>
          <FormField
            control={form.control}
            name='mail'
            render={({field}) => (
              <FormItem className='space-y-2 '>
                <FormLabel className='text-left rtl:text-right'>
                  {translate('emailInputTitle')}
                </FormLabel>
                <FormControl>
                  <Input
                    id='mail'
                    {...field}
                    placeholder={translate('emailInputPlaceholder')}
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
            className='w-full rounded-md h-10 text-sm font-medium leading-normal'
            disabled={isPending}>
            {translate('verifyBtn')}
          </Button>
        </form>
      </Form>
    </>
  );
}
