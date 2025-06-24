import { Logo } from '@/components/Logo';
import { Nav } from '@/components/Nav';

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 px-2 bg-gray-950">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between">
        <Logo />
        <Nav />
      </div>
    </header>
  );
};
