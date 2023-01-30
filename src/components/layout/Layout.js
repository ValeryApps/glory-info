import React from "react";
import { RightSide } from "../rightSide/RightSide";

export const Layout = ({ children }) => {
  return (
    <div className="flex relative justify-between lg:px-10 mt-3 mb-8 gap-3">
      <div className="lg:w-[75%] min-h-[100%]">{children}</div>
      <div className="hidden lg:block lg:w-[25%] bg-white shadow-md">
        <RightSide />
      </div>
    </div>
  );
};
