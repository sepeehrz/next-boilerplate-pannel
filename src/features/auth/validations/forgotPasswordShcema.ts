import {z} from 'zod';

export const createForgotPasswordMailSchema = (t: (key: string) => string) =>
  z.object({
    mail: z.string().min(1, t('emailRequired'))
  });

export type ForgotPasswordMailFormValues = z.infer<
  ReturnType<typeof createForgotPasswordMailSchema>
>;

export const createForgotPasswordMobileSchema = (t: (key: string) => string) =>
  z.object({
    mobile: z.string().min(1, t('mobileRequired'))
  });

export type ForgotPasswordMobileFormValues = z.infer<
  ReturnType<typeof createForgotPasswordMobileSchema>
>;
