import { lazy } from "react";
import RecentJobs from "@/components/LandingPage/RecentJobs";

const LandingPart1 = lazy(() => import("@/components/LandingPage/Landing1"));
const LandingPart3 = lazy(() => import("@/components/LandingPage/Landing3"));
const LandingPart4 = lazy(() => import("@/components/LandingPage/Landing4"));
const Navbar = lazy(() => import("@/components/Navbar/Navbar"));
const Background = lazy(() => import("@/components/Bg"));
const Footer = lazy(() => import("@/components/Footer"));
const TrustedBy = lazy(() => import("@/components/LandingPage/TrustedBy"));
const FAQ = lazy(() => import("@/components/LandingPage/Faq"));

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl pt-28 md:pt-36">
      <Background />
      <Navbar />
      <LandingPart1 />
      <TrustedBy />
      <RecentJobs />
      <LandingPart3 />
      <LandingPart4 />
      <FAQ />
      <Footer />
    </div>
  );
}
