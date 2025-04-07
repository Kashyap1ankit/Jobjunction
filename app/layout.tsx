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
  description:
    "Find your Next Opportunity With Job Junction. Whether you're looking for your next career move or you know a great opportunity for others.",
  icons: "Images/jj-logo.png",
  keywords:
    "job junction, job portals, job websites, freshers jobs, job vacancies, career opportunities, india job search, job portal india",

  robots: "index, follow",
  openGraph: {
    title: "Job Junction",
    description:
      "Find your Next Opportunity With Job Junction. Whether you're looking for your next career move or you know a great opportunity for others.",
    url: "https://jj.10xdevlab.in/",
    images: [
      {
        url: "https://jj.10xdevlab.in/Images/jj-logo.png",
        width: 1200,
        height: 630,
        alt: "Job Junction Logo",
      },
    ],
    siteName: "Job Junction",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Job Junction",
    description:
      "Find your Next Opportunity With Job Junction. Whether you're looking for your next career move or you know a great opportunity for others.",
    creator: "@kashyap_tweetts",
    images: ["https://jj.10xdevlab.in/Images/jj-logo.png"],
  },
  alternates: {
    canonical: "https://jj.10xdevlab.in",
  },
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
