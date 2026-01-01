import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/Logo.png';

import { Container } from '@/components/layout/container';
import { NavbarLinks } from './navbar-links';
import { MobileMenu } from './mobile-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-transparent py-2">
      <Container>
        <div className="border-border/50 bg-surface/70 flex h-16 items-center justify-between rounded-full border px-6 shadow-sm backdrop-blur-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Collectanea Logo" className="h-8 w-8" />
            <span className="text-lg font-semibold">Collectanea</span>
          </Link>

          {/* Desktop Links */}
          <NavbarLinks />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </Container>
    </nav>
  );
}
