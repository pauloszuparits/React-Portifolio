import "./calculadora.css"
import {useState} from 'react'



export default function Calculator(){

    const [input, setInput] = useState([]);
    
    //seta a entrada
    function entrada(valor){
        setInput([...input, valor]);
        
    }
    //junta e faz a conta -> chamada no igual
    function juntar(){
        let consolidado = input.map(item=>{return item}).join('');//remove as virgulas
        let resultado = eval(consolidado);
        setInput([resultado]);
    }
    //função do botao remover -> chamada na seta
    function remover(){
        let exp = [...input];
        exp.pop();
        exp = exp.map(item=>{return item}).join('');
        setInput([...exp]);
    }

    //botoes
    return(
        <div>
            
            <p className="botoes">
                {/* numeros aparecem aqui */}
                <input type="text" id="input" value={input.map(item=>{return item}).join('')}/>
                {/* botao para remover caractere */}
                <button className="botao" onClick={()=>{remover()}}> &larr; </button>
            </p>
            <p className="botoes">
                <button className="botao" onClick={()=>{entrada(1)}}>1</button>
                <button className="botao" onClick={()=>{entrada(2)}}>2</button>
                <button className="botao" onClick={()=>{entrada(3)}}>3</button>
                <button className="botao" onClick={()=>{entrada('+')}}>+</button>
            </p>
            <p className="botoes">
                <button className="botao" onClick={()=>{entrada(4)}}>4</button>
                <button className="botao" onClick={()=>{entrada(5)}}>5</button>
                <button className="botao" onClick={()=>{entrada(6)}}>6</button>
                <button className="botao" onClick={()=>{entrada('-')}}>-</button>
            </p>
            <p className="botoes">
                <button className="botao" onClick={()=>{entrada(7)}}>7</button>
                <button className="botao" onClick={()=>{entrada(8)}}>8</button>
                <button className="botao" onClick={()=>{entrada(9)}}>9</button>
                <button className="botao" onClick={()=>{entrada('*')}}>x</button>
            </p>
            <p className="botoes">
                <button className="botao" onClick={()=>{setInput([])}}>c</button>
                <button className="botao" onClick={()=>{entrada(0)}}>0</button>
                <button className="botao" onClick={()=>{entrada('/')}}>/</button>
                <button className="botao" onClick={()=>{juntar()}}>=</button>
            </p>
            
        </div>
    );
}