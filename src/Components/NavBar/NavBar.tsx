import Link from "next/link";
import {
  FlexDiv,
  FlexDiv2,
  NavBarIcon,
  NavbarContainer,
  NavbarMenu,
  PhoneMenu,
  PhoneMenuinner,
  PhoneMenuinnerContainer,
} from "./NavBarStyles";
import SearchBar from "../SearchBar";
import Icon from "../../../public/celebchat-high-resolution-logo.png";
import Icon2 from "../../../public/celebchat-high-resolution-logo-transparent.svg";
import Lupa from "../../../public/zoom-svgrepo-com.svg";
import Image from "next/image";
import burger from "../../../public/burger-menu-svgrepo-com.svg";
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";

const Navbar = () => {
  const { logOut, user } = useContext(AppContext);
  const [burgerMenu, setBurgerMenu] = useState(false);
  // console.log(user);
  // logOut() ??
  const handleBurger = () => {
    setBurgerMenu(!burgerMenu);
  };
  return (
    <NavbarContainer>
      {(!user && (
        <FlexDiv2>
          <Link href={"/Login"}>Log in</Link>
          <Link href={"/Register"}>Sign up</Link>
        </FlexDiv2>
      )) || (
        <FlexDiv2>
          {user?.email}
          <NavbarMenu
            onClick={() => {
              logOut();
            }}>
            Log out
          </NavbarMenu>
        </FlexDiv2>
      )}

      <PhoneMenu >
        <Image
          width={30}
          height={30}
          src={burger.src}
          alt="menu"
          onClick={handleBurger}
        />
        <PhoneMenuinner burgerButton={burgerMenu}>
          {(!user && (
            <PhoneMenuinnerContainer>
              <Link href={"/Login"}>Log in</Link>
              <Link href={"/Register"}>Sign up</Link>
            </PhoneMenuinnerContainer>
          )) || (
            <PhoneMenuinnerContainer>
              <p>{user?.email}</p>
              <NavbarMenu
                onClick={() => {
                  logOut();
                }}>
                Log out
              </NavbarMenu>
            </PhoneMenuinnerContainer>
          )}
        </PhoneMenuinner>
      </PhoneMenu>

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
