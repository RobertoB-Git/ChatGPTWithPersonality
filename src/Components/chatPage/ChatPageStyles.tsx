import styled, { StyledComponent } from "@emotion/styled";
import { DetailedHTMLProps, HTMLAttributes } from "react";


interface ButtonProps {
  sideButton: boolean
}
interface ChatMessages {
  gpt: boolean
}


export const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(205px,20rem) minmax(30rem,100%);
  /* position: relative; */
  /* height: 100rem; */
  max-height: 46rem;
  /* overflow: hidden; */
  overflow: none;

  @media (max-width: 685px) {
    display: block;
    max-height: none;

  }
`;

export const SideBar = styled.div<ButtonProps>`
  display: flex;
  background-color: #c7c7c7;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  max-height: 46rem;
  transition: 0.5s;

  @media (max-width: 685px) {
    position: fixed;
    height: 100%;
    width: ${(props)=> (props.sideButton ? 0 : '20rem')};
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    padding-top: 60px;
    text-align: right;
  }

`;


export const SideButton = styled.button<ButtonProps>`
  position: fixed;
  left: ${(props)=> (props.sideButton ? 0 : '20rem')};
  width: 1rem;
  height: 5rem;
  background-color: black;
  color: white;
  margin-top: 1rem;
  transition: 0.5s;

  @media (min-width: 685px) {
    display: none;
  }

`
// export const SideBarContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   align-items: center;
// `;
export const SideBarTitle = styled.h3`
  margin-top: 2rem;
  font-size: large;
  font-weight: bold;
`;
export const SideBarItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 90%;
  justify-content: space-between;
`;
export const SmallImg = styled.img`
  object-fit: cover;
  aspect-ratio: 1/1;
  width: 4rem;
  border-radius: 0.5rem;
`;
export const ChatBox = styled.div`
  background-color: #e2e2e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 46rem;
`;
export const ChatMessagesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  gap: 2rem;
  padding: 2rem;
  /* justify-content: space-between; */
  background-color: #e2e2e2;
  height: 93%;

  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  /* max-width: */
  /* height: calc(100vh ); */
`;
export const ChatMessages = styled.div<ChatMessages>`
  text-align: ${(props) => (props.gpt ? "left" : "right")};
  background-color:  ${(props) => (props.gpt ? "#939393" : "#c5c5c5")};
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 1rem;

  /* width: fit-content; */
`;
// export const ChatMessagesUser = styled.div`
//   background-color: #e2e2e2;
// `;

export const DefaultImg = styled.div`
  overflow: hidden;
  /* aspect-ratio: 1/1; */
  width: 4rem;
  border-radius: 0.5rem;
  flex-shrink: 0;
`;

export const Text = styled.p`
  padding: 1rem 0 1rem 0;
`;

export const ChatInput = styled.input`
  background-color: #f2f2f2;
  /* color: white; */
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  border-radius: 50rem;
  /* position: absolute; */
  /* bottom: 2%; */
  /* left: 50%; */
  /* transform: translateX(-50%); */
  width: 70%;
  height: 2rem;
  bottom: 0;
  

 
`;
