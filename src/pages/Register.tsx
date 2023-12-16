import { Button } from "@/Components/Button";
import {
  AccountContainer,
  AccountForm,
  AccountInput,
  AccountInputTitle,
} from "../Components/LoginRegisterStyles/AccountStyles";
import { useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import { AppContext } from "@/Components/AppContext";
import { useRouter } from "next/navigation";
import Error from "@/Components/Error";

interface Account {
  email: string;
  password: string;
}

interface ErrorAxios {
  errorMessage: string;
  errorPresent: boolean;
}


const Register = () => {
  const [accountInfo, setAccountInfo] = useState<Account>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<ErrorAxios>({
    errorMessage: "",
    errorPresent: false,
  });

  const router = useRouter();
  const app = useContext(AppContext);
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
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const disableError = () => {
    setError({ errorMessage: "", errorPresent: false });
  };
  return (
    <AccountContainer>
      {error.errorPresent && (
      <Error error={error.errorMessage} disable={disableError}></Error>
    )}
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
