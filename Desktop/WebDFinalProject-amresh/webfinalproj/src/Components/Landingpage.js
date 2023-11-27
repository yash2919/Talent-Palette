// Landing.js
import React from "react";
import lan from "../assets/images/Lan.webp";

function Landing() {
  const styles = `
    body {
      margin: 0;
      padding: 0;
      background-color: #121212; /* Dark background color */
      color: #fff; /* Text color */
      font-family: 'Arial', sans-serif;
      padding-top: 20px; /* Added padding on top of the component */
      text-align: center; /* Center-align text */
    }

    .landing-header {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .landing-container {
      display: flex;
    }

    .hero-left {
      flex: 1;
      background-color: #1e1e1e; /* Darker left section background color */
      padding: 40px;
      animation: fadeInLeft 1s ease-in; /* Placeholder animation for fadeInLeft */
      border-radius: 10px; /* Added border-radius for rounded corners */
    }

    .hero-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeInRight 1s ease-in; /* Placeholder animation for fadeInRight */
    }

    .image-container {
      border-radius: 50%; /* Makes the image container a circle */
      overflow: hidden; /* Ensures the image stays within the circular container */
    }

    .image-container img {
      max-width: 100%;
      max-height: 100%;
      border-radius: 50%; /* Makes the image itself a circle */
    }

    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;

  const missionStatement = `
    Our mission is to empower and employ artists worldwide through a revolutionary platform that functions as a 'LinkedIn for Artists.' We envision a space where creative minds can thrive, connect, and showcase their talents to a global audience. By providing a dynamic hub for artists, including painters, dancers, musicians, and more, we aim to bridge the gap between talent and opportunity. Our platform is designed to be a catalyst for professional growth, fostering collaboration and recognition within the artistic community. Join us on this transformative journey as we redefine the way artists connect with audiences and open doors to unparalleled opportunities.
  `;

  return (
    <div>
      <style>{styles}</style>
      <div className="landing-header">Welcome to Talent Palette</div>
      <div className="landing-container">
        <div className="hero-left">
          <h1>Talent Palette</h1>
          <p>{missionStatement}</p>
        </div>

        <div className="flexCenter hero-right">
          <div className="image-container">
            <img src={lan} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
