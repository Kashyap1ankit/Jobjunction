import { Skeleton } from "@/components/ui/skeleton";

export default function JobCardSkeleton() {
  return (
    <div className="mx-auto mt-4 flex w-11/12 flex-col gap-8 rounded-xl border-2 border-secondaryBorder bg-primaryBorder p-4 text-white shadow-lg hover:cursor-pointer hover:bg-hoverBorder md:mt-0 md:p-6 lg:w-3/4">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div>
            <Skeleton className="h-16 w-16 rounded-md" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Skeleton className="text-radio text-md w-28 bg-gray-400 p-4 font-bold tracking-wide sm:w-52 md:text-2xl" />

              <Skeleton className="h-4 w-4 rounded-full sm:h-8 sm:w-8" />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Skeleton className="w-24 rounded-full p-2" /> |
              <Skeleton className="w-24 rounded-full p-2" />
            </div>
          </div>
        </div>

        <Skeleton className="hidden sm:block sm:h-8 sm:w-6" />
      </div>

      {/* second section  */}

      <div className="flex flex-wrap gap-2">
        {[1, 2].map((e, i) => {
          return (
            <div key={i}>
              <div className="flex items-center gap-2 rounded-full bg-sky-700 p-2">
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex items-center gap-2 rounded-full bg-gray-700 p-2">
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          );
        })}
      </div>

      {/* third section  */}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Skeleton className="w-32 rounded-full bg-gray-400 p-2" />

        <Skeleton className="w-20 rounded-md p-4" />
      </div>
    </div>
  );
}
