import {z} from 'zod';

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    username: z.string().min(1, t('usernameNotEmpty')),
    password: z.string().min(1, t('passwordRequired')),
    captcha: z.string().min(1, t('captchaRequired'))
  });

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
