import Link from "next/link";
import {
  Celeb,
  CelebContainer,
  CelebContent,
  CelebHeader,
  CelebName,
} from "./CelebListStyles";

const CelebList = () => {
  return (
    <CelebContainer>
      <CelebHeader>Celebrety List</CelebHeader>
      <CelebContent>
        <Link href={"/"}>
          <Celeb>
            <CelebName>Name</CelebName>
          </Celeb>
        </Link>
        <Celeb>
          <CelebName>Name</CelebName>
        </Celeb>
        <Celeb>
          <CelebName>Name</CelebName>
        </Celeb>
        <Celeb>
          <CelebName>Name</CelebName>
        </Celeb>
        <Celeb>
          <CelebName>Name</CelebName>
        </Celeb>
      </CelebContent>
    </CelebContainer>
  );
};

export default CelebList;
