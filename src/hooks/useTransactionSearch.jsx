import { useState, useEffect } from "react";

function applyFilters(transactions, searchText, selectedCategory, sortOption) {
  let filtered = transactions;

  if (selectedCategory !== "All Categories") {
    filtered = filtered.filter((t) => t.category === selectedCategory);
  }

  const search = searchText.trim().toLowerCase();
  if (search !== "") {
    filtered = filtered.filter(
      (transaction) =>
        transaction.name.toLowerCase().includes(search) ||
        transaction.category.toLowerCase().includes(search),
    );
  }

  switch (sortOption) {
    case "Latest":
      filtered = [...filtered].sort((a, b) => b.date.localeCompare(a.date));
      break;
    case "Oldest":
      filtered = [...filtered].sort((a, b) => a.date.localeCompare(b.date));
      break;
    case "A to Z":
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Z to A":
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "Highest":
      filtered = [...filtered].sort((a, b) => b.amount - a.amount);
      break;
    case "Lowest":
      filtered = [...filtered].sort((a, b) => a.amount - b.amount);
      break;
    default:
      break;
  }
  return filtered;
}

export default function useTransactionSearch(allTransactions) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortOption, setSortOption] = useState("Latest");

  useEffect(() => {
    const newFiltered = applyFilters(
      allTransactions,
      searchText,
      selectedCategory,
      sortOption,
    );
    setFilteredTransactions(newFiltered);
    setCurrentPage(0);
  }, [searchText, selectedCategory, sortOption, allTransactions]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
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
