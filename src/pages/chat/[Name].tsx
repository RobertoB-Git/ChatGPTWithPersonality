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
  FormContainer,
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
  const [chatMessages, setChatMessages] = useState<message[]>([]);
  const [sideButton, setSideButton] = useState(true);

  const { authToken } = useContext(AppContext);
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

        const allConvos: Conversation[] = allConversations.data;
        console.log(allConvos);
        const currentConvoExist = allConvos.find(
          (convo) => convo.name == router.query.Name
        );
        console.log("currentConvoExist", currentConvoExist);

        if (currentConvoExist == undefined) {
          const startConvo = await axios.get(
            "https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/start_conversation",
            {
              headers: { Authorization: "Bearer " + authToken },
              params: {
                system_celeb:
                  "You are impersonating " + router.query.Name + " and speak like them",
                name: router.query.Name,
              },
            }
          );

          console.log("startConvo", startConvo);
        } else {
          setChatMessages(
            currentConvoExist._cmessage_of_cconversation.reverse()
          );
        }

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

  const onSubmitChat = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    

    try {
      const continueConvo = await axios.get(
        "https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/continue_conversation",
        {
          headers: { Authorization: "Bearer " + authToken },
          params: {
            Cconversation_id: chatMessages[0].cconversation_id,
            message: input,
          },
        }
      );
      console.log('continueConvo',continueConvo);
      setChatMessages(oldMessages => [...oldMessages,continueConvo.data[0],continueConvo.data[1]])
      console.log('chatMessages',chatMessages)
    } catch (error) {
      console.log(error);
    }
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
            if (chat.role == "assistant") {
              return (
                <ChatMessages gpt={true}>
                  <SmallImg src={celeb?.Image} />
                  <Text>{chat.content}</Text>
                </ChatMessages>
              );
            } else if (chat.role == "user") {
              return (
                <ChatMessages gpt={false}>
                  {" "}
                  <Text>{chat.content}</Text>{" "}
                  <DefaultImg>
                    <Image objectFit="cover" alt="avatar" src={avatar} />{" "}
                  </DefaultImg>
                </ChatMessages>
              );
            }
          })}
        </ChatMessagesContainer>
        <FormContainer onSubmit={onSubmitChat}>
          <ChatInput
            placeholder={"insert Message"}
            value={input}
            onChange={handleChange}></ChatInput>
        </FormContainer>
      </ChatBox>
    </ChatContainer>
  );
};

export default Chat;
