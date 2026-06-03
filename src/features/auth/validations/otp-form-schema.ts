import {z} from 'zod';

export const CreatePhoneSchema = (t: (key: string) => string) =>
  z.object({
    phone: z.string().regex(/^\+?[0-9\s-]{8,15}$/, t('invalidMobile'))
  });

export const CreateOtpSchema = (t: (key: string) => string) =>
  z.object({
    otp: z.string().length(6, t('otpLength'))
  });

export type PhoneFormValues = z.infer<ReturnType<typeof CreatePhoneSchema>>;
export type OtpFormValues = z.infer<ReturnType<typeof CreateOtpSchema>>;
