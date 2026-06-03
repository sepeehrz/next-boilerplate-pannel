'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslations} from 'next-intl';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Loader2, CheckCircle2} from 'lucide-react';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  CreateForgotPasswordSchema,
  type ForgotPasswordFormValues
} from '@/features/auth';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';

export function ForgotPasswordFormComponent({onBack}: {onBack?: () => void}) {
  const t = useTranslations('auth.forgotPassword');

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [submittedIdentifier, setSubmittedIdentifier] = useState('');

  const schema = CreateForgotPasswordSchema(t);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      identifier: ''
    }
  });

  async function handleSubmit(values: ForgotPasswordFormValues) {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1100));
    setLoading(false);
    setSubmittedIdentifier(values.identifier);
    setSent(true);
  }

  if (sent) {
    return (
      <div className='space-y-5 text-center'>
        <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success'>
          <CheckCircle2 className='h-6 w-6' />
        </div>

        <div className='space-y-1.5'>
          <h3 className='text-lg font-semibold'>{t('successTitle')}</h3>
          <p className='text-sm text-muted-foreground'>
            {t('before')}{' '}
            <span className='font-medium text-foreground'>
              {submittedIdentifier}
            </span>{' '}
            {t('after')}
          </p>
        </div>

        <Button variant='outline' className='w-full' onClick={onBack}>
          {t('backToSignIn')}
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-5'
        noValidate>
        <FormField
          control={form.control}
          name='identifier'
          render={({field}) => (
            <FormItem>
              <FormLabel>{t('identifierLabel')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('identifierPlaceholder')}
                  aria-invalid={!!form.formState.errors.identifier}
                />
              </FormControl>
              <p className='text-xs text-muted-foreground'>
                {t('identifierHint')}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' size='lg' disabled={loading}>
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {loading ? t('sending') : t('submit')}
        </Button>

        <button
          type='button'
          onClick={onBack}
          className='block w-full text-center text-sm text-muted-foreground hover:text-foreground'>
          {t('backToSignIn')}
        </button>
      </form>
    </Form>
  );
}
