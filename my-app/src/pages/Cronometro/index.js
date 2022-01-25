import { useState } from "react";
import './cronometro.css'


export default function Cronometro(){
    var[crono, setCrono] = useState(0); //numero que vai aparecer 
    const[txt1, setTxt1] = useState('Começar'); //botao para começar e pausar
    const[txt2, setTxt2] = useState('Zerar'); //botao para zerar
    const [timer, setTimer] = useState(null); //botao para o intervalo
    
    //zera o cronometro
    function zerar(){
        setCrono(0);
        setTxt1('Começar');
    }

    //roda o cronometro
    function comecar(){
        
        //pausa o timer
        if(timer !== null){ //se o timer nao estiver nulo o texto deve ser continuar
            setTxt1('Continuar');
            clearInterval(timer);
            setTimer(null); 
        }else{ //volta o timer
            setTxt1('Pausar')
            setTimer(setInterval(()=>{
                let add = 0.1;
                setCrono(crono += add);
            }), 100)
        }
    }

    return(
        <div>
            <h1 id="titulo">Cronometro</h1>
            {/* tofixed para 2 casas decimais */}
            <h1 id="crono">{crono.toFixed(2)}</h1> 
            <p className="botoes-cronometro">
                <button className="botao-crono" onClick={()=> {comecar()}}>{txt1}</button>
                <button className="botao-crono" onClick={()=>{zerar()}}>{txt2}</button>
            </p>
        </div>
    );
}