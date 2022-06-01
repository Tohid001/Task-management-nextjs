import React, { useEffect } from 'react';

function Pagination({
  tasksPerpage,
  totalTasks,
  paginate,
  currentTotalTasks,
}: {
  tasksPerpage: number;
  totalTasks: number;
  paginate: (param: number) => void;
  currentTotalTasks: number;
}) {
  useEffect(() => {
    !currentTotalTasks && paginate(Math.ceil(totalTasks / tasksPerpage));
  });
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerpage); i++) {
    if (currentTotalTasks === 0) {
    }
    pageNumbers.push(i);
  }

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
              style={{ padding: '1em', cursor: 'pointer' }}
              onClick={() => {
                paginate(number);
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
