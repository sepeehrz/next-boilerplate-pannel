import {z} from 'zod';

export const CreateLoginSchema = (t: (key: string) => string) =>
  z.object({
    username: z
      .string()
      .trim()
      .min(1, t('usernameRequired'))
      .min(3, t('usernameMin')),
    password: z.string().min(1, t('passwordRequired')).min(6, t('passwordMin')),
    captcha: z.string().min(1, t('captchaRequired'))
  });

export type LoginFormValues = z.infer<ReturnType<typeof CreateLoginSchema>>;
