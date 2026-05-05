import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import { api } from "../../../api/axios-config";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const [visivel, setVisivel] = useState(false);
  async function Enviar() {
    try {
      const resposta = await api.post("/login", {
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
      <div className="flex items-center justify-center  h-183 bg-[#cc0000]">
        <div className="flex  justify-around bg-white h-140 w-240 rounded-[50px]">
          <div className=" mt-20 flex flex-1 items-center flex-col ">
            <div className="flex flex-col gap-1">
              <img
                className="w-50 h-15"
                src="logoSESI.jpg"
                alt="Logo do SESI"
              />
              <p className="text-[15px]">Educação que transforma</p>
              <h2 className=" text-2xl font-bold">SEJA BEM VINDO!</h2>
            </div>
            <div className="flex flex-col w-70 gap-2">
              <h1 className="flex justify-start font-bold">LOGIN</h1>
              <div className="flex items-center border p-1 rounded-2xl gap-1">
                <FaUser />
                <input
                  className=" outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@gmail.com"
                />
              </div>
              <h1 className="flex justify-start font-bold">SENHA</h1>
              <div className="flex items-center border p-1 rounded-2xl gap-1">
                <IoIosLock size={20} />
                <input
                  className="outline-none"
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
            <div className="flex flex-col gap-4">
              <button
                onClick={() => Enviar()}
                className="bg-[#cc0000] w-62.5 h-10 border-none rounded-[50px] text-white mt-5 font-bold "
              >
                ENTRAR
              </button>
              <p>Não tem uma conta?</p>
              <Link
                className="bg-[#e2e2e2] rounded-[50px] items-center"
                to={"/cadastrar"}
              >
                CADASTRE-SE
              </Link>
            </div>
          </div>
          <div className="flex m-15 bg-[#cc0000] rounded-[50px] w-112.5 h-108.75 ">
            <img
              className="w-112.5 h-108.75 justify-center rounded-[50px] opacity-[0.6] mr-6"
              src="imagemEsquerda.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;