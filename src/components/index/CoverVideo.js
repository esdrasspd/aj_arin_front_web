import React from "react";
import styled from "styled-components";
import MainVideo from "../../assets/trabajadores.mp4";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const VideoContainer = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;

  video {
    width: 100%;
    height: 100vh;
    object-fit: cover;

    @media (max-width: 48em) {
      object-position: center 10%;
    }
  }
  @media (max-width: 30em) {
    object-position: center 50%;
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;

  background-color: ${(props) => `rgba(${props.theme.bodyRgba},0.6)`};
`;

const Title = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text};

  div {
    display: flex;
    flex-direction: row;
  }

  h1 {
    font-family: "Kaushan Script";
    font-size: ${(props) => props.theme.fontBig};
    text-shadow: 1px 1px 1px ${(props) => props.theme.body};

    @media (max-width: 30em) {
      font-size: calc(5rem + 8vw);
    }
  }
  h2 {
    font-family: "Sirin Stencil";
    font-size: ${(props) => props.theme.fontlg};
    text-shadow: 1px 1px 1px ${(props) => props.theme.body};
    font-weight: 300;
    text-transform: capitalize;

    @media (max-width: 30em) {
      font-size: ${(props) => props.theme.fontmd};
      margin-top: -1.5rem;
    }
  }
`;

const LoginButton = styled(motion.button)`
  font-size: ${(props) => props.theme.fontmd};
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.textHover};
  }
`;

const container = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,

    transition: {
      delayChildren: 5,
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const CoverVideo = () => {
  const navigate = useNavigate(); // Usa el hook useNavigate

  const handleLoginClick = () => {
    navigate("/login"); // Redirige a la ruta de login
  };
  return (
    <VideoContainer>
      <DarkOverlay />
      <Title variants={container} initial="hidden" animate="show">
        <div>
          <motion.h1 variants={item} data-scroll data-scroll-delay="0.13" data-scroll-speed="4">
            A
          </motion.h1>
          <motion.h1 variants={item} data-scroll data-scroll-delay="0.09" data-scroll-speed="4">
            j
          </motion.h1>
          <motion.h1 variants={item} data-scroll data-scroll-delay="0.06" data-scroll-speed="4">
              
          </motion.h1>
          <motion.h1 variants={item} data-scroll data-scroll-delay="0.04" data-scroll-speed="4">
             A
          </motion.h1>
          <motion.h1 variants={item} data-scroll data-scroll-delay="0.04" data-scroll-speed="4">
            r
          </motion.h1>
          <motion.h1 variants={item} data-scroll data-scroll-delay="0.04" data-scroll-speed="4">
            i
          </motion.h1>
          <motion.h1 variants={item} data-scroll data-scroll-delay="0.04" data-scroll-speed="4">
            n
          </motion.h1>
        </div>
        <motion.h2 variants={item} data-scroll data-scroll-delay="0.04" data-scroll-speed="2">
          Realiza reportes fácilmente: Carreteras, tuberías, basureros, otros.
        </motion.h2>
        <br></br>
        <br></br>
        <LoginButton
          variants={item}
          data-scroll
          data-scroll-delay="0.04"
          data-scroll-speed="2"
          onClick={handleLoginClick}
        >
          Iniciar sesión
        </LoginButton>
      </Title>
      <video src={MainVideo} type="video/mp4" autoPlay muted loop />
    </VideoContainer>
  );
};

export default CoverVideo;
