import {z} from 'zod';

export const loginOtpMobileSchema = (t: (key: string) => string) =>
  z.object({
    mobile: z.string().min(1, t('mobileNotEmpty')),
    captcha: z.string().min(1, t('captchaRequired'))
  });

export type loginOtpMobileValues = z.infer<
  ReturnType<typeof loginOtpMobileSchema>
>;
