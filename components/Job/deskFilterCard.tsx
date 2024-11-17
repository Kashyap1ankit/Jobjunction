import FilterSideBar from "./filterCard";

export default function DesktopFilterCard() {
  return (
    <div className="filter-scrollbar mx-12 hidden max-h-screen w-1/5 min-w-[300px] overflow-y-scroll rounded-md text-white lg:flex lg:flex-col lg:gap-8">
      <FilterSideBar />
    </div>
  );
}
