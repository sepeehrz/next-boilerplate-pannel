import { z } from "zod";

export const ResetPasswordSchema = z.object({
  code: z.array(z.string().regex(/^[0-9]$/)).length(6, "کد باید ۶ رقم باشد"),
  password: z.string().min(1, "رمز عبور الزامی است"),
  confirmPassword: z.string().min(1, "رمز عبور الزامی است"),
});

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
