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
        className={`${poppins.className} text-md mx-auto w-fit rounded-3xl border-2 border-primarySkyBlue px-8 py-2 text-center text-white`}
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
