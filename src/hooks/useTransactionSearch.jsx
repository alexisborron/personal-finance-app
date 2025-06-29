import { useState, useEffect } from "react";

function applyFilters(transactions, searchText, selectedCategory) {
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

  return filtered;
}

export default function useTransactionSearch(allTransactions) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const newFiltered = applyFilters(
      allTransactions,
      searchText,
      selectedCategory,
    );
    setFilteredTransactions(newFiltered);
    setCurrentPage(0);
  }, [searchText, selectedCategory, allTransactions]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  return {
    searchText,
    handleSearchChange,
    currentPage,
    handlePageChange,
    filteredTransactions,
    handleSelectedCategory,
  };
}
