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
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import avatar from "../../../public/avatar.png";
import Image from "next/image";
import { AppContext } from "@/Components/AppContext";
import Link from "next/link";
import Error from "@/Components/Error";

interface Celeb {
  id: number;
  Name: string;
  Image: string;
}

type List = Celeb[];

interface message {
  id?: number;
  created_at?: number;
  role: string;
  content: string;
  index?: number;
  cconversation_id?: number;
}

interface Conversation {
  id: number;
  created_at: number;
  name: string;
  model: string;
  cusers_id: number;
  _cmessage_of_cconversation: message[];
}

interface Demo {
  message: {
    role: string;
    content: string;
  };
  celeb: Celeb;
}

interface ErrorAxios {
  errorMessage: string;
  errorPresent: boolean;
}
const Chat = () => {
  const router = useRouter();
  const celebName = router.query.Name;
  const [input, setInput] = useState("");
  const [celeb, setCeleb] = useState<Celeb>();
  const [celebList, setCelebList] = useState<Conversations[]>([]);
  const [chatMessages, setChatMessages] = useState<message[]>([]);
  const [sideButton, setSideButton] = useState(true);
  const [error, setError] = useState<ErrorAxios>({
    errorMessage: "",
    errorPresent: false,
  });
  const { authToken } = useContext(AppContext);

  useEffect(() => {
    const getCeleb = async () => {
      // console.log("test", authToken);
      // console.log();
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
          // console.log("allInfo", allInfo);
          if (allInfo.CurrentConvo.length == 0) {
            // no current convo will start a new one
            //   "system_celeb": "you are impersonating Drake and speak like them"
            // console.log("test", authToken);
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
            // console.log(response.data);
          } else if (allInfo.CurrentConvo.length != 0) {
            // console.log("tes2t", authToken);
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
          // console.log("else", authToken);
          const response = await axios.get(
            `https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/start_conversation_noauth`,
            {
              params: {
                name: celebName,
                system_celeb: "you are impersonating " + celebName,
              },
            }
          );

          const demoInfo: Demo = response.data;
          setChatMessages([demoInfo.message]);
          setCeleb(demoInfo.celeb);
        }
        // console.log("end");
      } catch (error) {
        // console.log("error", error);
        const err = error as AxiosError;

        setError({ errorMessage: err.message, errorPresent: true });
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
      // console.log("continueConvo", continueConvo);
      const UpdatedMessages = [
        continueConvo.data[1],
        continueConvo.data[0],
        ...chatMessages,
      ];
      setChatMessages(UpdatedMessages);
      // console.log("chatMessages", chatMessages);
    } catch (error) {
      // console.log(error);
      const err = error as AxiosError;

      setError({ errorMessage: err.message, errorPresent: true });
    }
  };
  const disableError = () => {
    setError({ errorMessage: "", errorPresent: false });
  };
  return (
    <ChatContainer>
      {error.errorPresent && (
        <Error error={error.errorMessage} disable={disableError}></Error>
      )}
      <SideBar sideButton={sideButton}>
        <SideBarTitle>Previous Chats</SideBarTitle>

        <SideButton sideButton={sideButton} onClick={handleSideBarButton}>
          {sideButton ? ">" : "<"}
        </SideButton>
        {celebList.map((celeb) => {
          return (
            <Link
              key={celeb.name}
              href={`/chat/${celebName}`}
              style={{ width: "90%" }}>
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
                <ChatMessages key={chat.id} gpt={true}>
                  <SmallImg src={celeb?.Image} />
                  <Text>{chat.content}</Text>
                </ChatMessages>
              );
            } else if (chat.role == "user") {
              return (
                <ChatMessages key={chat.id} gpt={false}>
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
            // insert Message
            placeholder={authToken ? "insert Message" : "Log in to continue"}
            value={input}
            onChange={handleChange}
            readOnly={authToken ? false : true}></ChatInput>
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
