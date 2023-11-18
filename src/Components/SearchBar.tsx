import styled from "@emotion/styled";
import { useState } from "react";

const SearchInput = styled.input`
  color: black;
  background-color: lightgray;
  width: 40vw;
  text-align: center;
  font-weight: 600;
`;

const SearchBar = () => {
  const [input, setInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <>
      <SearchInput value={input} onChange={handleChange}></SearchInput>
    </>
  );
};

export default SearchBar;
