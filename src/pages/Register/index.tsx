import { Button } from "@/Components/Button";
import {
  AccountContainer,
  AccountForm,
  AccountInput,
  AccountInputTitle,
} from "../Login/AccountStyles";
import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "@/Components/AppContext";

interface Account {
  email: string;
  password: string;
}

const Register = () => {
  const [accountInfo, setAccountInfo] = useState<Account>({
    email: "",
    password: "",
  });

  const app = useContext(AppContext)
  console.log(app.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInfo((prev) => ({ ...prev, [e.target.type]: e.target.value }));
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/auth/signup",
        { email: accountInfo.email, password: accountInfo.password }
      );

      localStorage.setItem("authToken", response.data.authToken);
      app.authUserWithToken(response.data.authToken);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AccountContainer>
      <AccountForm onSubmit={submit}>
        <AccountInputTitle>Email</AccountInputTitle>
        <AccountInput
          type="email"
          onChange={handleChange}
          value={accountInfo.email}></AccountInput>
        <AccountInputTitle>Password</AccountInputTitle>
        <AccountInput
          type="password"
          onChange={handleChange}
          value={accountInfo.password}></AccountInput>
        <div>
          <Button>Submit</Button>
        </div>
      </AccountForm>
    </AccountContainer>
  );
};

export default Register;
