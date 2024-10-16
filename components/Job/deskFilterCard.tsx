import FilterSideBar from "./filterCard";

export default function DesktopFilterCard() {
  return (
    <div className="hidden lg:flex lg:flex-col lg:gap-8  min-w-[300px] w-1/5 rounded-md max-h-screen overflow-y-scroll filter-scrollbar text-white mx-12">
      <FilterSideBar />
    </div>
  );
}
