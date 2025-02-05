import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate()


  function login(event) {
    event.preventDefault();
    setDisabled(true);
    const user = {email: email, password: password};
    axios.post(`${process.env.REACT_APP_API_URL}/signIn`, user) // Passar a rota lá no .env
      .then((res) => {
        console.log(res.data);
        if(res.data.statusCode === 404) return console.log("E-mail não cadastrado!");
        setDisabled(false);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
        setDisabled(false);
      })
  }

  return(
    <>
      <SingInContainer>
        <form onSubmit={login}>
          <input placeholder="E-mail" type="email" value={email} disabled={disabled} onChange={e => setEmail(e.target.value)} required/>
          <input placeholder="Senha" type="password" value={password} autocomplete="new-password"  disabled={disabled} onChange={e => setPassword(e.target.value)} required/>
          <button type="submit">Entrar</button>
        </form>
      </SingInContainer>    
    </>
  )
}

const SingInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);

  form {
    display: flex;
    flex-direction: column;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    width: 320px;
  }

  input {
    margin-bottom: 1rem;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  input:focus {
    border-color: #6c63ff;
    outline: none;
  }

  button {
    padding: 12px;
    font-size: 16px;
    color: white;
    background-color: #6c63ff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #4d44fa;
  }
`;