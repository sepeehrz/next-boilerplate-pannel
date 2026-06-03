'use client';

import {useForm} from 'react-hook-form';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';
import {useRef, useState, useEffect} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Phone, Loader2, ArrowLeft} from 'lucide-react';
import {InputOTP, InputOTPSlot, InputOTPGroup} from '@/components/ui/input-otp';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/components/ui/input-group';
import {
  OtpFormValues,
  CreateOtpSchema,
  PhoneFormValues,
  CreatePhoneSchema
} from '@/features/auth'; // مسیر فایل اسکیما
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form';

export function OtpFormComponent() {
  const t = useTranslations('auth.otp');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Form definitions
  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(CreatePhoneSchema(t)),
    defaultValues: {phone: ''}
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(CreateOtpSchema(t)),
    defaultValues: {otp: ''}
  });

  // Timer logic
  useEffect(() => {
    if (seconds <= 0) return;
    timer.current = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [seconds]);

  const startCountdown = () => setSeconds(45);

  // Handlers
  async function onPhoneSubmit(data: PhoneFormValues) {
    setLoading(true);
    // Fake API call
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setStep('otp');
    startCountdown();
  }

  async function onOtpSubmit(data: OtpFormValues) {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    // Handle error manually if not from Zod (e.g., server error)
    otpForm.setError('otp', {message: 'کد وارد شده صحیح نیست'});
  }

  function handleResend() {
    if (seconds > 0) return;
    otpForm.reset({otp: ''});
    startCountdown();
  }

  if (step === 'phone') {
    return (
      <Form {...phoneForm}>
        <form
          onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
          className='space-y-5'>
          <FormField
            control={phoneForm.control}
            name='phone'
            render={({field}) => (
              <FormItem>
                <FormLabel>{t('mobileNumber')}</FormLabel>
                <FormControl>
                  <InputGroup dir='ltr'>
                    <InputGroupInput
                      className='px-0'
                      {...field}
                      type='tel'
                      placeholder={t('mobilePlaceholder')}
                    />
                    <InputGroupAddon className='ps-1.5'>
                      <Phone />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormDescription>{t('mobileDescription')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' size='lg' disabled={loading}>
            {loading && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin rtl:ml-2 rtl:mr-0' />
            )}
            {loading ? t('sendingCode') : t('sendCode')}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...otpForm}>
      <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className='space-y-5'>
        <button
          type='button'
          onClick={() => {
            setStep('phone');
            otpForm.reset();
          }}
          className='inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors'>
          <ArrowLeft className='h-3.5 w-3.5 rtl:rotate-180' />{' '}
          {t('changeNumber')}
        </button>

        <div className='space-y-1'>
          <p className='text-sm text-muted-foreground'>
            {t('codeSentTo')}{' '}
            <span className='font-medium text-foreground' dir='ltr'>
              {phoneForm.getValues('phone')}
            </span>
          </p>
        </div>

        <FormField
          control={otpForm.control}
          name='otp'
          render={({field}) => (
            <FormItem className='flex flex-col items-center justify-center'>
              <FormLabel className='sr-only'>{t('oneTimeCode')}</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}>
                  <InputOTPGroup dir='ltr'>
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className='h-12 w-12 text-lg'
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-center gap-1 text-sm'>
          <span className='text-muted-foreground'>{t('didntGetIt')}</span>
          <button
            type='button'
            onClick={handleResend}
            disabled={seconds > 0}
            className='font-medium text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline'>
            {seconds > 0 ? t('resendIn', {seconds}) : t('resendCode')}
          </button>
        </div>

        <Button
          type='submit'
          className='w-full'
          size='lg'
          disabled={loading || otpForm.watch('otp').length !== 6}>
          {loading && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin rtl:ml-2 rtl:mr-0' />
          )}
          {loading ? t('verifying') : t('verifySignIn')}
        </Button>
      </form>
    </Form>
  );
}
