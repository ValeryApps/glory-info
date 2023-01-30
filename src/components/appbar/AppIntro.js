import React from "react";
import { CategoriesLink } from "./CategoriesLink";

export const AppIntro = ({ visible, setVisible }) => {
  return (
    <div className="w-full bg-gradient-to-b from-teal-800 via-teal-600 to-teal-800 h-40 relative">
      <h1 className="text-white text-7xl font-bold text-center drop-shadow-md mb-2">
        Glory Info
      </h1>
      <h1 className="text-white text-2xl font-bold text-center drop-shadow-md ">
        Glory-Info News
      </h1>
      {visible && (
        <div className="absolute bottom-0 w-full">
          <CategoriesLink />
        </div>
      )}
    </div>
  );
};
