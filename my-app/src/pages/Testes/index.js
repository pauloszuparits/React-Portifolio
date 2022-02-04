import { useState } from "react/cjs/react.development";
import Draggable from "react-draggable";
export default function Testes(){
    
    const [valor, setValor] = useState('');
    return(
        <div className="conteiner">
            <select onChange={(e)=>{setValor(e.target.value)}}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <div>
                <p>{valor} sdfsdf</p>
            </div>
        </div>
    );
}