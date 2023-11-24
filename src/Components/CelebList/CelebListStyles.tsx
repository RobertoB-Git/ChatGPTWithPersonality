import styled from "@emotion/styled";

export const CelebContainer = styled.div`
  width: 100%;
`;
export const CelebContent = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;

`;

export const CelebHeader = styled.h3`
  font-size: larger;
  font-weight: bold;
  margin-left: 10vw;
`;

export const Celeb = styled.div`
  position: relative;

  aspect-ratio: 16/13;

  background-color: grey;

`;
export const CelebImg = styled.img`
  height: 100%;
  width: 100%;
`;

export const CelebName = styled.h4`
  color: white;
  position: absolute;
  bottom: 1vh;
  left: 50%;
  transform: translateX(-50%);
  text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
`;
