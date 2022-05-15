import styled from "styled-components";

export const FormContainer = styled.form`
  border-radius: 5px;
  position: fixed;
  /* top: 0; */
  bottom: 0;
  background: black;
  padding: 0.8rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 100;
`;

export const CancelButton = styled.button`
  all: unset;
  background: gray;
  color: red;
  font-style: bold;
  width: 10%;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
`;

export const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & label {
    font-weight: bold;
    font-size: 1.2rem;
    color: #ab79d6;
  }

  & input {
    all: unset;
    display: block;
    border: 1.5px solid rgba(166, 5, 152);
    background-color: rgba(184, 138, 180);
    padding: 7px;
    border-radius: 5px;
    color: black;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  & button {
    all: unset;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
    color: black;
    &:hover {
      transform: translateY(-3.5px) scale(1.05);
    }
    &:nth-child(1) {
      background: rgba(2, 247, 84);
    }
    &:nth-child(2) {
      background: ${({ isResetDisable }) =>
        isResetDisable ? "rgba(109, 221, 227)" : "rgba(168, 173, 170)"};
    }
  }
`;
