import {
  ChatBox,
  ChatContainer,
  ChatInput,
  ChatMessages,
  SideBar,
  SideBarItems,
  SideBarItemsimg,
  SideBarTitle,
} from "@/Components/chatPage/ChatPageStyles";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Celeb {
    id: number;
    Name: string;
    Image: string;
  }
  
type List = Celeb[];

const Chat = () => {
  const router = useRouter();
  console.log(router.query.Name);
  const [input, setInput] = useState('');
  const [celeb, setCeleb] = useState<Celeb>();
  const [celebList, setCelebList] = useState<List>([]);

  useEffect(() => {
    const getCeleb = async () => {
      try {
        const res = await axios.get(
          "https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/ccelebs/" +
            router.query.Name
        );
        console.log(res.data);
        setCeleb(res.data);

        const allCelebList = await axios.get(
          `https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/ccelebs`
        );
        console.log(allCelebList.data);
        setCelebList(allCelebList.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCeleb();
  }, []);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <ChatContainer>
      <SideBar>
        <SideBarTitle>Celeb List</SideBarTitle>
        {celebList.map((celeb) => {
          return <SideBarItems>
            <SideBarItemsimg src={celeb.Image}></SideBarItemsimg>
            {celeb.Name} 
            </SideBarItems>;
        })}
      </SideBar>
      <ChatBox>
        <ChatMessages></ChatMessages>
        <ChatInput value={input} onChange={handleChange} ></ChatInput>
      </ChatBox>
    </ChatContainer>
  );
};

export default Chat;
