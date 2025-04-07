import { lazy, Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const AuthProvider = lazy(() => import("@/provider"));
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import Loader from "./loading";
import RegisterSw from "@/components/RegisterSw";
import { Analytics } from "@vercel/analytics/react";

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
      {/* <ReactLenis root> */}
      <body className={`${inter.className} mx-auto bg-primaryBg`}>
        <Suspense fallback={<Loader />}>
          <AuthProvider session={session}>
            <div className="overflow-x-hidden">
              {children}
              <Toaster />
              <RegisterSw />
            </div>
            <Analytics />
          </AuthProvider>
        </Suspense>
      </body>
      {/* </ReactLenis> */}
    </html>
  );
}
