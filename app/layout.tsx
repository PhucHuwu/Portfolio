import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import GlClient from "@/components/gl/GlClient";

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Phuc Huwu",
    description: "Investment strategies that outperform the market",
    generator: "v0.app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="mask-icon" href="/icon.svg" color="#000000" />
                <link rel="apple-touch-icon" href="/icon-192.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/icon-192.png" />
            </head>
            <body className={`${geistMono.variable} antialiased`} suppressHydrationWarning>
                <GlClient />
                <Header />
                <div className="relative z-10">{children}</div>
            </body>
        </html>
    );
}
