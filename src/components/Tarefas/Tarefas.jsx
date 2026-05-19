const Tarefas = ({ tarefas }) => {


    return (<section className="flex items-center justify-center">
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
            <div>
                {tarefas.map((tarefa) => {
                    const date = new Date(tarefa.data_requisicao);
                    const options = {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        timeZone: "UTC",
                    };
                    const dataFormatada = date.toLocaleDateString("pt-BR", options);

                    const prazo = new Date(tarefa.prazo);
                    const prazoFormatado = prazo.toLocaleDateString("pt-BR", options);
                    console.log(tarefa.nivel_urgencia);

                    return (
                        <div key={tarefa.id_requisicao} 
                        className={`grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr_1fr] gap-2.5 p-2.5 border-b border-gray-200 items-center 
                        ${tarefa.nivel_urgencia == "Urgente" ? 'bg-red-200' : tarefa.nivel_urgencia == "Normal" ? 'bg-yellow-200' : 'bg-green-200'}`}>
                            <p className="text-center">{tarefa.funcao}</p>
                            <p className="text-center">{dataFormatada}</p>
                            <p className="text-center">{tarefa.destinatario_req}</p>
                            <p className="text-center">{tarefa.localizacao}</p>
                            <p className="text-center">{prazoFormatado}</p>
                        </div>)
                })}

                {tarefas.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        Nenhuma tarefa encontrada
                    </div>
                )}
            </div>
        </div>
    </section>)
}

export default Tarefas




