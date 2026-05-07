import { useEffect, useState } from "react"
import { LiaClipboardListSolid } from "react-icons/lia";
import { ImUndo2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { FaClockRotateLeft } from "react-icons/fa6";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import { api } from "../../../api/api-config";
import BotaoSessao from "../../components/BotaoSessao/BotaoSessao";


const CheckList = () => {
    const [dialogo, setDialogo] = useState(false)
    const [historicoAtivo, setHistoricoAtivo] = useState(false);
    const [modalAtivo, setModalAtivo] = useState(false);
    const [filtros, setFiltros] = useState([])
    const [cargo, setCargo] = useState(null)
    const [categoria, setCategoria] = useState("professor");


    useEffect(() => {
        const cargoUser = localStorage.getItem("cargo")
        setCargo(cargoUser)
    })



    const abrirHistorico = () => {
        console.log("abriu")
        setHistoricoAtivo(!historicoAtivo)
    }

    const fecharHistorico = () => {
        setHistoricoAtivo(!historicoAtivo)
    }

    const abrirModal = () => {
        console.log("tesyte")
        setDialogo(!dialogo)
    }

    const fecharModal = () => {
        setDialogo(!dialogo)
    }

    async function Opcoes() {
        const resposta = await api.get('/ListarUsers');
        setFiltros(resposta.data);
    }


    useEffect(() => {
        Opcoes();
    }, [])

    useEffect(()=>{
        console.log(categoria)
    },[categoria])

    return (
        <div className="bg-[#ededed]">
            <Cabecalho />
            <div className="h-16 p-5 flex justify-between items-center bg-white border-b-[3px] border-b-[#ae0909] border-solid">
                <div className="flex gap-3">
                    <div>
                        <button onClick={() => abrirModal()} className="bg-[#cc0000] w-60 h-9 rounded-[10px] flex items-center justify-center gap-2 ml-5 text-center font-bold px-4">
                            <IoMdAdd className="w-6 h-6" color="white" />
                            <p className="m-0 text-white text-[15px]">Adicionar Tarefas</p>
                        </button>
                    </div>
                    <div>
                        <button className="h-9 flex items-center gap-2 ml-5 text-center bg-white justify-around px-4">
                            <ImUndo2 className="w-5 h-5" color="red" />
                            <p className="m-0 text-[#cc0000] text-[15px]">
                                Desfazer
                            </p>
                        </button>
                    </div>
                </div>
                <div>
                    <button onClick={() => abrirHistorico()} className="h-9 flex items-center gap-2 ml-5 text-center bg-white justify-around px-4" >
                        <FaClockRotateLeft color="#cc0000" />
                        <p className="text-[#cc0000]">Historico</p>
                    </button>
                </div>
            </div>

            <div className="flex flex-row">
                <img src="site.png" alt="" width="65px" height="60px" className="mt-5 mr-5 mb-5 ml-7.5" />
                <div>
                    <p className="text-[16px] mt-5">Minhas Listas</p>
                    <h3>TAREFAS</h3>
                </div>
                <div className="flex items-end justify-end w-[85%]">
                    <BotaoSessao label={"professor"} funcao={() => { }} categoriaAtual={categoria} setCategoriaAtual={setCategoria} />
                    <BotaoSessao label={"secretaria"} funcao={() => { }} categoriaAtual={categoria} setCategoriaAtual={setCategoria} />

                </div>

            </div>
            {/* não sei pq o width na div dentro da section teve que ser tão especifico */}
            <section className="flex items-center justify-center">
                <div className="w-[99%] h-122.75 max-h-[80vh] bg-white rounded-t-[20px] overflow-y-auto p-2.5">
                    <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr_1fr] gap-2.5 bg-white p-2.5 rounded-[10px]">
                        <p className="m-0 p-2 rounded-[5px] text-center text-[14px] bg-[#f8f8f8]">Tarefa</p>
                        <p className="m-0 p-2 rounded-[5px] text-center text-[14px] bg-[#f8f8f8]">Data e Hora</p>
                        <p className="m-0 p-2 rounded-[5px] text-center text-[14px] bg-[#f8f8f8]">Responsável</p>
                        <p className="m-0 p-2 rounded-[5px] text-center text-[14px] bg-[#f8f8f8]">Localização</p>
                        <p className="m-0 p-2 rounded-[5px] text-center text-[14px] bg-[#f8f8f8]">Prazo</p>
                        <p className="m-0 p-2 rounded-[5px] text-center text-[14px] bg-[#f8f8f8]">Deletar</p>
                        <p className="m-0 p-2 rounded-[5px] text-center text-[14px] bg-[#f8f8f8]">Editar</p>
                    </div>
                </div>
            </section>


            {/* Modais, divs escondidas e tudo que do bom e do pior */}

            <div className={`fixed ${historicoAtivo ? 'top-0 right-0' : 'top-0 -right-full'}  w-100 h-full bg-[#cc0000] text-white shadow-[-4px_0_10px_rgba(0,0,0,0.5)] p-5 flex justify-between flex-row gap-3.75`}>
                <button onClick={() => fecharHistorico()} className="flex items-center justify-center text-white border-[3px] border-white rounded-[50%] p-0 cursor-pointer w-7.5 h-7.5">
                    <b>X</b>

                </button>
                <h2>Histórico</h2>
            </div>

            <div className={dialogo ? 'fixed left-1/4 top-1/4 w-1/2' : 'hidden'}>
                <div className="w-full flex justify-end items-center p-2.5 bg-[#cc0000] rounded-[10px]">
                    <div className="w-full h-12.5 bg-[#cc0000] text-white border-none text-[18px] font-bold flex items-center justify-center">
                        <h2>Novas Tarefas</h2>
                    </div>
                    <button onClick={() => fecharModal()}><b>X</b></button>
                </div>

                <div className="flex flex-col gap-2 w-full bg-white">
                    <p>Motivo:</p>
                    <input type="text" />
                    <p>Motivo:</p>
                    <input type="text" />
                    <p>Motivo:</p>
                    <input type="text" />
                    <p>Pessoa Responsavel:</p>
                    <select>
                        <option value=""></option>
                        {filtros.map((filtro) => <option className="text-black" value={filtro.nome} key={filtro.id_usuario}>{filtro.nome}</option>)}
                    </select>
                    <p>Localização:</p>
                    <select name="" id="local">
                        <option></option>
                        <option id="Professor">Professor</option>
                        <option id="Secretaria">Secretaria</option>
                        <option id="Inspetor">Inspetor</option>
                        <option id="Direção">Direção</option>
                    </select>
                    <p> Nível de Urgência:</p>
                    <select name="Dificuldade" id="nivel">
                        <option></option>
                        <option id="verde">Não Urgente</option>
                        <option id="amarelo">Normal</option>
                        <option id="vermelho">Urgente</option>
                    </select>
                    <button id="salvar"><b>Salvar</b></button>
                </div>

            </div>
        </div>
    )
}

export default CheckList