import { poppins } from "@/utils/fonts/font";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const testimonials = [
  "Google",
  "Airbnb",
  "Microsoft",
  "YCombinator",
  "Behance",
  "Cloudflare",
  "Atlassian",
  "Blackberry",
];

export default function TrustedBy() {
  return (
    <div className="mt-32">
      <p
        className={`${poppins.className} text-md py-2 px-8 border-2 border-primarySkyBlue w-fit rounded-3xl text-center text-white mx-auto`}
      >
        Landed Jobs At &#10024;
      </p>

      <InfiniteMovingCards
        items={testimonials}
        direction="left"
        speed="normal"
      />
    </div>
  );
}
