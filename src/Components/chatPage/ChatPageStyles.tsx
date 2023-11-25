import styled from "@emotion/styled";

export const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  /* position: relative; */
  height: 100vmax;
`;

export const SideBar = styled.div`
  display: flex;
  background-color: #c7c7c7;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;
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
export const SideBarItemsimg = styled.img`
  aspect-ratio: 1/1;
  width: 4rem;
`;
export const ChatBox = styled.div`
  background-color: #e2e2e2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ChatMessages = styled.div`
  background-color: #e2e2e2;
  height: 93%;
`;

export const ChatInput = styled.input`
  background-color: #010139;
  color: white;
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
