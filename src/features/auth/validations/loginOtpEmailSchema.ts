import {z} from 'zod';

export const loginOtpEmailSchema = (t: (key: string) => string) =>
  z.object({
    username: z.string().min(1, t('usernameNotEmpty')),
    captcha: z.string().min(1, t('captchaRequired'))
  });

export type loginOtpEmailValues = z.infer<
  ReturnType<typeof loginOtpEmailSchema>
>;
