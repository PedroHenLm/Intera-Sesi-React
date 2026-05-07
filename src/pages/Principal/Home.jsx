import { Navigate, useNavigate } from "react-router-dom";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import { LiaClipboardListSolid } from "react-icons/lia";
export default function Home() {

    const navigate = useNavigate()

  return (
    <>
      <Cabecalho />
      <div className="flex justify-center h-full" onClick={()=> navigate("/Checklist")}>
        <div className="flex flex-col bg-[#ae0909] w-80 h-70 justify-center items-center rounded-4xl m-28">
          <LiaClipboardListSolid color="white" size="200" />
          <div className="flex items-center bg-[#850808]  h-9 w-50">
            <h2 className=" w-full  text-white m-10">CHECK LIST</h2>
          </div>
        </div>
      </div>
      <footer className="flex justify-end bg-[#ae0909] w-full h-21"></footer>
    </>
  );
}
