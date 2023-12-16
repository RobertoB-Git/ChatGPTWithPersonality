import Link from "next/link";
import {
  FlexDiv,
  NavBarIcon,
  NavbarContainer,
  NavbarMenu,
} from "./NavBarStyles";
import SearchBar from "../SearchBar";
import Icon from "../../../public/celebchat-high-resolution-logo.png";
import Icon2 from "../../../public/celebchat-high-resolution-logo-transparent.svg";
import Lupa from "../../../public/zoom-svgrepo-com.svg";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../AppContext";

const Navbar = () => {
  const { logOut, user } = useContext(AppContext);
  // console.log(user);
  // logOut() ??
  return (
    <NavbarContainer>
      {(!user && (
        <FlexDiv>
          <Link href={"/Login"}>Log in</Link>
          <Link href={"/Register"}>Sign up</Link>
        </FlexDiv>
      )) || (
        <FlexDiv>
          {user?.email}
          <NavbarMenu
            onClick={() => {
              logOut();
            }}>
            Log out
          </NavbarMenu>
        </FlexDiv>
      )}

      <FlexDiv>
        <Image src={Lupa} alt="Search" />
        <SearchBar />
      </FlexDiv>
      <Link href={"/"} style={{ height: "70%", padding: "1rem" }}>
        {/* <NavBarIcon src={Icon.src}></NavBarIcon> */}
        <Image width={70} height={70} src={Icon2.src} alt="logo" />
      </Link>
    </NavbarContainer>
  );
};

export default Navbar;
