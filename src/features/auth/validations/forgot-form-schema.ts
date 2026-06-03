import {z} from 'zod';

export const CreateForgotPasswordSchema = (t: (key: string) => string) =>
  z.object({
    identifier: z
      .string()
      .trim()
      .min(1, t('identifierRequired'))
      .min(3, t('identifierMin'))
  });

export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof CreateForgotPasswordSchema>
>;
