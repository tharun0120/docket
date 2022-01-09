import React from "react";
import styled from "styled-components";
import aboutBackground from "./images/about.svg";
import { FaGithub, FaReact } from "react-icons/fa";
import { DiNodejs, DiMongodb } from "react-icons/di";

const About = () => {
  return (
    <Container>
      <AboutContainer>
        <GithubIcon>
          <a href="fda" rel="noreferrer" target="_blank">
            <FaGithub
              style={{
                cursor: "pointer",
                color: "black",
                fontSize: "100px",
              }}
            />
          </a>
        </GithubIcon>
      </AboutContainer>
      <Footer>
        <LineUp>
          <DiMongodb
            style={{
              cursor: "pointer",
              fontSize: "150px",
              color: "green",
            }}
          />
          <span
            style={{
              cursor: "pointer",
              fontSize: "45px",
              color: "#222831",
            }}>
            express.js
          </span>
          <FaReact
            style={{
              cursor: "pointer",
              fontSize: "150px",
              color: "#61DBFB",
            }}
          />
          <DiNodejs
            style={{
              cursor: "pointer",
              fontSize: "150px",
              color: "#3c873a",
            }}
          />
        </LineUp>
        <span
          style={{
            paddingTop: "20px",
            fontSize: "30px",
            textAlign: "center",
            width: "100%",
            fontFamily: "Montserrat",
          }}>
          Made with 🧡 by{" "}
          <a
            href="https://www.tharunkumar.tech"
            target="_blank"
            style={{
              backgroundColor: "orange",
              textDecoration: "none",
              padding: "2px",
              color: "black",
              borderRadius: "5px",
            }}
            rel="noreferrer">
            Tharun Kumar.
          </a>
        </span>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  /* height: calc(100vh - 100px); */
  /* background-color: white; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const AboutContainer = styled.div`
  /* margin-top: 200px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* background: url(${aboutBackground});
  background-repeat: no-repeat;
  background-size: cover; */

  span {
    font-size: 42px;
  }
`;

const GithubIcon = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const LineUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  /* margin-top: 150px; */
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.8);
`;

export default About;
