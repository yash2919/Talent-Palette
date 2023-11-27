import React, { useState, useEffect } from "react";
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";
import image1 from "../assets/images/Lan.webp";
import image2 from "../assets/images/dancers.jpg";
import image3 from "../assets/images/artist.jpg";
import image4 from "../assets/images/hire_musician.jpg";
import image5 from "../assets/images/paint.jpeg";
import image6 from "../assets/images/sing.jpg";
import styled from "styled-components";
import SignUpForm from "./Signup";
import Login from "./Login";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212; /* Dark background color */
  color: #ffffff; /* Text color */
`;

const Header = styled.header`
  padding: 1em;
  text-align: center;
  background-color: #333; /* Header background color */
`;

const Main = styled.div`
  display: flex;
  flex: 1;
`;

const LeftSection = styled.div`
  flex: 0.7;
  position: relative;
  overflow: hidden;
  max-width: 70%; /* Set a fixed width for the LeftSection */
`;

const ImageContainer = styled.div`
  display: flex;
  transition: transform 1s ease; /* Slower transition for shuffling */
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover; /* Maintain aspect ratio while covering the container */
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1; /* Ensure text is on top of images */
  text-align: center;
  color: #61dafb; /* Text color for overlay */
`;

const Content30 = styled.div`
  flex: 0.3;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a; /* Dark background color for right section */
  color: #ffffff; /* Text color for right section */
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const CtaButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #61dafb; /* Button background color */
  color: #ffffff; /* Button text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.5s ease; /* Slightly faster transition on hover */

  &:hover {
    background-color: #4fa3d1; /* Button background color on hover */
  }
`;

const Footer = styled.footer`
  padding: 1em;
  text-align: center;
  background-color: #333; /* Footer background color */
`;

const images = [image1, image2, image3, image4, image5, image6];

const WelApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); /* Slower interval for a more relaxed transition */

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <AppWrapper>
      <Header>
        <h1>Talent Palette</h1>
      </Header>

      <Main>
        <LeftSection>
          <ImageContainer
            style={{ transform: `translateX(${-currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <Image key={index} src={image} alt={`Image ${index}`} />
            ))}
          </ImageContainer>
          <TextOverlay>
            <h2>Welcome to Talent Palette</h2>
            <p>Your go-to platform for exploring and showcasing talent!</p>
          </TextOverlay>
        </LeftSection>

        <Content30>
          <ButtonContainer>
            <CtaButton>Login</CtaButton>
            <CtaButton>SignUp</CtaButton>
          </ButtonContainer>
        </Content30>
      </Main>

      <Footer>
        <p>&copy; 2023 Talent Palette. All rights reserved.</p>
      </Footer>
    </AppWrapper>
  );
};

export {
  AppWrapper,
  Header,
  Main,
  LeftSection,
  Content30,
  ButtonContainer,
  CtaButton,
  Footer,
};

export default WelApp;
