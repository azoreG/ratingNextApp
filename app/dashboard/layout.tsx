import { signOut } from '@/auth';
import Link from 'next/link';
import { auth } from '../../auth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const {
    user: { name },
  } = (session as any) || {};

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="bg-[#F2F3F3] h-screen">
      <div className="w-full bg-white shadow p-6 flex justify-between">
        <div className="text-[#265183]">
          <h3 className="text-base">{`Hello, ${capitalizeFirstLetter(
            name
          )}`}</h3>
          <h1 className="text-2xl">Welcome to the Rating App!</h1>
        </div>
        <div className="flex">
          <Link
            className="flex h-[48px] mr-2 grow items-center justify-center gap-2 rounded-md bg-sky-100 p-3 text-sm font-medium hover:bg-gray-50 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            href="/dashboard/create"
          >
            Create Place
          </Link>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        </div>
      </div>
      {children}
    </div>
  );
}
