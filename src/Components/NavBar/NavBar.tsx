import Link from "next/link";
import { FlexDiv, NavBarIcon, NavbarContainer } from "./NavBarStyles";
import SearchBar from "../SearchBar";
import Icon from "../../../public/ChatGPT-Logo.png";
import Lupa from "../../../public/zoom-svgrepo-com.svg";
import Image from "next/image";

const Navbar = () => {
  return (
    <NavbarContainer>
      <FlexDiv>
        <Link href={"/Login"}>Log in</Link>
        <Link href={"/Register"}>Sign up</Link>
      </FlexDiv>

      <FlexDiv>
        <Image src={Lupa} alt="Search" />
        <SearchBar />
      </FlexDiv>

      <NavBarIcon src={Icon.src}></NavBarIcon>
    </NavbarContainer>
  );
};

export default Navbar;
