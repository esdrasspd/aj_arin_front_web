import React, { Suspense } from "react";
import styled from "styled-components";

const CoverVideo = React.lazy(() => import("../../components/index/CoverVideo"));
const NavBar = React.lazy(() => import("../../components/index/NavBar"));
const Logo = React.lazy(() => import("../../components/index/Logo"));

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

const Home = () => {
  return (
    <Section id="home">
      <Suspense fallback={<></>}>
        <Logo />
        <NavBar />
        <CoverVideo />
      </Suspense>
    </Section>
  );
};

export default Home;
