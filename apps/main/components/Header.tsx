import { Logo } from '@/components/Logo';
import { Nav } from '@/components/Nav';

export const Header = () => {
  return (
    <header className="border-grey-opacity-200 sticky top-0 z-10 border-b bg-white px-2">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between">
        <Logo />
        <Nav />
      </div>
    </header>
  );
};
