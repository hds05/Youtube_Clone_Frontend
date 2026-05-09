import React, { useState } from "react";
// Import icons
import { CiSearch } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";

function Search({ setSearchText }) {
  // State to control mobile search bar visibility
  const [searchBar, setSearchBar] = useState(false);
  // State to store input field value
  const [input, setInput] = useState("");
  // Function runs whenever user types in input field
  const handleChange = (e) => {
    // Store typed value in local state
    setInput(e.target.value);
    // Send search text to parent/global context
    setSearchText(e.target.value);
  };

  return (
    <>
      {/* Desktop search section (Hide on mobile when mobile search is open)*/}
      <div className={`${searchBar ? "hidden" : "flex"} sm:flex`}>
        {/* Search bar (hide on small screens) */}
        <div className="hidden sm:block">
          {/* Search container */}
          <div className="flex border border-gray-700 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              value={input}
              onChange={handleChange}
              className="w-full px-4 py-1 bg-black outline-none"
            />
            {/* Search button */}
            <button className="p-2 px-4 bg-gray-800">
              <CiSearch size={18} />
            </button>
          </div>
        </div>
        {/* Mobile search icon. Visible only on small screens */}
        <div className="sm:hidden">
          {/* Opens mobile search bar */}
          <button
            onClick={() => setSearchBar(true)}
            className="p-2 hover:bg-gray-800 rounded-full"
          >
            <CiSearch size={18} />
          </button>
        </div>
      </div>

      {/* Mobile fullscreen search bar */}
      {searchBar && (
        <div className="fixed top-0 left-0 w-full bg-black z-50 p-2 sm:hidden">
          <div className="flex items-center gap-2">
            {/* Back button to close search bar on small screen */}
            <button onClick={() => setSearchBar(false)}>
              <IoArrowBack size={22} />
            </button>
            {/* Search input */}
            <input
              type="text"
              placeholder="Search"
              autoFocus
              value={input}
              onChange={handleChange}
              className="flex-1 px-4 py-2 bg-gray-900 rounded-full outline-none"
            />
            {/* Static dearch button */}
            <button>
              <CiSearch size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
