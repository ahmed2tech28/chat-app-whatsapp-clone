import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LoginProvider } from "@/providers/LoginProvider";
import Redirect from "@/components/custom/Redirect";

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
  title: "Create Next App",
  description: "Generated by create next app",
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
        <LoginProvider>
          <Redirect />
          {children}
        </LoginProvider>
      </body>
    </html>
  );
}
