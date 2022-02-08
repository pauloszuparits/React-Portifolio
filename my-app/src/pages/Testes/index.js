import { useState } from "react/cjs/react.development";
import Draggable from "react-draggable";
export default function Testes(){
    
    const [valor, setValor] = useState({x:0, y:0});

    // function handleDrag(e, ui){
    //     setValor({x: valor.x + ui.deltaX,
    //               y: valor.y + ui.deltaY})
    //     console.log(valor);
    // }

    return(
        <div className="conteiner">
            <Draggable onDrag={(e, ui)=>{
                setValor({x: valor.x + ui.deltaX,
                    y: valor.y + ui.deltaY})
            }}
            onStop={()=>{console.log(valor)}}>
                <div className="tarefa">Teste</div>
            </Draggable>
        </div>
    );
}