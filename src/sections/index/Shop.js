import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styled from "styled-components";
import { useRef } from "react";

const Section = styled.section`
  min-height: 100vh;
  height: auto;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  text-shadow: 1px 1px 1px ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  position: absolute;
  top: 1rem;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Left = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 80%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: ${(props) => props.theme.fontlg};
    margin-bottom: 0.5rem;
  }

  input {
    font-size: ${(props) => props.theme.fontmd};
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid ${(props) => props.theme.text};
    border-radius: 4px;
  }

  button {
    font-size: ${(props) => props.theme.fontmd};
    padding: 0.75rem;
    background-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.textHover};
    }
  }

  @media (max-width: 64em) {
    label, input, button {
      font-size: ${(props) => props.theme.fontmd};
    }
  }

  @media (max-width: 48em) {
    form {
      width: 90%;
    }
    label, input, button {
      font-size: ${(props) => props.theme.fontsm};
    }
  }

  @media (max-width: 30em) {
    label, input, button {
      font-size: ${(props) => props.theme.fontxs};
    }
  }
`;

const Shop = () => {
  gsap.registerPlugin(ScrollTrigger);

  const ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, usando fetch o axios para enviar los datos a un servidor.
    alert("Formulario enviado");
  };

  return (
    <Section ref={ref} id="contact">
      <Title data-scroll data-scroll-speed="-1">
        Contáctanos
      </Title>
      <Left>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="phone">Número de Celular</label>
          <input type="tel" id="phone" name="phone" required />

          <br></br>

          <button type="submit">Enviar</button>
        </form>
      </Left>
    </Section>
  );
};

export default Shop;
