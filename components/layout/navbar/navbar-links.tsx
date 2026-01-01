import Link from 'next/link';

const Nav_Links = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export function NavbarLinks() {
  return (
    <div className="hidden items-center gap-6 md:flex">
      {Nav_Links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
