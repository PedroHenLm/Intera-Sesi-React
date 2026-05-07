import { useState } from "react";
import { api } from "../../../api/api-config";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
function Cadastro() {
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [confirma, setConfirma] = useState("");
  const [visivel, setVisivel] = useState(false);
  const [visivelconfirma, setVisivelconfirma] = useState(false);

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

      const resposta = await api.post("/cadastro/novo", {
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
      <div className="flex items-center justify-center  h-183 bg-[#cc0000]">
        <div className="flex  justify-around bg-white h-150 w-240 rounded-[50px]">
          <div className=" flex flex-1 mt-3 items-center flex-col">
            <div className="flex flex-col items-center gap-1">
              <img
                className="w-[200px] h-[60px]"
                src="logoSESI.jpg"
                alt="Logo do SESI"
              />
              <p className="text-[15px]">Educação que transforma</p>
              <h2 className=" text-2xl font-bold">SEJA BEM VINDO!</h2>
            </div>
            <div className="flex flex-col w-70 gap-2">
              <h1 className="flex  font-bold">NOME</h1>
              <div className="flex items-center border-2 p-1 rounded-2xl gap-1 ">
                <div className="flex items-center gap-3 ml-2">
                  <FaUser />
                  <input
                    className="outline-none"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
              </div>
              <h1 className="flex justify-start font-bold">EMAIL</h1>
              <div className="flex items-center border-2 p-1 rounded-2xl gap-1">
                <div className="flex items-center gap-3 ml-2">
                  <FaUser />
                  <input
                    className="outline-none"
                    placeholder="info@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <h1 className="flex justify-start font-bold">CRIE UMA SENHA</h1>
              <div className="flex items-center border-2 p-1 rounded-2xl gap-1">
                <div className="flex items-center gap-3 ml-1">
                  <IoIosLock size={20} />
                  <input
                    className="outline-none appearance-none"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha"
                    type={visivel ? "password" : "text"}
                  />
                  {visivel ? (
                    <BsEyeFill
                      color="black"
                      size={20}
                      onClick={() => setVisivel(!visivel)}
                    />
                  ) : (
                    <BsEyeSlashFill
                      color="black"
                      size={20}
                      onClick={() => setVisivel(!visivel)}
                    />
                  )}
                </div>
              </div>
              <h1 className="flex justify-start font-bold">CONFIRME A SENHA</h1>
              <div className="flex items-center border-2 p-1 rounded-2xl gap-1">
                <div className="flex items-center gap-3 ml-1">
                  <IoIosLock size={20} />
                  <input
                    className="outline-none appearance-none"
                    value={confirma}
                    onChange={(e) => setConfirma(e.target.value)}
                    placeholder="Confirme sua senha"
                    type={visivelconfirma ? "password" : "text"}
                  />
                  {visivelconfirma ? (
                    <BsEyeFill
                      color="black"
                      size={20}
                      onClick={() => setVisivelconfirma(!visivelconfirma)}
                    />
                  ) : (
                    <BsEyeSlashFill
                      color="black"
                      size={20}
                      onClick={() => setVisivelconfirma(!visivelconfirma)}
                    />
                  )}
                </div>
              </div>
              <h1 className="font-bold">Selecione seu Cargo</h1>
              <select
                onChange={(e) => setCargo(e.target.value)}
                className="border-2 p-0.5"
              >
                <option value=""></option>
                <option value="Professor">Professor</option>
                <option value="Secretaria">Secretaria</option>
                <option value="Secretaria">Inspetor</option>
                <option value="Secretaria">Cozinha</option>
              </select>
            </div>
            <button
              className="bg-[#cc0000] w-[250px] h-[40px] border-none rounded-[50px] text-white mt-5 font-bold"
              onClick={Cadastrar}
            >
              Cadastrar
            </button>

            <div className="flex gap-1 mt-3">
              <p>Já possui uma conta?</p>
              <Link className="text-red-600" to={"/login"}>
                Click aqui
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center m-15 bg-[#cc0000] rounded-[50px] w-[450px] h-[435px] ">
              <img
                className="flex w-[450px] h-[435px]  rounded-[50px] opacity-[0.6] mr-6"
                src="imagemEsquerda.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
