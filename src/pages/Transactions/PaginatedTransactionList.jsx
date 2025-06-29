import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import TransactionList from "./TransactionList";
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

  return (
    <>
      <TransactionList
        data={currentItems}
        itemsPerPage={itemsPerPage}
        hideLastBorder={true}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<PaginationButton icon={CaretRightIcon} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={<PaginationButton icon={CaretLeftIcon} />}
        containerClassName="flex justify-center items-center gap-2 mt-300"
        pageLinkClassName="pagination-button border-beige-500"
        activeLinkClassName="bg-grey-900 border-grey-900 border text-white"
        breakClassName="pagination-button pointer-events-none border-beige-500"
        renderOnZeroPageCount={null}
        forcePage={currentPage}
      />
    </>
  );
}
