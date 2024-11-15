import { Skeleton } from "@/components/ui/skeleton";

export default function JobCardSkeleton() {
  return (
    <div className="flex flex-col gap-8 mt-4 md:mt-0 p-4 md:p-6 shadow-lg mx-auto w-11/12  lg:w-3/4 bg-primaryBorder text-white rounded-xl border-2 border-secondaryBorder hover:cursor-pointer hover:bg-hoverBorder ">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div>
            <Skeleton className="w-16 h-16 rounded-md" />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <Skeleton className="bg-gray-400 text-radio text-md md:text-2xl tracking-wide font-bold w-28 sm:w-52 p-4" />

              <Skeleton className="w-4 h-4 sm:w-8 sm:h-8 rounded-full" />
            </div>
            <div className="flex gap-2 items-center flex-wrap mt-2">
              <Skeleton className="w-24 p-2 rounded-full" /> |
              <Skeleton className="w-24 p-2 rounded-full" />
            </div>
          </div>
        </div>

        <Skeleton className="hidden sm:block sm:w-6 sm:h-8" />
      </div>

      {/* second section  */}

      <div className="flex gap-2 flex-wrap">
        {[1, 2].map(() => {
          return (
            <>
              <div className="flex gap-2 items-center p-2 bg-sky-700 rounded-full">
                <Skeleton className="w-12 h-4" />
              </div>
              <div className="flex gap-2 items-center p-2 bg-gray-700 rounded-full">
                <Skeleton className="w-12 h-4" />
              </div>
            </>
          );
        })}
      </div>

      {/* third section  */}

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <Skeleton className="bg-gray-400 w-32 p-2 rounded-full" />

        <Skeleton className="w-20 p-4 rounded-md" />
      </div>
    </div>
  );
}
