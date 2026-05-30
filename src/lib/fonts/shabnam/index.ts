import localFont from 'next/font/local';

export const Shabnam = localFont({
  src: [
    {
      path: './Shabnam-Thin-FD.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: './Shabnam-Light-FD.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: './Shabnam-FD.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './Shabnam-Medium-FD.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './Shabnam-Bold-FD.woff2',
      weight: '700',
      style: 'normal'
    }
  ],

  variable: '--font-shabnam',
  display: 'swap',
  preload: true
});
