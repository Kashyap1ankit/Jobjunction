import { roboto_slab } from "@/utils/fonts/font";
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
        className={`${roboto_slab.className} text-xs py-2 px-8 border-2 border-primarySkyBlue w-fit rounded-3xl text-center text-white mx-auto`}
      >
        Trusted By Best &#10024;
      </p>

      <InfiniteMovingCards
        items={testimonials}
        direction="left"
        speed="normal"
      />
    </div>
  );
}
