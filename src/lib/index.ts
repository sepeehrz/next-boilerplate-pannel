import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';
export * from './i18n';

export {axiosInstance} from './api/axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
