import React from 'react';

const parentsTyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '30%',
  marginInline: 'auto',
};

interface ActionProps {
  previousMonth: () => void;
  nextMonth: () => void;
}

function Action({ previousMonth, nextMonth }: ActionProps) {
  return (
    <div style={parentsTyles}>
      <button
        onClick={previousMonth}
        style={{
          cursor: 'pointer',
        }}
      >
        prev
      </button>
      <button
        onClick={nextMonth}
        style={{
          cursor: 'pointer',
        }}
      >
        next
      </button>
    </div>
  );
}

export default Action;
