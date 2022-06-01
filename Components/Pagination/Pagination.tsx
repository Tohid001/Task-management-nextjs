import React, { useEffect, useState } from 'react';

function Pagination({
  tasksPerpage,
  totalTasks,
  paginate,
  currentTotalTasks,
  currentPage,
}: {
  tasksPerpage: number;
  totalTasks: number;
  paginate: (param: number) => void;
  currentTotalTasks: number;
  currentPage: number;
}) {
  useEffect(() => {
    !currentTotalTasks && paginate(Math.ceil(totalTasks / tasksPerpage));
  });
  const pageNumbers = [];

  //   const [currentP, setCurrentp] = useState(1);

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerpage); i++) {
    if (currentTotalTasks === 0) {
    }
    pageNumbers.push(i);
  }

  console.log('currentPage', currentPage);

  return (
    <ul
      style={{
        display: 'flex',
        gap: '1em',
        justifyContent: 'center',
        listStyle: 'none',
      }}
    >
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
                // setCurrentp(number);
              }}
            >
              {number}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Pagination;
