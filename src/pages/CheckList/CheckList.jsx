import { useEffect, useState } from "react"
import { LiaClipboardListSolid } from "react-icons/lia";
import { ImUndo2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { FaClockRotateLeft } from "react-icons/fa6";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import { api } from "../../../api/api-config";
import BotaoSessao from "../../components/BotaoSessao/BotaoSessao";
import Tarefas from "../../components/Tarefas/Tarefas";


const CheckList = () => {
    const [dialogo, setDialogo] = useState(false)
    const [historicoAtivo, setHistoricoAtivo] = useState(false);
    const [modalAtivo, setModalAtivo] = useState(false);
    const [filtros, setFiltros] = useState([]);
    const [cargo, setCargo] = useState(localStorage.getItem("cargo"));
    const [dados, setDados] = useState([]);
    const [categoria, setCategoria] = useState("professor");
    const [id_usuario, setIdUsuario] = useState(localStorage.getItem('id_usuario'))

    const [formTarefa, setFormTarefa] = useState({
        funcao: '',
        data: '',
        prazo: '',
        responsavel: '',
        localizacao: '',
        urgencia: '',
        id_usuario
    })

    async function carregarTarefas() {
        try {
            const { data, status } = await api.get(`/MostrarTarefa/${categoria}`);
            if (status == 200) {
                console.log(data)
                setDados(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const NotarMudança = (e) => {
        const { name, value, id } = e.target;
        const campo = name || id;

        setFormTarefa(prevState => ({
            ...prevState,
            [campo]: value
        }));
    }

    async function enviarDados(e) {
        console.log(formTarefa)
        e.preventDefault()

        if (!formTarefa.funcao || !formTarefa.responsavel) {
            alert('Por favor, preencha o motivo e o responsável');
            return;
        }

        try {
            const response = await api.post('/checklist', formTarefa);
  
            setFormTarefa({
                funcao: '',
                data: '',
                prazo: '',
                responsavel: '',
                localizacao: '',
                urgencia: ''
            })

            fecharModal()
            carregarTarefas()
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        Opcoes();
    }, []);


    useEffect(() => {
        carregarTarefas();
    }, [categoria])


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
                    <BotaoSessao label={"Professor"} funcao={() => setDados} categoriaAtual={categoria} setCategoriaAtual={setCategoria} />
                    <BotaoSessao label={"Secretaria"} funcao={() => setDados} categoriaAtual={categoria} setCategoriaAtual={setCategoria} />
                    <BotaoSessao label={"Direção"} funcao={() => setDados} categoriaAtual={categoria} setCategoriaAtual={setCategoria} />
                    <BotaoSessao label={"Inspetor"} funcao={() => setDados} categoriaAtual={categoria} setCategoriaAtual={setCategoria} />

                </div>

            </div>

            {/* não sei pq o width na div dentro da section teve que ser tão especifico */}
            <Tarefas tarefas={dados} />



            {/* Modais, divs escondidas e tudo que do bom e do pior */}

            <div className={`fixed ${historicoAtivo ? 'top-0 right-0' : 'top-0 -right-full'}  w-100 h-full bg-[#cc0000] text-white shadow-[-4px_0_10px_rgba(0,0,0,0.5)] p-5 flex justify-between flex-row gap-3.75`}>
                <button onClick={() => fecharHistorico()} className="flex items-center justify-center text-white border-[3px] border-white rounded-[50%] p-0 cursor-pointer w-7.5 h-7.5">
                    <b>X</b>

                </button>
                <h2>Histórico</h2>
            </div>

   <div className={dialogo ? 'fixed left-1/4 top-1/4 w-1/2 z-50' : 'hidden'}>
                <form onSubmit={enviarDados}>
                    <div className="w-full flex justify-end items-center p-2.5 bg-[#cc0000] rounded-t-[10px]">
                        <div className="w-full h-12.5 bg-[#cc0000] text-white border-none text-[18px] font-bold flex items-center justify-center">
                            <h2>Novas Tarefas</h2>
                        </div>
                        <button type="button" onClick={fecharModal} className="text-white font-bold text-xl"><b>X</b></button>
                    </div>

                    <div className="flex flex-col gap-2 w-full bg-white p-5 rounded-b-[10px]">
                        <p>Motivo:</p>
                        <input 
                            type="text" 
                            name="funcao"
                            value={formTarefa.funcao}
                            onChange={NotarMudança}
                            required
                            className="border p-2 rounded"
                        />
                        
                        <p>Data e Hora:</p>
                        <input 
                            type="datetime-local" 
                            name="data"
                            value={formTarefa.data}
                            onChange={NotarMudança}
                            className="border p-2 rounded"
                        />
                        
                        <p>Prazo:</p>
                        <input 
                            type="date" 
                            name="prazo"
                            value={formTarefa.prazo}
                            onChange={NotarMudança}
                            className="border p-2 rounded"
                        />
                        
                        <p>Pessoa Responsável:</p>
                        <select 
                            name="responsavel"
                            value={formTarefa.responsavel}
                            onChange={NotarMudança}
                            required
                            className="border p-2 rounded"
                        >
                            <option value="">Selecione um responsável</option>
                            {filtros.map((filtro) => (
                                <option value={filtro.nome} key={filtro.id_usuario}>
                                    {filtro.nome}
                                </option>
                            ))}
                        </select>
                        
                        <p>Localização:</p>
                        <select 
                            name="localizacao" 
                            id="local"
                            value={formTarefa.localizacao}
                            onChange={NotarMudança}
                            className="border p-2 rounded"
                        >
                            <option value="">Selecione</option>
                            <option value="Professor">Professor</option>
                            <option value="Secretaria">Secretaria</option>
                            <option value="Inspetor">Inspetor</option>
                            <option value="Direção">Direção</option>
                        </select>
                        
                        <p>Nível de Urgência:</p>
                        <select 
                            name="urgencia" 
                            id="nivel"
                            value={formTarefa.urgencia}
                            onChange={NotarMudança}
                            className="border p-2 rounded"
                        >
                            <option value="">Selecione</option>
                            <option value="Não Urgente">Não Urgente</option>
                            <option value="Normal">Normal</option>
                            <option value="Urgente">Urgente</option>
                        </select>
                        
                        <button 
                            type="submit" 
                            id="salvar"
                            className="bg-[#cc0000] text-white p-2 rounded mt-3 font-bold hover:bg-[#aa0000] transition-colors"
                        >
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CheckList