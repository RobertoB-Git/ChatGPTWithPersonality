import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  created_at: number;
  email: string;
  id: number;
}

interface Context {
  user: User | null;
  authToken?: string | null;
  logOut: () => void;
  authUserWithToken: (token: string) => void;
}

export const AppContext = createContext<Context>({
  user: null,
  logOut: () => {},
  authUserWithToken() {}, // melhor forma de fazer isto
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const authUserWithToken = async (token: string) => {
    try {
      const responseLogin = await axios.get(
        "https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/auth/me",
        { headers: { Authorization: "Bearer " + token } }
      );
      setUser(responseLogin.data);
      setAuthToken(token);
      document.cookie = `authToken=${token}; expires=` + new Date(2023,12,15).toUTCString() 

    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    // localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken != null) {
      authUserWithToken(authToken);
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, authToken, logOut, authUserWithToken }}>
      {children}
    </AppContext.Provider>
  );
};

export default UserProvider;
