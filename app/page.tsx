'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardAction } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import logo from '@/public/Logo.png';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Home() {
  return (
    <div className="bg-background text-foreground dark:bg-background dark:text-foreground flex min-h-screen flex-col items-center justify-start gap-12 p-8">
      <ThemeToggle />
      {/* Logo */}
      <div className="flex flex-col items-center gap-4">
        <Image src={logo} alt="ListBook Logo" className="h-24 w-24" />
        <h1 className="text-primary text-4xl font-bold">Hello World, this is ListBook</h1>
        <p className="text-secondary text-lg">Testing theme tokens, buttons, and cards</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button variant="default">Primary Button</Button>
        <Button variant="destructive">Destructive Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="link">Link Button</Button>
      </div>

      {/* Card */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardAction>
            <Button size="sm">Action</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>This is a card description. It should respect your surface and text tokens.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="default">
            Confirm
          </Button>
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        </CardFooter>
      </Card>

      {/* Skeleton */}
      <div className="flex w-full max-w-md flex-col gap-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}
