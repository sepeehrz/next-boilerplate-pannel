'use client';
import {useForm} from 'react-hook-form';
import {useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {zodResolver} from '@hookform/resolvers/zod';
import {CompleteProfileSchema} from '../../../../validations/completeProfileSchema';
import type {CompleteProfileValues} from '../../../../validations/completeProfileSchema';
import {useUpdateRecordEntity} from '@/hooks/use-update-record';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {useGetContactRefer} from '@/features/auth/hooks/useGetContactRefer';
interface IProps {
  contactValueId: string;
}
export function CompleteProfileComponent({contactValueId}: IProps) {
  const translate = useTranslations('signupPage.Form');
  const globaltranslate = useTranslations('global');
  const validationT = useTranslations('loginPage.validations.register');

  const {mutate: updateForm, isPending} = useUpdateRecordEntity();
  const {mutateAsync: getContactRefer, isPending: isReferralPending} =
    useGetContactRefer();

  const router = useRouter();

  const form = useForm<CompleteProfileValues>({
    resolver: zodResolver(CompleteProfileSchema(validationT)),
    defaultValues: {
      // fullname_compositionLinkControl_firstname: '',
      // fullname_compositionLinkControl_lastname: '',
      emailaddress1: '',
      kphwms_referralcode: '',
      kphwms_agreementstatus: false
    }
  });

  async function onSubmit(data: CompleteProfileValues) {
    const referredUser = data.kphwms_referralcode
      ? await getContactRefer(data.kphwms_referralcode)
      : null;

    const {kphwms_referralcode, ...restData} = data;
    const payload = {
      ...restData,
      kphwms_agreementdate: new Date(),
      'kphwms_ReferralPersonid@odata.bind': `/contacts(${referredUser?.contactid})`
    };
    updateForm(
      {
        entity: 'contacts',
        id: contactValueId,
        data: payload
      },
      {
        onSuccess: () => {
          router.replace('/');
        }
      }
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-2'>
          {/* <FormField
            control={form.control}
            name='fullname_compositionLinkControl_firstname'
            render={({field}) => (
              <FormItem className='space-y-2 '>
                <FormLabel className='text-left rtl:text-right'>
                  {translate('labelInputFirstName')}
                </FormLabel>
                <FormControl>
                  <Input
                    id='fullname'
                    {...field}
                    placeholder={translate('placeholderInputFirstName')}
                    autoComplete='off'
                    className='h-10 w-full'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='fullname_compositionLinkControl_lastname'
            render={({field}) => (
              <FormItem className='space-y-2 '>
                <FormLabel className='text-left rtl:text-right'>
                  {translate('labelInputLastName')}
                </FormLabel>
                <FormControl>
                  <Input
                    id='fullname'
                    {...field}
                    placeholder={translate('placeholderInputFirstName')}
                    autoComplete='off'
                    className='h-10 w-full'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name='emailaddress1'
            render={({field}) => (
              <FormItem className='space-y-2 '>
                <FormLabel className='text-left rtl:text-right'>
                  {translate('labelInputEmail')}
                </FormLabel>
                <FormControl>
                  <Input
                    id='emailaddress1'
                    {...field}
                    placeholder={translate('placeholderInputEmail')}
                    autoComplete='off'
                    className='h-10 w-full'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='kphwms_referralcode'
            render={({field}) => (
              <FormItem className='space-y-2 '>
                <FormLabel className='text-left rtl:text-right'>
                  {translate('referralCode')}
                </FormLabel>
                <FormControl>
                  <Input
                    id='kphwms_referralcode'
                    {...field}
                    placeholder={translate('placeholderInputReferralCode')}
                    autoComplete='off'
                    className='h-10 w-full'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='kphwms_agreementstatus'
            render={({field}) => (
              <FormItem className='flex items-center '>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={checked => field.onChange(checked)}
                    className='leading-none mb-0.5 rounded-full border-primary cursor-pointer'
                  />
                </FormControl>
                <label
                  htmlFor={field.name}
                  className='text-sm leading-none font-medium '>
                  {translate('agree')}
                </label>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            variant='default'
            className='w-full rounded-md h-10 text-sm font-medium leading-normal'
            disabled={isPending}>
            {isPending ? globaltranslate('entering') : translate('submitBtn')}
          </Button>
        </form>
      </Form>
    </>
  );
}
