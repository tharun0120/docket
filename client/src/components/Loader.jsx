import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <Container>
      <Spinner></Spinner>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: rgba(0, 0, 0, 0.8); */
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
