import styled from "@emotion/styled";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const SearchInput = styled.input`
  color: black;
  background-color: lightgray;
  width: 40vw;
  text-align: center;
  font-weight: 600;
`;

const CelebList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #c2c2c2;
  left: 50%;
  top: 4rem;
  z-index: 10;
  width: 25vw;
  padding-top: 1rem;
  padding-bottom: 1rem;
  transform: translate(-50%);
  min-width: 15rem;
`;

export const ListItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 90%;
  justify-content: space-between;
  padding-left: 1rem;
`;
export const Container = styled.div`
 
`;
export const SmallImg = styled.img`
  object-fit: cover;
  aspect-ratio: 1/1;
  width: 4rem;
  border-radius: 0.5rem;
`;

interface AllCelebs {
  id: number;
  Name: string;
  Image: string;
}

const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const [allCelebs, setAllCelebs] = useState<AllCelebs[]>([]);
  const [filterCelebs, setfilterCelebs] = useState<AllCelebs[]>([]);

  useEffect(() => {
    const getAllCelebs = async () => {
      try {
        const response = await axios.get(
          "https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/ccelebs"
        );

        const CelebsInfo = response.data;
        setAllCelebs(CelebsInfo);
      } catch (error) {}
    };

    getAllCelebs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    
    let filtered:AllCelebs[] = []

    if (e.target.value == "") {
      filtered= []
    } else {
      filtered = allCelebs.filter((celeb) =>
      celeb.Name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    }
    setfilterCelebs(filtered);
  };
  return (
    <>
      <SearchInput value={input} onChange={handleChange}></SearchInput>
        
        {filterCelebs.length >=1 && <CelebList>
          {filterCelebs.map((celeb) => {
            return (
              <Link key={celeb.Name} href={`/chat/${celeb.Name}`} style={{ width: "90%" }}>

              <ListItems>
                <SmallImg src={celeb.Image}></SmallImg>
                {celeb.Name}
              </ListItems>
              </Link>
            );
          })}
        </CelebList>}
       
    </>
  );
};

export default SearchBar;
