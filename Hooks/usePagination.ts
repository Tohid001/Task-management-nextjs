import { useState, useEffect } from 'react';

type paginateProps = {
  currentPageNumber: number;
  numberofItemsPerPage: number;
  totalItems: { [index: string]: any }[];
  pageLimit: number;
  maxPageNumberLimit: number;
  minPageNumberLimit: number;
};

export type paginateType = (current: number) => void;

export type itemsPerPageHandlerType = (items: number) => void;

export type handleNextPrevType = () => void;

export function usePagination({
  currentPageNumber,
  numberofItemsPerPage,
  totalItems,
  maxPageNumberLimit,
  pageLimit,
  minPageNumberLimit,
}: paginateProps) {
  const [currentPage, setCurrentPage] = useState<number>(currentPageNumber);

  const [itemsPerPage, setitemsPerPage] =
    useState<number>(numberofItemsPerPage);

  const [pageNumLimit, setPageNumLimit] = useState<number>(pageLimit);

  const [maxPageNumLimit, setMaxPageNumLimit] =
    useState<number>(maxPageNumberLimit);

  const [minPageNumLimit, setMinPageNumLimit] =
    useState<number>(minPageNumberLimit);

  const indexofLastTask = currentPage * itemsPerPage;
  const indexofFirstTask = indexofLastTask - itemsPerPage;
  const currentPageItems = totalItems.slice(indexofFirstTask, indexofLastTask);
  const pageNumbers = [];

  useEffect(() => {
    !currentPageItems.length &&
      paginate(Math.ceil(totalItems.length / itemsPerPage));
  });

  for (let i = 1; i <= Math.ceil(totalItems.length / itemsPerPage); i++) {
    if (currentPageItems.length === 0) {
    }
    pageNumbers.push(i);
  }

  const paginate = (current: number): void => {
    setCurrentPage(current);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      return prev + 1;
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => {
      return prev - 1;
    });

    if (currentPage + 1 > maxPageNumLimit) {
      setMaxPageNumLimit((prev) => prev + pageNumLimit);
      setMinPageNumLimit((prev) => prev + pageNumLimit);
    }
  };

  const itemsPerPageHandler = (items: number) => {
    setitemsPerPage(items);
    if ((currentPage - 1) % pageNumLimit === 0) {
      setMaxPageNumLimit((prev) => prev - pageNumLimit);
      setMinPageNumLimit((prev) => prev - pageNumLimit);
    }
  };

  return {
    currentPage,
    paginate,
    handleNextPage,
    handlePrevPage,
    itemsPerPageHandler,
    currentPageItems,
    indexofLastTask,
    indexofFirstTask,
    pageNumbers,
  };
}
