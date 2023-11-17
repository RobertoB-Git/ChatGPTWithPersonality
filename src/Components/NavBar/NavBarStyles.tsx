import styled from "@emotion/styled";

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
        height: 2rem;
    }
`
export const FlexDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`

export const NavbarMenu = styled.nav`
    width: 100%;
    height: 4rem;
    display: flex;
    flex-direction: row;
`

export const NavBarIcon = styled.img`
    height: 3rem;
`