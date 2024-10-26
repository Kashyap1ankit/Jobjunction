import { poppins, roboto_slab } from "@/utils/fonts/font";
import Component from "./Testimonalcard";

export default function LandingPart4() {
  return (
    <div className="mt-32">
      <p
        className={`${roboto_slab.className} text-center  text-white text-3xl md:text-4xl`}
      >
        Recently
        <span className={`${roboto_slab.className} text-primarySkyBlue`}>
          {""} Placed
        </span>
      </p>

      <p></p>

      <Component />
    </div>
  );
}
