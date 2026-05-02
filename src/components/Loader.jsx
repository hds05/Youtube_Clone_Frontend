import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/70">
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
