import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { api } from "../../../api/api-config";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [visivel, setVisivel] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSenhaValid, setIsSenhaValid] = useState(true);

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setIsEmailValid(emailRegex.test(email) || email === "");
  }, [email]);

  function validarSenha(texto) {
    setSenha(texto);
    setIsSenhaValid(texto.length >= 8 || texto === "");
  }

  async function Enviar() {
    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const resposta = await api.post("/login", {
        email,
        senha,
      });

      if (resposta.status === 200) {
        localStorage.setItem("id_usuario", resposta.data.id_usuario);
        localStorage.setItem("cargo", resposta.data.cargo);

        navigate("/home");
      }
    } catch (erro) {
      if (erro.response?.status === 404) {
        alert("Esse email não está cadastrado");
      } else if (erro.response?.status === 401) {
        alert("Senha incorreta");
      } else {
        alert("Erro ao logar");
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-183 bg-[#cc0000] ">
        <div className="flex justify-around bg-white w-240 rounded-[50px]">
          <div className="mt-20 flex flex-1 items-center flex-col mb-10">
            <div className="flex flex-col gap-1 items-center">
              <img
                className="w-50 h-15"
                src="logoSESI.jpg"
                alt="Logo do SESI"
              />
              <p className="text-[15px]">Educação que transforma</p>
              <h2 className="text-2xl font-bold">SEJA BEM VINDO!</h2>
            </div>

            <div className="flex flex-col w-70 gap-2">
              <h1 className="font-bold">LOGIN</h1>
              <div className="flex flex-col gap-1">
                <div
                  className={`flex items-center border-2 p-2 rounded-2xl ${
                    !isEmailValid ? "border-red-600" : "border-black"
                  }`}
                >
                  <div className="flex items-center gap-3 ml-2 w-full">
                    <FaUser />
                    <input
                      className="outline-none w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="info@gmail.com"
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

              <h1 className="font-bold">SENHA</h1>
              <div className="flex flex-col gap-1">
                <div
                  className={`flex items-center border-2 p-2 rounded-2xl ${
                    !isSenhaValid ? "border-red-600" : "border-black"
                  }`}
                >
                  <div className="flex items-center gap-3 ml-1 w-full">
                    <IoIosLock size={20} />

                    <input
                      className="outline-none w-full"
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
                      Senha deve ter no mínimo 8 caracteres
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={Enviar}
                className="bg-[#cc0000] w-62.5 h-10 border-none rounded-[50px] text-white mt-5 font-bold"
              >
                ENTRAR
              </button>

              <div className="flex flex-col items-center gap-2">
                <p>Não tem uma conta?</p>
                <Link
                  className="flex bg-[#e2e2e2] rounded-[50px] justify-center p-0.5 w-40 font-bold"
                  to={"/cadastrar"}
                >
                  CADASTRE-SE
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex m-15 bg-[#cc0000] rounded-[50px] w-112.5 h-108.75">
              <img
                className="w-112.5 h-108.75 justify-center rounded-[50px] opacity-[0.6] mr-6"
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

export default Login;