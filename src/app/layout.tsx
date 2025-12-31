import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";

import Header from "@/components/header";
import QueryProvider from "@/providers/query-provider";

import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoinCT | Real-Time Cryptocurrency Charts & Market Analysis",
  description:
    "CoinCT provides real-time cryptocurrency charts, price tracking, and market analysis tools for Bitcoin, Ethereum, and altcoins. Track trends, compare assets, and stay ahead of the crypto market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${schibstedGrotesk.variable} antialiased`}>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
