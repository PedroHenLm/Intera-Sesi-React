import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  async function Enviar() {
    try {
      const resposta = await axios.post("http://192.168.1.18:3000/login", {
        email,
        senha,
      });
      resposta.status == 200 ? navigate("/home") : alert("Errro ao logar");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div>
        <img src="logoSESI.jpg" alt="" />
        <p>Educação que transforma</p>
        <h2>SEJA BEM VINDO!</h2>
      </div>
      <div>
        <h1>LOGIN</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=""
        />
        <h1>SENHA</h1>
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder=""
        />
      </div>
      <button onClick={()=>Enviar()}>ENTRAR</button>
      <p>Não tem uma conta?</p>
      <Link to={"/cadastrar"}>CADASTRE-SE</Link>
      <img src="imagemEsquerda.jpg" alt="" />
    </>
  );
}
export default Login;
