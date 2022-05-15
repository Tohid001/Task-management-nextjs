import styled from "styled-components";

export const SubRow = styled.div`
  position: relative;
  background: rgba(212, 208, 207, 0.2);
  padding: 0.8em;
  display: flex;
  gap: 1rem;
  align-items: center;
  & p {
  }
  & span {
    margin-left: auto;
    cursor: pointer;
  }
`;

export const IconContainer = styled.div`
  margin-left: auto;
  background: rgba(212, 208, 207, 0.5);
  padding: 0.5em;
  display: flex;
  gap: 10px;

  & button {
    all: unset;
    cursor: pointer;
    &:nth-child(1) {
      color: ${({ isEdit }) => (isEdit ? "rgba(255, 47, 0, 0.5)" : "null")};
      &:hover {
        color: ${({ isEdit }) => (isEdit ? "red" : "null")};
      }
    }
    &:nth-child(2) {
      color: ${({ isAbled, isEdit }) =>
        isEdit && !isAbled ? "rgba(101, 103, 105)" : "null"};
      &:hover {
        color: ${({ isEdit, isAbled }) =>
          isEdit && !isAbled ? "null" : "black"};
      }
    }
  }
`;
