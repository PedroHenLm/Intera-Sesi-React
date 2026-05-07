import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai"
import { MdOutlineLogout } from "react-icons/md";
import { Navigate, replace, useNavigate } from 'react-router-dom'


export default function Cabecalho() {
  const Navigate = useNavigate();
  return (<>
    <header className="flex items-center justify-between pl-5 pr-5 bg-[#cc0000] w-full h-24">
      <div>
        <img className="w-38 h-12" src="logoSESI.jpg" alt="Logo do sesi" />
      </div>
      <div className="flex gap-5">
        <button>
          <MdOutlineLogout color="white" size="45" onClick={()=> Navigate("/Login")}/>
        </button>
        <button>
          <AiOutlineHome color="white" size="45" onClick={()=> Navigate("/Home")}/>
        </button>
        <button >
          <CgProfile color="white" size="45" />
        </button>
        
      </div>



    </header>
    <nav className="flex bg-[#ae0909] w-full h-12" ></nav>
  </>
  );
}