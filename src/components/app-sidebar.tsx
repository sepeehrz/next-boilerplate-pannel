'use client';

import Link from 'next/link';
import {useEffect} from 'react';
import {useMenu} from '@/hooks/use-menu';
import {useTranslations} from 'next-intl';
import {MessageSquare} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {Avatar} from '@/components/ui/avatar';
import {useSidebar} from '@/components/ui/sidebar';
import {useMediaQuery} from '@/hooks/use-media-query';
import {
  Sidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const translate = useTranslations('sideBar');
  const pathname = usePathname();
  const {state, setOpen} = useSidebar();
  const isCollapsed = state === 'collapsed';
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const menu = useMenu();

  useEffect(() => {
    setOpen(!isTablet);
  }, [isTablet, setOpen]);

  return (
    <Sidebar className='border-input' collapsible='icon'>
      <SidebarHeader className='flex items-center flex-row border-b border-input h-22'>
        <Avatar className='bg-primary size-8 flex items-center justify-center'>
          <MessageSquare color='white' size={18} />
        </Avatar>
        {!isCollapsed && (
          <div>
            <div className='text-sm sm:text-base lg:text-lg font-semibold text-sidebar-foreground truncate'>
              {translate('title')}
            </div>
            <div className='text-xs text-muted-foreground truncate'>
              {translate('description')}
            </div>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map(item => {
                const isActive =
                  item.url === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={isActive ? 'bg-muted text-primary' : ''}>
                      <Link href={item.url}>
                        <item.icon className='mb-1' />
                        <span className='text-sm leading-none text-foreground'>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
