import React, { useEffect } from 'react';

import { paginateType, handleNextPrevType } from '@/Hooks/usePagination';

type paginationProps = {
  pageNumbers: number[];
  paginate: paginateType;
  currentPage: number;
  handleNext: handleNextPrevType;
  handlePrev: handleNextPrevType;
};

function Pagination({
  paginate,
  currentPage,
  pageNumbers,
  handleNext,
  handlePrev,
}: paginationProps) {
  return (
    <ul
      style={{
        display: 'flex',
        gap: '1em',
        justifyContent: 'center',
        listStyle: 'none',
      }}
    >
      <li style={{ padding: '.5em' }}>
        <button
          disabled={currentPage == 1}
          style={{
            padding: '1em',
            cursor: 'pointer',
          }}
          onClick={() => {
            handlePrev();
          }}
        >
          Prev
        </button>
      </li>

      {pageNumbers.map((number) => {
        return (
          <li key={number} style={{ padding: '.5em' }}>
            <button
              style={{
                padding: '1em',
                cursor: 'pointer',
                background: currentPage === number ? 'pink' : 'inherit',
              }}
              onClick={() => {
                paginate(number);
              }}
            >
              {number}
            </button>
          </li>
        );
      })}
      <li style={{ padding: '.5em' }}>
        <button
          disabled={currentPage == pageNumbers.length}
          style={{
            padding: '1em',
            cursor: 'pointer',
          }}
          onClick={() => {
            handleNext();
          }}
        >
          Next
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
