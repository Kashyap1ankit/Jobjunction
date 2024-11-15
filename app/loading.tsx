import HashLoader from "react-spinners/HashLoader";

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <HashLoader
        color={"#355ee8"}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
