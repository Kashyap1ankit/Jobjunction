import { Button } from "../ui/button";

export default function ApplyFilterBtn({ fn }: { fn: () => void }) {
  return (
    <Button
      className={`mt-4 w-full bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue text-white hover:bg-gradient-to-r hover:from-secondarySkyBlue hover:to-primarySkyBlue`}
      onClick={() => {
        fn();
      }}
      aria-label="apply"
    >
      Apply
    </Button>
  );
}
