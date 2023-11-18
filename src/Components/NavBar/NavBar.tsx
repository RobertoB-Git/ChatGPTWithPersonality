import Link from "next/link";
import { FlexDiv, NavBarIcon, NavbarContainer, NavbarMenu } from "./NavBarStyles";
import SearchBar from "../SearchBar";
import Icon from "../../../public/ChatGPT-Logo.png";
import Lupa from "../../../public/zoom-svgrepo-com.svg";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../AppContext";

const Navbar = () => {

  const app = useContext(AppContext)
  console.log(app.user);
  return (
    <NavbarContainer>
      {!app.user && <FlexDiv>
        <Link href={"/Login"}>Log in</Link>
        <Link href={"/Register"}>Sign up</Link>
      </FlexDiv> || <FlexDiv>
         {app.user?.email} 
         <NavbarMenu onClick={() => {
          app.logOut();
          
         }}>Log out</NavbarMenu>
         </FlexDiv>}

      <FlexDiv>
        <Image src={Lupa} alt="Search" />
        <SearchBar />
      </FlexDiv>
      <Link href={"/"}>
        <NavBarIcon src={Icon.src}></NavBarIcon>
      </Link>
    </NavbarContainer>
  );
};

export default Navbar;
