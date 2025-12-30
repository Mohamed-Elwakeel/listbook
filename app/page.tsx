import Image from 'next/image';
import logo from '@/public/Logo.png';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <h1 className="text-primary text-4xl font-bold">Hello World this ListBook Project</h1>
        <Image src={logo} alt="ListBook Logo" className="size-10" />
      </main>
    </div>
  );
}
