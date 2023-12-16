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
import Link from "next/link";

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
  const celebName = router.query.Name;
  const [input, setInput] = useState("");
  const [celeb, setCeleb] = useState<Celeb>();
  const [celebList, setCelebList] = useState<Conversations[]>([]);
  const [chatMessages, setChatMessages] = useState<message[]>([]);
  const [sideButton, setSideButton] = useState(true);

  const { authToken } = useContext(AppContext);

  useEffect(() => {
    const getCeleb = async () => {
      console.log("test");
      try {
        if (authToken) {
          // load all convos from user
          const response = await axios.get(
            `https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/LoadallConvosandCelebs`,
            {
              headers: { Authorization: "Bearer " + authToken },
              params: {
                name: celebName,
              },
            }
          );

          const allInfo: LoadAll = response.data;
          console.log("allInfo", allInfo);
          if (allInfo.CurrentConvo.length == 0) {
            // no current convo will start a new one
            //   "system_celeb": "you are impersonating Drake and speak like them"

            const response = await axios.get(
              `https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/start_conversation`,
              {
                headers: { Authorization: "Bearer " + authToken },
                params: {
                  name: celebName,
                  system_celeb: "you are impersonating " + celebName,
                },
              }
            );

            const chat: message[] = [response.data.message];
            const celeb: Conversations = response.data.celeb;
            setChatMessages(chat);
            setCeleb(celeb.CelebInfo);
            setCelebList([celeb]);
            console.log(response.data);
          } else if (allInfo.CurrentConvo.length != 0) {
            setChatMessages(
              allInfo.CurrentConvo[0]._cmessage_of_cconversation.reverse()
            );
            const currentCeleb: Conversations = allInfo.AllConvos.find(
              (currentCeleb) => currentCeleb.name == celebName
            )!;
            setCeleb(currentCeleb.CelebInfo);
            setCelebList(allInfo.AllConvos);
          }
          // setChatMessages(
          //   allInfo.CurrentConvo[0]._cmessage_of_cconversation.reverse()
          // );
        } else {
          console.log("else", authToken);
          // const response = await axios.get(
          //   `https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/ccelebs`
          // );
          // const userChats = response.data;
        }
        console.log("end");
      } catch (error) {
        console.log("error", error);
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
      console.log("continueConvo", continueConvo);
      const UpdatedMessages = [
        continueConvo.data[1],
        continueConvo.data[0],
        ...chatMessages,
      ];
      setChatMessages(UpdatedMessages);
      console.log("chatMessages", chatMessages);
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
            <Link href={`/chat/${celebName}`} style={{width: "90%"}}>
            <SideBarItems>
              
              <SmallImg src={celeb.CelebInfo.Image}></SmallImg>
              {celeb.CelebInfo.Name}
              
            </SideBarItems>
            </Link>
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

interface Conversations {
  id: number;
  created_at: number;
  name: string;
  model: string;
  cusers_id: number;
  ccelebs_id: number;
  CelebInfo: {
    id: number;
    created_at: number;
    Name: string;
    Image: string;
  };
}

interface ConversationError {
  code: string;
  message: string;
}

interface LoadAll {
  AllConvos: Conversations[];
  CurrentConvo: Conversation[];
}

// This gets called on every request
// nao consiguo dar load pq preciso do authtoken tentei com cookies tb
// export async function getServerSideProps() {
//   // Fetch data from external API

//   const { authToken } = useContext(AppContext);
//   const router = useRouter();
//   const celebName = router.query.Name;

//   if (authToken) {
//     // load all convos from user
//     const response = await axios.get(
//       `https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/LoadallConvosandCelebs`,
//       {
//         headers: { Authorization: "Bearer " + authToken },
//         params: {
//           name: celebName,
//         },
//       }
//     );

//     const allInfo: LoadAll = response.data;
//     return { props: { allInfo } };
//   } else {
//     const response = await axios.get(
//       `https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/ccelebs`
//     );
//     const userChats = response.data;

//     return { props: { userChats } };
//   }

//   // Pass data to the page via props
// }
