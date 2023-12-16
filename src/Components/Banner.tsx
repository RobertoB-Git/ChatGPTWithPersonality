import styled from "@emotion/styled";
import { Button } from "./Button";
import Image from "next/image";
import TempImg from "../../public/mega-hits-drake-1920x10801782004c_vertical.jpg";
import Link from "next/link";

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  background-color: black;
  overflow: hidden;
  img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    object-fit: cover;
    max-height: 100%;
    /* max-width: 100%; */
  }
`;

const BannerInfoContainer = styled.div`
  color: white;
  text-shadow: 1.5px 0 0 #000, 0 -1.5px 0 #000, 0 1.5px 0 #000, -1.5px 0 0 #000;
  position: absolute;
  bottom: 20vh;
  left: 50%;
  /* background-color: white; */
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BannerTitle = styled.h1`
  font-weight: bold;
  font-size: xx-large;
`;
const BannerInfo = styled.p``;
const BannerButton = styled(Button)`
  position: absolute;
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
`;

const Banner = () => {
  return (
    <BannerContainer>
      <Image src={TempImg} alt="celeb"></Image>
      <BannerInfoContainer>
        <BannerTitle>Latest Celeb</BannerTitle>
        <BannerInfo>Chat with our latest addition to our roster</BannerInfo>
      </BannerInfoContainer>
      <Link href={"/chat/Drake"}><BannerButton>Chat</BannerButton></Link>
    </BannerContainer>
  );
};

export default Banner;
