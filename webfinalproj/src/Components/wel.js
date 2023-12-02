import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/images/Lan.webp";
import image2 from "../assets/images/dancers.jpg";
import image3 from "../assets/images/artist.jpg";
import image4 from "../assets/images/hire_musician.jpg";
import image5 from "../assets/images/paint.jpeg";
import image6 from "../assets/images/sing.jpg";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #121212;
  color: #ffffff;
  overflow: hidden;
`;

const Main = styled.div`
  display: flex;
  flex: 1;
  transition: transform 1s ease;
`;

const LeftSection = styled.div`
  flex: 0.7;
  position: relative;
  overflow: hidden;
  max-width: 70%;
`;

const ImageContainer = styled.div`
  display: flex;
  transition: transform 1s ease;
  width: ${(props) => `${props.totalimages * 100}%`};
  transform: translateX(
    ${(props) => `-${(props.currentindex / props.totalimages) * 100}%`}
  );
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Content30 = styled.div`
  flex: 0.3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  color: #ffffff;
  text-align: center;
  animation: ${fadeIn} 2s forwards;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const CtaButton = styled.button`
  margin: 10px;
  padding: 15px 30px;
  font-size: 16px;
  width: 200px;
  background: linear-gradient(to right, #61dafb, #4fa3d1);
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const Footer = styled.footer`
  padding: 1em;
  text-align: center;
  background-color: #333;
`;

const images = [image1, image2, image3, image4, image5, image6];

const WelApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchUserEmail() {
      try {
          const response = await fetch('http://localhost:3000', {
            method: 'GET',
            credentials: 'include', // Send cookies with the request
          });
      
          if (response.ok ) {
            const data = await response.json();
            console.log(data.email); // Handle email data as needed
            
            if(data.email!=null)
           navigate("/home");
          else{
            //
          }
          

          } else {
            throw new Error('Failed to fetch email');
          }
        } catch (error) {
          console.error('Error fetching email:', error);
          // Handle errors
        }
  }
  

   fetchUserEmail();




    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <AppWrapper>
      <Main>
        <LeftSection>
          <ImageContainer
            totalimages={images.length}
            currentindex={currentIndex}
          >
            {images.map((image, index) => (
              <Image key={index} src={image} alt={`Image ${index}`} />
            ))}
          </ImageContainer>
        </LeftSection>

        <Content30>
          <h2
            style={{
              fontFamily: "cursive",
              fontSize: "2em",
              marginBottom: "10px",
            }}
          >
            Welcome to Talent Palette
          </h2>
          <p style={{ fontSize: "1.2em" }}>
            Your go-to platform for exploring and showcasing talent!
          </p>
          <ButtonContainer>
            <CtaButton onClick={handleLogin}>Login</CtaButton>
            <CtaButton onClick={handleSignup}>SignUp</CtaButton>
          </ButtonContainer>
        </Content30>
      </Main>
    </AppWrapper>
  );
};

export default WelApp;
