import React, { useState, useEffect } from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import { api } from "../../../api/api-config";

const MudarSenha = () => {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const id = localStorage.getItem("id_usuario");

  const [imagem, setImagem] = useState(null);
  const [listaImg, setListaImg] = useState([]);
  const [controle, setControle] = useState(false);

   function mudarImagem(image) {
    if (!image) return;

    const reader = new FileReader();

    reader.onload = function () {
      const base64 = reader.result;
      setImagem(base64);
    };

    reader.readAsDataURL(image);
  }

  async function enviarImagem() {
    try {
        console.log(imagem);
      const resultado = await api.put("/imagem", {
        image:imagem,
        id_usuario: id, 
      });

      if (resultado.status === 201) {
        alert("Imagem cadastrada com sucesso");
        setControle(!controle);
      } else {
        alert("Erro ao cadastrar");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getImagens() {
    try {
      const resposta = await api.get("/imagens");
      setListaImg(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getImagens();
  }, [controle]);

  async function EnviarNovaSenha() {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      alert("Preencha todos os campos");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      const resposta = await api.put("/mudarSenha", {
        senha: senhaAtual,
        senha_N: novaSenha,
        id_usuario: id,
      });

      if (resposta.status === 201) {
        alert("Senha alterada com sucesso");
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarSenha("");
      }
    } catch (erro) {
      console.log(erro);
      alert("Erro ao alterar");
    }
  }

  return (
    <>
      <Cabecalho />

      <div className="bg-[#ebebeb] flex flex-col font-sans min-h-screen">
        <main className="flex-1 flex items-center justify-center p-5">
          <div className="bg-[#cccccc] p-10 rounded-[40px] w-full max-w-[450px] shadow-md text-center">
            <div className="bg-[#b30000] p-3 rounded-[20px] mb-8 text-white">
              <h2 className="text-2xl font-bold">Mudar a Senha</h2>
            </div>

            <div className="text-left mb-5">
              <label className="font-bold block mb-2">Senha atual:</label>
              <input
                type="password"
                placeholder="Digite sua senha atual"
                className="w-full p-4 rounded-[15px] outline-none"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
            </div>

            <div className="text-left mb-5">
              <label className="font-bold block mb-2">Nova senha:</label>
              <input
                type="password"
                placeholder="Digite sua nova senha"
                className="w-full p-4 rounded-[15px] outline-none"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>

            <div className="text-left mb-5">
              <label className="font-bold block mb-2">
                Confirme a nova senha:
              </label>
              <input
                type="password"
                placeholder="Confirme sua nova senha"
                className="w-full p-4 rounded-[15px] outline-none"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>

            <div className="flex gap-5 mt-8 justify-center">
              <button
                onClick={EnviarNovaSenha}
                className="bg-[#cc0000] text-white px-9 py-3 rounded-[10px] font-bold"
              >
                Salvar
              </button>

              <button
                onClick={() => window.history.back()}
                className="bg-[#7a7a7a] text-white px-9 py-3 rounded-[10px] font-bold"
              >
                Cancelar
              </button>
            </div>
        <div className="p-5 flex flex-col items-center gap-4">
          <input
            type="file"
            id="inputImagem"
            onChange={(e) => mudarImagem(e.target.files[0])}
          />
            <button onClick={()=>enviarImagem()}>Salvar</button>
          {imagem && (
            <img
              id="preview"
              width="200"
              src={imagem}
              alt="Preview"
        
            />
          )}

          <div id="vazia">
            {listaImg.map((element) => {
              return (
                <img
                  src={element.foto}
                  alt=""
                  key={element.id}
                  width="150px"
                />
              );
            })}
          </div>
        </div>
          </div>
        </main>

      </div>
    </>
  );
};

export default MudarSenha;