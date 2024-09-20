import LandingPart1 from "@/components/LandingPage/Landing1";
import FieldsMarqueeComponent from "@/components/LandingPage/FieldsMarq";
import LandingPart3 from "@/components/LandingPage/Landing3";
import LandingPart4 from "@/components/LandingPage/Landing4";
import Navbar from "@/components/Navbar/Navbar";
import Background from "@/components/Bg";
import Footer from "@/components/Footer";
import PwaInstallBtn from "@/components/PwaInstallBtn";
export default function Home() {
  return (
    <div>
      <PwaInstallBtn />
      <Background />
      <Navbar />
      <LandingPart1 />
      <FieldsMarqueeComponent />
      <LandingPart3 />
      <LandingPart4 />
      <Footer />
    </div>
  );
}
