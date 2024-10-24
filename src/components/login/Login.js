import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { apiURL} from '../../config/apiConfig';
import {jwtDecode} from 'jwt-decode';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f7f7f7, #e0e0e0);
  padding: 20px;
`;

const FormWrapper = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

const ErrorMessage = styled.div`
  color: #d9534f;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  font-family: 'Arial', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(38, 143, 255, 0.2);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const api = apiURL + '/loginWeb';

    try {
      const response = await axios.post(api, {
        Dpi: userName,
        Password: password
      });

      console.log('Datos enviados:', { UserName: userName, Password: password });

      if (response.data.code === '200') {
        console.log('Login exitoso:', response.data);

        const token = response.data.message;
        const decoded = jwtDecode(token);

        const name = decoded.name;
        const dpi = decoded.dpi;

        localStorage.setItem('name', name);
        localStorage.setItem('dpi', dpi);
        
        // Redirige al dashboard
        navigate('/dashboard');
      } else {
        throw new Error(response.data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      
      <FormWrapper>
        <Title>Iniciar Sesión</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleLogin}>
          <FormGroup>
            <Label>DPI</Label>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Contraseña</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </SubmitButton>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default Login;
