import Link from "next/link";
import {
  Celeb,
  CelebContainer,
  CelebContent,
  CelebHeader,
  CelebImg,
  CelebName,
} from "./CelebListStyles";

interface Celeb {
  id: number;
  Name: string;
  Image: string;
}

type List = Celeb[];

const CelebList = ({ list }: { list: List }) => {
  return (
    <CelebContainer>
      <CelebHeader>Celebrety List</CelebHeader>
      <CelebContent>
        {list.map((celeb) => {
          return (
            <Link href={"/"}>
              
              <Celeb>
              <CelebImg src={celeb.Image}></CelebImg>
                <CelebName>{celeb.Name} </CelebName>
              </Celeb>
            </Link>
          );
        })}
      </CelebContent>
    </CelebContainer>
  );
};

export default CelebList;
