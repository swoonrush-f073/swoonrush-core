export interface NavLink {
  name: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/#products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];
