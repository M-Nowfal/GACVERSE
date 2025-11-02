import type { JSX } from "react";
import { Separator } from "../ui/separator";

const Divider = (): JSX.Element => {
  return (
    <div className="w-[80%] max-w-5xl flex justify-center m-auto my-10">
      <Separator className="bg-gray-300 dark:bg-gray-800" />
    </div>
  );
};

export default Divider;
