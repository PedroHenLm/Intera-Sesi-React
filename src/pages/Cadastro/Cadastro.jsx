import { useState, useEffect } from "react";
import { api } from "../../../api/api-config";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [cargo, setCargo] = useState("");
  const [visivel, setVisivel] = useState(false);
  const [visivelconfirma, setVisivelconfirma] = useState(false);

  const [isNomeValid, setIsNomeValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSenhaValid, setIsSenhaValid] = useState(true);
  const [isConfirmaValid, setIsConfirmaValid] = useState(true);
  const [isCargoValid, setIsCargoValid] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const senhaRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])^[\x21-\x7e]{8,255}$/;

  function validarNome(texto) {
    setNome(texto);
    setIsNomeValid(texto.trim().length >= 3 || texto === "");
  }

  useEffect(() => {
    setIsEmailValid(emailRegex.test(email) || email === "");
  }, [email]);

  function validarSenha(texto) {
    setSenha(texto);
    setIsSenhaValid(senhaRegex.test(texto));
  }

  function validarConfirma(texto) {
    setConfirma(texto);
    setIsConfirmaValid(texto === senha || texto === "");
  }

  function validarCargo(texto) {
    setCargo(texto);
    setIsCargoValid(texto !== "");
  }

  useEffect(() => {
    setIsConfirmaValid(confirma === senha || confirma === "");
  }, [senha, confirma]);

  async function Cadastrar() {
    if (
      !nome ||
      !email ||
      !senha ||
      !confirma ||
      !cargo ||
      !isNomeValid ||
      !isEmailValid ||
      !isSenhaValid ||
      !isConfirmaValid ||
      !isCargoValid
    ) {
      alert("Preencha os campos corretamente");
      return;
    }
    try {
      const resposta = await api.post("/cadastro/novo", {
        senha,
        nome,
        email,
        cargo,
      });

      if (resposta.status == 200) {
        alert("Cadastrado com sucesso");
        return navigate("/login");
      } else {
        alert("Erro ao cadastrar");
      }
    } catch (erro) {
      if (erro.status == 404) {
        alert("Email já cadastrado");
        return;
      }
      console.log(erro);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center bg-[#cc0000] py-10">
        <div className="flex justify-around bg-white  w-240 rounded-[50px]">
          <div className="flex flex-1 mt-3 items-center flex-col mb-6">
            <div className="flex flex-col items-center gap-1">
              <img
                className="w-50 h-15"
                src="logoSESI.jpg"
                alt="Logo do SESI"
              />
              <p className="text-[15px]">Educação que transforma</p>
              <h2 className="text-2xl font-bold">SEJA BEM VINDO!</h2>
            </div>

            <div className="flex flex-col w-70 gap-2">
              <h1 className="font-bold">NOME</h1>
              <div className="flex flex-col gap-1">
                <div
                  className={`flex items-center border-2 p-2 rounded-2xl ${
                    !isNomeValid ? "border-red-600" : "border-black"
                  }`}
                >
                  <div className="flex items-center gap-3 ml-2 w-full">
                    <FaUser />
                    <input
                      className="outline-none w-full"
                      placeholder="Seu nome completo"
                      value={nome}
                      onChange={(e) => validarNome(e.target.value)}
                    />
                  </div>
                </div>
                <div className="min-h-3.75">
                  {!isNomeValid && (
                    <span className="text-red-600 text-xs">
                      Nome deve ter no mínimo 3 caracteres
                    </span>
                  )}
                </div>
              </div>

              <h1 className="font-bold">EMAIL</h1>
              <div className="flex flex-col gap-1">
                <div
                  className={`flex items-center p-2 rounded-2xl border-2 ${
                    !isEmailValid ? "border-red-600" : "border-black"
                  }`}
                >
                  <div className="flex items-center gap-3 ml-2 w-full">
                    <FaUser />
                    <input
                      className="outline-none w-full"
                      placeholder="info@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="min-h-3.75">
                  {!isEmailValid && (
                    <span className="text-red-600 text-xs">
                      E-mail inválido
                    </span>
                  )}
                </div>
              </div>

              <h1 className="font-bold">CRIE UMA SENHA</h1>
              <div className="flex flex-col gap-1">
                <div
                  className={`flex items-center p-2 rounded-2xl border-2 ${
                    !isSenhaValid ? "border-red-600" : "border-black"
                  }`}
                >
                  <div className="flex items-center gap-3 ml-1 w-full">
                    <IoIosLock size={20} />
                    <input
                      className="outline-none appearance-none w-full"
                      value={senha}
                      onChange={(e) => validarSenha(e.target.value)}
                      placeholder="Digite sua senha"
                      type={visivel ? "text" : "password"}
                    />
                    {visivel ? (
                      <BsEyeFill
                        className="cursor-pointer"
                        size={20}
                        onClick={() => setVisivel(false)}
                      />
                    ) : (
                      <BsEyeSlashFill
                        className="cursor-pointer"
                        size={20}
                        onClick={() => setVisivel(true)}
                      />
                    )}
                  </div>
                </div>
                <div className="min-h-3.75">
                  {!isSenhaValid && (
                    <span className="text-red-600 text-xs">
                      A senha deve conter letra maiúscula, minúscula e caractere
                      especial
                    </span>
                  )}
                </div>
              </div>

              <h1 className="font-bold">CONFIRME A SENHA</h1>
              <div className="flex flex-col gap-1">
                <div
                  className={`flex items-center p-2 rounded-2xl border-2 ${
                    !isConfirmaValid ? "border-red-600" : "border-black"
                  }`}
                >
                  <div className="flex items-center gap-3 ml-1 w-full">
                    <IoIosLock size={20} />
                    <input
                      className="outline-none appearance-none w-full"
                      value={confirma}
                      onChange={(e) => validarConfirma(e.target.value)}
                      placeholder="Confirme sua senha"
                      type={visivelconfirma ? "text" : "password"}
                    />
                    {visivelconfirma ? (
                      <BsEyeFill
                        className="cursor-pointer"
                        size={20}
                        onClick={() => setVisivelconfirma(false)}
                      />
                    ) : (
                      <BsEyeSlashFill
                        className="cursor-pointer"
                        size={20}
                        onClick={() => setVisivelconfirma(true)}
                      />
                    )}
                  </div>
                </div>
                <div className="min-h-3.75">
                  {!isConfirmaValid && (
                    <span className="text-red-600 text-xs">
                      Senhas não coincidem
                    </span>
                  )}
                </div>
              </div>

              <h1 className="font-bold">Selecione seu Cargo</h1>
              <div className="flex flex-col gap-1">
                <select
                  value={cargo}
                  onChange={(e) => validarCargo(e.target.value)}
                  className={`border-2 p-1 rounded-lg ${
                    !isCargoValid ? "border-red-600" : "border-black"
                  }`}
                >
                  <option value=""></option>
                  <option value="Professor">Professor</option>
                  <option value="Secretaria">Secretaria</option>
                  <option value="Inspetor">Inspetor</option>
                  <option value="Cozinha">Cozinha</option>
                </select>

                <div className="min-h-3.75">
                  {!isCargoValid && (
                    <span className="text-red-600 text-xs">
                      Selecione um cargo
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              className="bg-[#cc0000] w-62.5 h-10 border-none rounded-[50px] text-white mt-1 font-bold"
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
            <div className="flex items-center m-15 bg-[#cc0000] rounded-[50px] w-112.5 h-108.75">
              <img
                className="flex w-112.5 h-108.75 rounded-[50px] opacity-[0.6] mr-6"
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