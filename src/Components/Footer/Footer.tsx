import {
  FooterContainer,
  FooterCopyright,
  FooterInfoBody,
  FooterInfoContainer,
  FooterInfoHeader,
  FooterLinksContainer,
  FooterSocials,
} from "./FooterStyles";
import Twitter from "../../../public/twitter-svgrepo-com.svg";
import Facebook from "../../../public/facebook-svgrepo-com.svg";
import Instagram from "../../../public/instagram-svgrepo-com.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {

  return (
    <FooterContainer>
      <FooterLinksContainer>
        <FooterInfoContainer>
          <FooterInfoHeader>My Account</FooterInfoHeader>
          <FooterInfoBody>
            <Link href={"/"}>Sign in</Link>
          </FooterInfoBody>
          <FooterInfoBody>
            <Link href={"/"}>Register</Link>
          </FooterInfoBody>
        </FooterInfoContainer>
        <FooterInfoContainer>
          <FooterInfoHeader>Help</FooterInfoHeader>
          <FooterInfoBody>
            <Link href={"/"}>Chat GPS docs</Link>
          </FooterInfoBody>
        </FooterInfoContainer>
        <FooterInfoContainer>
          <FooterInfoHeader>Legal stuff</FooterInfoHeader>
          <FooterInfoBody>
            <Link href={"/"}>Terms of use</Link>
          </FooterInfoBody>
          <FooterInfoBody>
            <Link href={"/"}>Privacy policy</Link>
          </FooterInfoBody>
        </FooterInfoContainer>
        <FooterInfoContainer>
          <FooterInfoHeader>Socials</FooterInfoHeader>
          <FooterSocials>
            <Link href={"/"}>
              <Image width={30} height={30} src={Twitter.src} alt="twitter" />
            </Link>
            <Link href={"/"}>
              <Image width={30} height={30} src={Facebook.src} alt="facebook" />
            </Link>
            <Link href={"/"}>
              <Image
                width={30}
                height={30}
                src={Instagram.src}
                alt="Instagram"
              />
            </Link>
          </FooterSocials>
        </FooterInfoContainer>
      </FooterLinksContainer>
      <FooterCopyright>
        © 123 Fake Celeb Inc. All Rights Reserved
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;
