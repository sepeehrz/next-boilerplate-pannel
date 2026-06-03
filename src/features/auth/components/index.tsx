import {FormComponent} from './forms';
import {Card} from '@/components/ui/card';
import {LanguageSwitcher} from './switchLang';
export function AuthComponent() {
  return (
    <div className='min-h-screen lg:flex'>
      <div className='flex w-full lg:w-1/2 items-center justify-center p-4 sm:p-6 lg:p-8'>
        <Card className='w-full max-w-md lg:max-w-xl xl:max-w-2xl'>
          <FormComponent />
        </Card>
      </div>
      <div className='hidden relative overflow-hidden lg:flex lg:w-1/2 items-center justify-center bg-slate-950 text-white'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]' />
        <div className='absolute top-10 left-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl' />
        <div className='absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl' />
        <div className=' absolute top-10 inset-e-10'>
          <LanguageSwitcher />
        </div>

        <div className='relative z-10 text-center px-8'>
          <h2 className='text-3xl font-bold'>Welcome Back</h2>
          <p className='mt-3 text-slate-300'>
            Access your dashboard and manage your platform
          </p>
        </div>
      </div>
    </div>
  );
}
