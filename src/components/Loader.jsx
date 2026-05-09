import React from "react";
// Importing loading spinner from react-loader-spinner package
import { MagnifyingGlass } from "react-loader-spinner";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/70">
      {/* Magnifying glass loading animation */}
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="red"
        color="gray"
      />
    </div>
  );
}

export default Loader;
