import styled from "@emotion/styled";

interface ButtonProps {
  burgerButton: boolean;
}

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;

  a {
    font-weight: bold;
    text-align: center;
    display: none;

  }
`;
export const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  font-weight: bold;
  text-align: center;

`;
export const FlexDiv2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  font-weight: bold;
  text-align: center;

  @media (max-width: 685px) {
    display: none;
  }
`;

export const NavbarMenu = styled.nav`
cursor: pointer;
 
`;
export const PhoneMenu = styled.div`
 display: none;
 @media (max-width: 685px) {
    display: block;
  
  }
`;
export const PhoneMenuinner = styled.div<ButtonProps>`
 width: 20rem;
 background-color: #c7c7c7;
 position: fixed;
 left: 0;
 top: 4rem;
 z-index: 20;
 flex-direction: column;
 @media (max-width: 685px) {
    /* height: 0; */
    overflow: hidden;
    height: ${(props) => (props.burgerButton ? 0 : "5rem")};
  }
`;
export const PhoneMenuinnerContainer = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 text-align: center;
 font-weight: bold;
 gap: 1rem;
`;

export const NavBarIcon = styled.img`
  height: 3rem;
`;

// export const NavBar