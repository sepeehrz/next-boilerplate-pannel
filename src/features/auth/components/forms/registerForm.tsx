'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslations} from 'next-intl';
import {Input} from '@/components/ui/input';
import {Eye, Lock, EyeOff} from 'lucide-react';
import {Button} from '@/components/common/button';
import {zodResolver} from '@hookform/resolvers/zod';
import {CreateRegisterSchema, type RegisterFormValues} from '@/features/auth';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton
} from '@/components/ui/input-group';

const defaultValues: RegisterFormValues = {
  fullName: '',
  username: '',
  mobile: '',
  password: '',
  confirm: ''
};

export function RegisterFormComponent() {
  const t = useTranslations('auth.register');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const schema = CreateRegisterSchema(t);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit'
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1200));

      console.log(values);
      setSuccess(true);
      form.reset();
    } catch {
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className='rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm'>
        <span className='font-medium'>{t('successTitle')}</span>{' '}
        {t('successDescription')}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
        noValidate>
        {form.formState.errors.root?.message && (
          <p className='text-sm text-destructive'>
            {form.formState.errors.root.message}
          </p>
        )}

        <FormField
          control={form.control}
          name='fullName'
          render={({field}) => (
            <FormItem>
              <FormLabel>{t('fullName')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('fullNamePlaceholder')}
                  autoComplete='name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='username'
            render={({field}) => (
              <FormItem>
                <FormLabel>{t('username')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('usernamePlaceholder')}
                    autoComplete='username'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='mobile'
            render={({field}) => (
              <FormItem>
                <FormLabel>{t('mobile')}</FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    placeholder={t('mobilePlaceholder')}
                    autoComplete='tel'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='password'
          render={({field}) => (
            <FormItem>
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('passwordPlaceholder')}
                    autoComplete='new-password'
                    {...field}
                  />
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupAddon align='inline-end'>
                    <InputGroupButton
                      aria-label='Eye'
                      title='Eye'
                      size='icon-xs'
                      onClick={() => setShowPassword(prev => !prev)}>
                      {showPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirm'
          render={({field}) => (
            <FormItem>
              <FormLabel>{t('confirm')}</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('confirmPlaceholder')}
                    autoComplete='new-password'
                    {...field}
                  />
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full'
          size='lg'
          disabled={loading || form.formState.isSubmitting}
          loading={loading || form.formState.isSubmitting}>
          {loading ? t('creating') : t('submit')}
        </Button>

        <p className='text-center text-xs text-muted-foreground'>
          {t('footerPrefix')}{' '}
          <a className='text-primary hover:underline' href='#'>
            {t('terms')}
          </a>{' '}
          {t('and')}{' '}
          <a className='text-primary hover:underline' href='#'>
            {t('privacy')}
          </a>
          .
        </p>
      </form>
    </Form>
  );
}
