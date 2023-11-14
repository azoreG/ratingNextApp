import Sidebar from '../ui/sidebar/Sidebar';
import { signOut } from '@/auth';
import styles from './dashboard.module.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F2F3F3] h-screen">
      <div className="w-full bg-white shadow p-6 flex justify-between">
        <div className="text-[#265183]">
          <h3 className="text-base">Hello, Bob!</h3>
          <h1 className="text-2xl">Welcome to the Rating App!</h1>
        </div>
        <div>
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
      <div
        className={`flex  flex-col md:flex-row p-6 h-full ${styles.container}`}
      >
        <div className="w-full mr-6 p-4 flex-none md:w-[394px] bg-white shadow">
          <Sidebar />
        </div>
        <div className="flex-grow md:overflow-y-auto bg-white shadow">
          {children}
        </div>
      </div>
    </div>
  );
}
