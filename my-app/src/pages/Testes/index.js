import { useState } from "react/cjs/react.development";
import Draggable from "react-draggable";
export default function Testes(){
    // const teste = [1, 2, 3, 4, 5, 6];
    
    // function filtrar(){
    //     let filtro = teste.filter((item)=>{
    //         return(item !== 4);
    //     })
    //     console.log(filtro);
    // }
    return(
        <div>
           <Draggable>
               <h1>Teste</h1>
           </Draggable>
        </div>
    );
}