import HashLoader from "react-spinners/HashLoader";

export default function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <HashLoader
        color={"#355ee8"}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
