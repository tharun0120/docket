import React from "react";
import styled from "styled-components";
import Overview from "./Overview";
import TaskBar from "./TaskBar";
function MainContent() {
  return (
    <Container>
      <Overview />
      <TaskBar />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  align-items: start;
  justify-content: space-around;
  width: 100%;
  padding-top: 30px;
`;

export default MainContent;
