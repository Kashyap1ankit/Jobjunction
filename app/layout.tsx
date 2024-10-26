import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/provider";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Junction",
  description: "Help Others",
  icons: "Images/jj-logo.png",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <div className=" overflow-x-hidden bg-primaryBg">
            {children}
            <Toaster />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
