import { useEffect, useState } from "react"

const BotaoSessao = ({ label, funcao, categoriaAtual, setCategoriaAtual }) => {
    const [isSelected, setIsSelected] = useState(false)

    useEffect(()=>{
        if(categoriaAtual == label){
            setIsSelected(true);
        }
        else{
            setIsSelected(false);
        }
    },[categoriaAtual])

    return (
    <button onClick={()=>{
        setCategoriaAtual(label);
    }} className={`w-37.5 text-black ${isSelected ? 'bg-[#ededed]' : 'bg-red-600'} rounded-t-xl border-2 border-[#cc0000] border-b-0 py-2.5 px-7.5`}>{label}</button>
    )
}

export default BotaoSessao