import { createContext, useContext, useState } from "react";

// Creating context for search functionality
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // State to store search input text
  const [searchText, setSearchText] = useState("");

  return (
    // Providing search state and function to all components wrapped inside SearchProvider
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
};

// =========================================
// CUSTOM HOOK
// =========================================

// This hook helps us access search context easily
export const useSearch = () => useContext(SearchContext);
