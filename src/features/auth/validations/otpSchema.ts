import {z} from 'zod';

export const OtpSchema = z.object({
  code: z.array(z.string().regex(/^[0-9]$/)).length(4, 'کد باید 4 رقم باشد')
});

export type OtpFormValues = z.infer<typeof OtpSchema>;
