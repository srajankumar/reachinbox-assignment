import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "ReachInbox Assignment - Srajan Kumar",
    template: `%s - ${"ReachInbox Assignment - Srajan Kumar"}`,
  },
  description: "ReachInbox Onebox Assignment by Srajan Kumar",
  creator: "srajankumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reachinbox.srajan.tech",
    title: "ReachInbox Assignment - Srajan Kumar",
    description: "ReachInbox Onebox Assignment by Srajan Kumar",
    siteName: "ReachInbox Assignment - Srajan Kumar",
    images: [
      {
        url: "https://reachinbox.srajan.tech/assets/mockup/mockup-1.png",
        width: 3600,
        height: 2700,
        alt: "ReachInbox Assignment - Srajan Kumar",
      },
    ],
  },
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon-16x16.png",
    apple: "/favicons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
