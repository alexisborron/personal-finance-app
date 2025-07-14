import { useState, useMemo } from "react";
import { applyFilters } from "../utils/helpers";

export default function useTransactionSearch(allTransactions, initialCategory) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory ?? "All Transactions",
  );

  const [sortOption, setSortOption] = useState("Latest");

  const filteredTransactions = useMemo(() => {
    return applyFilters(
      allTransactions,
      searchText,
      selectedCategory,
      sortOption,
    );
  }, [allTransactions, searchText, selectedCategory, sortOption]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  return {
    searchText,
    handleSearchChange,
    currentPage,
    handlePageChange,
    filteredTransactions,
    handleSelectedCategory,
    selectedCategory,
    handleSortChange,
    sortOption,
  };
}
