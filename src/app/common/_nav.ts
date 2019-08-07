interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Order'
  },
  {
    name: 'History',
    url: '/order/history',
    icon: 'fa fa-history'
  },
  {
    name: 'Calendar',
    url: '/order/calendar',
    icon: 'fa fa-calendar'
  },
  {
    title: true,
    name: 'Manage'
  },
  {
    name: 'Parent',
    url: '/parent',
    icon: 'cui-user-female'
  },
  {
    name: 'Canteen',
    url: '/canteen',
    icon: 'fa fa-shopping-basket',
    children: [
      {
        name: 'Summary',
        url: '/canteen/summary',
        icon: 'fa fa-tv'
      },
      {
        name: 'Categories',
        url: '/canteen/categories',
        icon: 'fa fa-list-ul'
      },
      {
        name: 'Products',
        url: '/canteen/products',
        icon: 'fa fa-eercast'
      }
    ]
  },
  {
    title: true,
    name: 'Emailers'
  },
  {
    name: 'Send Email',
    url: '/emailers/send',
    icon: 'fa fa-check-square-o'
  },
  {
    name: 'Canteen News',
    url: '/emailers/news',
    icon: 'fa fa-twitter'
  },
  {
    title: true,
    name: 'System'
  },
  {
    name: 'Settings',
    url: '/settings',
    icon: 'fa fa-cog'
  },
  {
    name: 'Payment Gateway',
    url: '/auth/stripe',
    icon: 'fa fa-institution'
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'fa fa-newspaper-o'
  },
  {
    name: 'Security',
    url: '/security',
    icon: 'fa fa-key'
  }
];
