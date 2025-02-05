import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


export default function SignUp() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();
    if(password !== confirmPassword) {
      return alert("Senhas não conferem!");
    }

    setDisabled(true);
    const dataSingUp = {email: email, name: name, password: password}
    axios.post(`${process.env.REACT_APP_API_URL}/signUp`, dataSingUp) //rota no .env
      .then((res) => {
        setDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        setDisabled(false);
      })
  }

  return(
    <SingUpContainer>
      <form onSubmit={register}>
        <input placeholder="Nome" type="text" value={name} onChange={e => setName(e.target.value)} disabled={disabled} required />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} required/>
        <input placeholder="Senha" minLength={6} type="password" value={password} autocomplete="new-password" onChange={e => setPassword(e.target.value)} disabled={disabled} required />
        <input placeholder="Confirme a senha" type="password" value={confirmPassword} autocomplete="new-password"  onChange={e => setConfirmPassword(e.target.value)} disabled={disabled} required />
        <button type="submit">Cadastrar</button>
      </form>

      <Login to="/">
        Já tem uma conta? Entre agora!
      </Login>
    </SingUpContainer>
  )
}


const SingUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e3fdfd, #ffe6fa);

  form {
    display: flex;
    flex-direction: column;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    width: 340px;
    margin-bottom: 1rem;
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

  a {
    color: #6c63ff;
    text-decoration: none;
    font-weight: bold;
    margin-top: 1rem;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Login = styled(Link)`
  margin-top: 15px;
`
 