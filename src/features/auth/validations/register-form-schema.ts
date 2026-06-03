import {z} from 'zod';

export const CreateRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      fullName: z.string().trim().min(2, t('fullNameMin')),
      username: z
        .string()
        .min(3, t('usernameInvalid'))
        .max(20, t('usernameInvalid'))
        .regex(/^[a-zA-Z0-9_]{3,20}$/, t('usernameInvalid')),
      mobile: z.string().regex(/^\+?[0-9\s-]{8,15}$/, t('mobileInvalid')),
      password: z
        .string()
        .min(8, t('passwordMin'))
        .refine(value => /[A-Z]/.test(value) && /[0-9]/.test(value), {
          message: t('passwordComplexity')
        }),
      confirm: z.string().min(1, t('confirmRequired'))
    })
    .refine(data => data.confirm === data.password, {
      path: ['confirm'],
      message: t('passwordsDontMatch')
    });

export type RegisterFormValues = z.infer<
  ReturnType<typeof CreateRegisterSchema>
>;
