import { Button } from "@/Components/Button";
import {
  AccountContainer,
  AccountForm,
  AccountInput,
  AccountInputTitle,
} from "./AccountStyles";
import { useState } from "react";

interface Account {
  email: string;
  password: string;
}

const LogIn = () => {
  const [accountInfo, setAccountInfo] = useState<Account>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInfo((prev) => ({ ...prev, [e.target.type]: e.target.value }));
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("test");
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

export default LogIn;
