import {
  ChatBox,
  ChatContainer,
  ChatInput,
  ChatMessages,
  ChatMessagesContainer,
  SideBar,
  SideBarItems,
  SmallImg,
  SideBarTitle,
  DefaultImg,
  Text,
  SideButton,
} from "@/Components/chatPage/ChatPageStyles";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import avatar from "../../../public/avatar.png";
import Image from "next/image";
import { AppContext } from "@/Components/AppContext";
interface Celeb {
  id: number;
  Name: string;
  Image: string;
}

type List = Celeb[];

interface message {
  id: number;
  created_at: number;
  role: string;
  content: string;
  index: number;
  cconversation_id: number;
}

interface Conversation {
  id: number;
  created_at: number;
  name: string;
  model: string;
  cusers_id: number;
  _cmessage_of_cconversation: message[];
}

const Chat = () => {
  const router = useRouter();
  console.log(router.query.Name);
  const [input, setInput] = useState("");
  const [celeb, setCeleb] = useState<Celeb>();
  const [celebList, setCelebList] = useState<List>([]);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "gpt",
      message: "Gpt message1",
    },
    {
      role: "user",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum est dignissimos eaque voluptatum placeat temporibus alias eius labore sequi perferendis eos nostrum tempore natus, impedit cupiditate quisquam maxime? Odit nihil culpa minima aliquam iure esse consequatur vitae est eaque. Est iste vel provident unde dignissimos accusantium, fugit repudiandae nesciunt distinctio sapiente perspiciatis quod beatae veritatis magnam officia dolorem possimus suscipit hic aliquam velit aspernatur, minima a mollitia! Quam maiores ducimus nihil nam quisquam quidem officia porro commodi est dicta blanditiis eveniet quia neque doloribus, non atque a quibusdam hic voluptate tempore totam. Nobis, laboriosam voluptatibus reprehenderit perferendis quasi earum sed",
    },
    {
      role: "user",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum est dignissimos eaque voluptatum placeat temporibus alias eius labore sequi perferendis eos nostrum tempore natus, impedit cupiditate quisquam maxime? Odit nihil culpa minima aliquam iure esse consequatur vitae est eaque. Est iste vel provident unde dignissimos accusantium, fugit repudiandae nesciunt distinctio sapiente perspiciatis quod beatae veritatis magnam officia dolorem possimus suscipit hic aliquam velit aspernatur, minima a mollitia! Quam maiores ducimus nihil nam quisquam quidem officia porro commodi est dicta blanditiis eveniet quia neque doloribus, non atque a quibusdam hic voluptate tempore totam. Nobis, laboriosam voluptatibus reprehenderit perferendis quasi earum sed",
    },
    {
      role: "user",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum est dignissimos eaque voluptatum placeat temporibus alias eius labore sequi perferendis eos nostrum tempore natus, impedit cupiditate quisquam maxime? Odit nihil culpa minima aliquam iure esse consequatur vitae est eaque. Est iste vel provident unde dignissimos accusantium, fugit repudiandae nesciunt distinctio sapiente perspiciatis quod beatae veritatis magnam officia dolorem possimus suscipit hic aliquam velit aspernatur, minima a mollitia! Quam maiores ducimus nihil nam quisquam quidem officia porro commodi est dicta blanditiis eveniet quia neque doloribus, non atque a quibusdam hic voluptate tempore totam. Nobis, laboriosam voluptatibus reprehenderit perferendis quasi earum sed",
    },
    {
      role: "user",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum est dignissimos eaque voluptatum placeat temporibus alias eius labore sequi perferendis eos nostrum tempore natus, impedit cupiditate quisquam maxime? Odit nihil culpa minima aliquam iure esse consequatur vitae est eaque. Est iste vel provident unde dignissimos accusantium, fugit repudiandae nesciunt distinctio sapiente perspiciatis quod beatae veritatis magnam officia dolorem possimus suscipit hic aliquam velit aspernatur, minima a mollitia! Quam maiores ducimus nihil nam quisquam quidem officia porro commodi est dicta blanditiis eveniet quia neque doloribus, non atque a quibusdam hic voluptate tempore totam. Nobis, laboriosam voluptatibus reprehenderit perferendis quasi earum sed",
    },

    {
      role: "gpt",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum est dignissimos eaque voluptatum placeat temporibus alias eius labore sequi perferendis eos nostrum tempore natus, impedit cupiditate quisquam maxime? Odit nihil culpa minima aliquam iure esse consequatur vitae est eaque. Est iste vel provident unde dignissimos accusantium, fugit repudiandae nesciunt distinctio sapiente perspiciatis quod beatae veritatis magnam officia dolorem possimus suscipit hic aliquam velit aspernatur, minima a mollitia! Quam maiores ducimus nihil nam quisquam quidem officia porro commodi est dicta blanditiis eveniet quia neque doloribus, non atque a quibusdam hic voluptate tempore totam. Nobis, laboriosam voluptatibus reprehenderit perferendis quasi earum sed",
    },
  ]);
  const [sideButton, setSideButton] = useState(true);

  const {authToken} = useContext(AppContext)
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
        const allConversations = await axios.get(
          `https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/cconversation`,
          { headers: { Authorization: "Bearer " + authToken } }
        );

        const allConvos:Conversation[] = allConversations.data
        const currentConvoExist = allConvos.find((convo)=> convo.name == router.query.Name)

        console.log('currentConvoExist',currentConvoExist);
        setCelebList(allCelebList.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCeleb();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSideBarButton = () => {
    setSideButton(!sideButton);
  };

  return (
    <ChatContainer>
      <SideBar sideButton={sideButton}>
        <SideBarTitle>Celeb List</SideBarTitle>

        <SideButton sideButton={sideButton} onClick={handleSideBarButton}>
          {sideButton ? ">" : "<"}
        </SideButton>
        {celebList.map((celeb) => {
          return (
            <SideBarItems>
              <SmallImg src={celeb.Image}></SmallImg>
              {celeb.Name}
            </SideBarItems>
          );
        })}
      </SideBar>
      <ChatBox>
        <ChatMessagesContainer>
          {chatMessages.map((chat) => {
            if (chat.role == "gpt") {
              return (
                <ChatMessages gpt={true}>
                  <SmallImg src={celeb?.Image} />
                  <Text>{chat.message}</Text>
                </ChatMessages>
              );
            }
            return (
              <ChatMessages gpt={false}>
                {" "}
                <Text>{chat.message}</Text>{" "}
                <DefaultImg>
                  <Image objectFit="cover" alt="avatar" src={avatar} />{" "}
                </DefaultImg>
              </ChatMessages>
            );
          })}
        </ChatMessagesContainer>
        <ChatInput
          placeholder={"insert Message"}
          value={input}
          onChange={handleChange}></ChatInput>
      </ChatBox>
    </ChatContainer>
  );
};

export default Chat;
