import {z} from 'zod';

export const CompleteProfileSchema = (t: (key: string) => string) =>
  z.object({
    //   fullname_compositionLinkControl_firstname: z
    //     .string()
    //     .min(1, t('firstNameRequired')),
    //   fullname_compositionLinkControl_lastname: z
    //     .string()
    //     .min(1, t('lastNameRequired')),
    emailaddress1: z.string().min(1, t('emailRequired')),
    kphwms_referralcode: z.string().optional(),
    kphwms_agreementstatus: z.boolean().refine(val => val === true, {
      message: t('acceptTermsRequired')
    })
  });

export type CompleteProfileValues = z.infer<
  ReturnType<typeof CompleteProfileSchema>
>;
