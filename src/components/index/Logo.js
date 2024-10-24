import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import elote from "../../assets/Images/logo.png";

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;

  width: 100%;
  color: ${(props) => props.theme.text};
  z-index: 5;

  a {
    display: flex;
    align-items: flex-end;
  }

  svg {
    width: 4rem;
    height: auto;
    overflow: visible;
    stroke-linejoin: round;
    stroke-linecap: round;

    g {
      path {
        stroke: ${(props) => props.theme.text};
      }
    }
  }
`;

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.text};
  padding-bottom: 0.5rem;
`;

const textVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: -5,

    transition: {
      duration: 2, // 2
      delay: 5,
      ease: "easeInOut",
    },
  },
};

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,

    transition: {
      duration: 2,
      delay: 3,
      ease: "easeInOut",
    },
  },
};

const Logo = () => {
  return (
    <Container>
      <Link to="/">
        <img 
          src={elote} 
          alt="Logo"
          width="100" 
          height="100"
        />
        <Text variants={textVariants} initial="hidden" animate="visible">
          Aj Arin
        </Text>
      </Link>
    </Container>
  );
};


export default Logo;
