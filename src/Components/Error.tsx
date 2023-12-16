import styled from "@emotion/styled";

const ErrorContainer = styled.div`
  background-color: red;
  z-index: 10;
  position: fixed;
  color: black;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  border-radius: 2rem;
`;

const Error = ({ error,disable }: { error: string,disable: ()=> void }) => {
    const disableError = () => {
        disable()
    }
  return <ErrorContainer onClick={disableError}>{error}</ErrorContainer>;
};

export default Error;
