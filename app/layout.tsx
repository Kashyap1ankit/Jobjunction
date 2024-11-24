import { lazy, Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const AuthProvider = lazy(() => import("@/provider"));
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import Loader from "./loading";
import RegisterSw from "@/components/RegisterSw";

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
        <Suspense fallback={<Loader />}>
          <AuthProvider session={session}>
            <div className="overflow-x-hidden bg-primaryBg">
              {children}
              <Toaster />
              <RegisterSw />
            </div>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
