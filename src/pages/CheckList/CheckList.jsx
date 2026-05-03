import { useState } from "react"
import { LiaClipboardListSolid } from "react-icons/lia";
import { ImUndo2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { FaClockRotateLeft } from "react-icons/fa6";
import Cabecalho from "../../components/Cabecalho/Cabecalho";

const CheckList = () => {
    return (
        <div className="bg-[#ededed]">
            <Cabecalho />
            <div className="h-16 p-5 flex justify-between items-center bg-white border-b-[3px] border-b-[#ae0909] border-solid">
                <div className="flex gap-3">
                    <div>
                        <button className="bg-[#cc0000] w-60 h-9 rounded-[10px] flex items-center justify-center gap-2 ml-5 text-center font-bold px-4">
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
                    <button className="h-9 flex items-center gap-2 ml-5 text-center bg-white justify-around px-4" >
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
                    <button className="w-37.5 text-black bg-[#ededed] rounded-t-xl border-2 border-[#cc0000] border-b-0 py-2.5 px-7.5"> professor</button>
                    <button className="w-37.5 text-black bg-[#ededed] rounded-t-xl border-2 border-[#cc0000] border-b-0 py-2.5 px-7.5">inspetor</button>
                    <button className="w-37.5 text-black bg-[#ededed] rounded-t-xl border-2 border-[#cc0000] border-b-0 py-2.5 px-7.5">direção</button>
                    <button className="w-37.5 text-black bg-[#ededed] rounded-t-xl border-2 border-[#cc0000] border-b-0 py-2.5 px-7.5">secretaria</button>
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
        </div>
    )
}

export default CheckList