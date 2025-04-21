import Usernav from "@/components/layout/user-nav";
import Image from "next/image";
import Link from "next/link";

interface StandaloneLayoutProps {
  children: React.ReactNode;
}

const StandaloneLayout = ({ children }: StandaloneLayoutProps) => {
  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300">
      <div className="mx-auto max-w-screen-2xl px-4">
        {/* Navbar */}
        <nav className="h-[73px] flex items-center border-neutral-200 dark:border-neutral-700">
          {/* Sol: Logo */}
          <div className="flex-1">
            <Link href="/" className="inline-block p-5">
              <Image
                src="/async.svg"
                alt="Logo"
                height={50}
                width={40}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Sağ: Usernav */}
          <div className="flex items-center justify-end p-5">
            <Usernav />
          </div>
        </nav>

        {/* İçerik */}
        <div className="flex flex-col items-center justify-center py-10 text-neutral-900 dark:text-neutral-100">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StandaloneLayout;
