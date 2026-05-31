import {useTranslations} from 'next-intl';
import {
  Bot,
  Send,
  Users,
  Store,
  Boxes,
  Wallet,
  Webhook,
  CodeXml,
  Receipt,
  UserPlus,
  Megaphone,
  Smartphone,
  CreditCard,
  ChartColumn,
  LayoutTemplate
} from 'lucide-react';

export function useMenu() {
  const translate = useTranslations('sideBar');

  return [
    {
      title: translate('menu.dashboard'),
      url: '/',
      icon: ChartColumn
    },
    {
      title: translate('menu.devices'),
      url: '/devices',
      icon: Smartphone
    },
    {
      title: translate('menu.webhooks'),
      url: '/webhooks',
      icon: Webhook
    },
    {
      title: translate('menu.apps'),
      url: '/apps',
      icon: CodeXml
    },
    {
      title: translate('menu.singleSend'),
      url: '/single-send',
      icon: Send
    },
    {
      title: translate('menu.biling'),
      url: '/biling',
      icon: Receipt
    },
    {
      title: translate('menu.groups'),
      url: '/groups',
      icon: Boxes
    },
    {
      title: translate('menu.contacts'),
      url: '/contacts',
      icon: Users
    },
    {
      title: translate('menu.campaigns'),
      url: '/campaigns',
      icon: Megaphone
    },
    {
      title: translate('menu.templates'),
      url: '/templates',
      icon: LayoutTemplate
    },
    {
      title: translate('menu.subscriptions'),
      url: '/subscriptions',
      icon: CreditCard
    },
    {
      title: translate('menu.chatbot'),
      url: '/chatbots',
      icon: Bot
    },
    {
      title: translate('menu.wallet'),
      url: '/wallet',
      icon: Wallet
    },
    {
      title: translate('menu.store'),
      url: '/store',
      icon: Store
    },
    {
      title: translate('menu.referral'),
      url: '/referral',
      icon: UserPlus
    }
  ];
}
