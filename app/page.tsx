import LandingPart1 from "@/components/LandingPage/Landing1";
import LandingPart3 from "@/components/LandingPage/Landing3";
import LandingPart4 from "@/components/LandingPage/Landing4";
import Navbar from "@/components/Navbar/Navbar";
import Background from "@/components/Bg";
import Footer from "@/components/Footer";
import TrustedBy from "@/components/LandingPage/TrustedBy";
import FAQ from "@/components/LandingPage/Faq";

export default function Home() {
  return (
    <div className="pt-28 md:pt-48">
      <Background />
      <Navbar />
      <LandingPart1 />
      <TrustedBy />
      <LandingPart3 />
      <LandingPart4 />
      <FAQ />
      <Footer />
    </div>
  );
}
