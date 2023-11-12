import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from './ui/sidebar/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rating App',
  description: 'Review page for your favorite places',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex p-6 h-screen flex-col md:flex-row bg-[#F2F3F3]">
          <div className="w-full mr-6 p-4 flex-none md:w-[394px] bg-white shadow">
            <Sidebar />
          </div>
          <div className="flex-grow md:overflow-y-auto bg-white shadow">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
