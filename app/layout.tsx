import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'VR Experience - Hello World',
    description: 'A simple 360 VR experience built with Next.js and Three.js',
};

// Set to false for deployed template
const useLocalPreload = true;
const preloadSrc = useLocalPreload
    ? `http://localhost:8083/?${Math.random()}`
    : 'https://cdn.jsdelivr.net/gh/onlook-dev/onlook@main/apps/web/preload/dist/index.js';

// Error Monitor Configuration
const useLocalErrorMonitor = false; // Set to true for local development
const errorMonitorSrc = useLocalErrorMonitor
    ? `http://localhost:3001/error-monitor.js?${Math.random()}` // Your local server
    : 'https://om-tericsoft1.github.io/node_error_monitor/error_monitor.js'; // Replace with your CDN URL

const isProd = process.env.NODE_ENV === 'production';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="si2j4vl">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
                {/* Don't use preload in production */}
                {!isProd && (
                    <Script
                        type="module"
                        src={preloadSrc}
                        crossOrigin="anonymous"
                        strategy="beforeInteractive"
                    />
                )}
                
                {/* Error Monitor - Load early to catch all errors */}
                <Script
                    src={errorMonitorSrc}
                    strategy="beforeInteractive"
                    crossOrigin="anonymous"
                />
            </head>
            <body className={inter.className} data-oid="mwz9mme">
                {children}
            </body>
        </html>
    );
}