import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import TransactionList from "../../components/TransactionList";
import CaretRightIcon from "../../assets/images/icon-caret-right.svg";
import CaretLeftIcon from "../../assets/images/icon-caret-left.svg";
import PaginationButton from "./PaginationButton";

export default function PaginatedTransactionList({
  itemsPerPage,
  items,
  onPageChange,
  initialPage,
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    onPageChange(event.selected);
  };

  useEffect(() => {
    const newStartIndex = (currentPage * itemsPerPage) % items.length;
    setStartIndex(newStartIndex);
  }, [currentPage, items, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [startIndex]);

  // Range set to match Frontend Mentor Figma design
  const dynamicPageRangeDisplayed =
    currentPage === pageCount - 3 || currentPage === pageCount - 1
      ? 2
      : pageCount > 5
        ? 2
        : 1;

  const dynamicMarginPagesDisplayed =
    currentPage === pageCount - 3 || pageCount > 5 ? 0 : 1;

  console.log(currentPage);
  return (
    <>
      <TransactionList data={currentItems} itemsPerPage={itemsPerPage} />
      {pageCount > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={<PaginationButton icon={CaretRightIcon} />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={dynamicPageRangeDisplayed}
          marginPagesDisplayed={dynamicMarginPagesDisplayed}
          pageCount={pageCount}
          previousLabel={<PaginationButton icon={CaretLeftIcon} />}
          containerClassName="flex justify-center items-center gap-2 mt-300"
          pageLinkClassName="pagination-button border-beige-500"
          activeLinkClassName="bg-grey-900 border-grey-900 border text-white"
          breakClassName="pointer-events-none flex h-[40px] w-[40px] items-center justify-center"
          renderOnZeroPageCount={null}
          forcePage={currentPage}
        />
      )}
    </>
  );
}
