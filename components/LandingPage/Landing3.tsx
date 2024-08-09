import { Download, GitCommitHorizontal, Github } from "lucide-react";
import TextComponent from "../TextComp";
import { Button } from "../ui/button";

export default function LandingPart3() {
  return (
    <div className="rounded-lg bg-red-600 p-4 md:p-8 mt-52 flex flex-wrap md:flex-nowrap w-11/12 md:w-3/4 gap-8 mx-auto">
      <div>
        <TextComponent
          text="We're open sourced"
          className="text-2xl lg:text-4xl text-white font-bold"
        />
        <TextComponent
          text="We are open for everyone who want's to be the part of this communit & is capable to contribute to this platform"
          className="text-sm text-slate-100 mt-4 w-full md:w-3/4  mb-12"
        />

        <div className="flex gap-4">
          <Button
            variant={"outline"}
            className="flex gap-4 font-bold bg-white hover:bg-white border-b-4 border-r-4 border-darkBg"
          >
            <Github />
            <TextComponent text="Code" />
          </Button>

          <Button
            variant={"outline"}
            className="flex gap-4 font-bold bg-white hover:bg-white border-b-4 border-r-4 border-darkBg"
          >
            <Download />
            <TextComponent text="Updates" />
          </Button>
        </div>
      </div>

      <img
        src="./Images/Code.png"
        className="w-full md:w-1/2 rounded-md shadow-xl"
      />
    </div>
  );
}