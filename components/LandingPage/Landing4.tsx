import { poppins } from "@/utils/fonts/font";
import Component from "./Testimonalcard";

export default function LandingPart4() {
  return (
    <div className="mt-32">
      <p
        className={`${poppins.className} text-center  text-white text-3xl md:text-4xl`}
      >
        Recently
        <span className={`${poppins.className} text-primarySkyBlue`}>
          {""} Placed
        </span>
      </p>

      <Component />
    </div>
  );
}
