import styled from 'styled-components';

export const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  padding: 1em;
  background-color: white;
  gap: 1em;
  & {
    a {
      border: 1px solid black;
      padding: 0.5em;
      cursor: pointer;
      background-color: green;
    }
  }
`;
