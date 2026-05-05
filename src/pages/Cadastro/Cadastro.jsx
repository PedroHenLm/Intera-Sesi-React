import { useState } from "react";
import { api } from "../../../api/axios-config";

function Cadastro() {
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [confirma, setConfirma] = useState("");

  async function Cadastrar() {
    try {
      if (!senha || !email || !confirma || !nome || !cargo) {
        alert("Nenhum campo deve permanecer vazio");
        return;
      }

      if (senha.length < 8) {
        alert("Senha deve conter ao menos 8 caracteres");
        return;
      }

      if (senha !== confirma) {
        alert("Senhas não coincidem");
        return;
      }

      const resposta =  await api.post("/cadastro/novo", {
        senha,
        nome,
        email,
        cargo,
      });
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <>
      <div>
        <img src="logoSESI.jpg" alt="" />
        <p>Educação que transforma</p>
        <h2>SEJA BEM VINDO!</h2>
      </div>
      <h1>NOME</h1>
      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <h1>EMAIL</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h1>CRIE UMA SENHA</h1>
      <input
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <h1>CONFIRME A SENHA</h1>
      <input
        placeholder="Confirmar senha"
        value={confirma}
        onChange={(e) => setConfirma(e.target.value)}
      />
      <h1>Selecione seu cargo</h1>
      <select onChange={(e) => setCargo(e.target.value)}>
        <option value="">Selecione</option>
        <option value="Professor">Professor</option>
        <option value="Secretaria">Secretaria</option>
      </select>

      <button onClick={Cadastrar}>Cadastrar</button>
      <div>
        <img src="imagemEsquerda.jpg" alt="" />
      </div>
    </>
  );
}

export default Cadastro;