import { EdgeStoreProvider } from '@/lib/edgestore';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'EmergeSync',
    description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </body>
        </html>
    );
}
