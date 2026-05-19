import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { Navigate, replace, useNavigate } from "react-router-dom";
import { api } from "../../../api/api-config";
import { useEffect, useState } from "react";

export default function Cabecalho() {
  const navigate = useNavigate();
  const id_usuario = localStorage.getItem('id_usuario')
  const [imagem, setImagem] = useState('')

  function carregarimg() {
    const imagem = api.get(`/imagem/${id_usuario}`).then((element) => {
      console.log(element)
      setImagem(element.data.imagem)
    })

  }

  useEffect(() => {
    carregarimg()
  }, [])

  return (
    <>
      <header className="  flex items-center justify-between pl-5 pr-5 bg-[#cc0000] w-full h-24">
        <div>
          <img
            className="flex hidden md:flex  w-38 h-12"
            src="logoSESI.jpg"
            alt="Logo do sesi"
          />
        </div>
        <div className="flex gap-5  ">
          <button>
            <MdOutlineLogout
              color="white"
              size="45"
              onClick={() => {
                localStorage.removeItem("id_usuario");
                localStorage.removeItem("cargo");
                localStorage.clear()
                navigate("/login", { replace: true });
              }}
              className="cursor-pointer"
            />
          </button>
          <button>
            <AiOutlineHome
              color="white"
              size="45"
              onClick={() => navigate("/Home")}
              className="cursor-pointer"
            />
          </button>
          <button>
            {imagem?
            <img onClick={()=>navigate("/MudarSenha")} src={imagem} alt="To aqui" width={'40px'} className="rounded-2xl"/>:
            <CgProfile
              color="white"
              size="45"
              onClick={() => navigate("/Mudarsenha")}
              className="cursor-pointer"
            />}
          </button>



        </div>
      </header>
      <nav className="flex bg-[#ae0909] w-full h-12"></nav>
    </>
  );
}