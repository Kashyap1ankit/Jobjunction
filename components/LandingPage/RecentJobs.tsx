import { roboto_slab } from "@/utils/fonts/font";
import RecentJobsPosting from "./RecentJobsPosting";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RecentJobs() {
  return (
    <div>
      <div className="mt-32 flex flex-col items-center gap-12">
        <p
          className={`${roboto_slab.className} text-center text-3xl text-white md:text-4xl`}
        >
          Recently Added{" "}
          <span className={`${roboto_slab.className} text-primarySkyBlue`}>
            Jobs
          </span>
        </p>

        <RecentJobsPosting />

        <div className="group">
          <Link
            href={"/jobs"}
            className="flex w-fit items-center gap-2 border-neutral-800 p-2 px-4 font-bold text-white duration-300 group-hover:rounded-full group-hover:border"
          >
            <p className="text-primarySkyBlue"> View More Jobs</p>
            <ArrowRight className="text-primarySkyBlue duration-300 group-hover:translate-x-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
