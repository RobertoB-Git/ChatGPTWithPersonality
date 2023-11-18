import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface Context {
  user?: {};
  // setUser?: Dispatch<SetStateAction<string>>
  authToken?: string | null;
}

export const AppContext = createContext<Context>({});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState("user1");
  const [authToken, setAuthToken] = useState<string | null>(null);

  const authUserWithToken = async (token: string) => {
    try {
      const responseLogin = await axios.get(
        "https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/auth/me",
        { headers: { Authorization: "Bearer " + token } }
      );
      setUser(responseLogin.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    console.log(authToken);
    setAuthToken(authToken);
    if (authToken != null) {
      authUserWithToken(authToken);
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, authToken }}>
      {children}
    </AppContext.Provider>
  );
};

export default UserProvider;
