import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation'; // Import TypeAnimation

// Styled components for structured and styled elements
const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #121212;
  color: #ffffff;
  overflow: hidden;
`;

const Main = styled.div`
  display: flex;
  width: 100%;
`;

const LeftSection = styled.div`
  flex: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #191970;
  padding: 20px; 
  position: relative; 
`;

const Logo = styled.div`
font-size: 2em; /* Font size for the logo */
color: #ffffff;
margin-bottom: 20px; /* Add margin for spacing */
position: absolute;
top: 20px; /* Adjust top position as needed */
left: 20px; /* Adjust left position as needed */
`;
const RightSection = styled.div`
flex: 0.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #483d8b;
  font-size : 2em;
`;
const Content30 = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #483d8b;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const CtaButton = styled.button`
  padding: 10px 60px;
  font-size: 1rem;
  background: linear-gradient(to right, #61dafb, #4fa3d1);
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

// Welcome Application Component
const WelApp = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');

  return (
    <AppWrapper>
      <Main>
        <LeftSection>
        <Logo>Talent Palette</Logo> {/* Add the heading text here */}
          {/* Use TypeAnimation component to create typed animation */}
          <TypeAnimation
            sequence={[
              'Welcome to Talent Palette',
              'Discover and share your unique talents with the world!',
              'Your Unique journey begins here!'
            ]}
            speed={200} // Typing speed in ms
            style={{ fontSize: '3em', color: '#61dafb' }}
            repeat={Infinity}
          />
        </LeftSection>
        <Content30>
        <RightSection>
             Welcome!
          <ButtonContainer>
            <CtaButton onClick={handleLogin}>Login</CtaButton>
            <CtaButton onClick={handleSignup}>SignUp</CtaButton>
          </ButtonContainer>
          </RightSection>
        </Content30>
      </Main>
    </AppWrapper>
  );
};

export default WelApp;
