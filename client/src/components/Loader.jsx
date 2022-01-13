import React from "react";
import styled from "styled-components";

const Loader = (props) => {
  if (props.pastDelay)
    return (
      <Container>
        <Spinner></Spinner>
      </Container>
    );
  else return null;
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  background-color: transparent;
`;

const Spinner = styled.div`
  height: 100px;
  width: 100px;
  border: 16px solid rgb(243, 243, 243);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 16px solid #0172b8;

  animation: spin 1.5s ease-in-out infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
