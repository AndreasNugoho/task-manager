import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/providers/UserProvider";
import { Inter } from "next/font/google";
import MiniSidebar from "./Components/MiniSidebar/MiniSidebar";

const inter = Inter({
  subsets: ["latin"],
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
      <body className={inter.className}>
        <UserProvider>
          <Toaster position="top-center" />
          <div className="h-full flex overflow-hidden">
            <MiniSidebar />
            <div className="flex-1 flex flex-col"></div>
          </div>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
