import { useEffect, useState } from "react";
import './pssSaved.css'
import { Link } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast } from "react-toastify";

export default function PssSaved(){
    const [senhas, setSenhas] = useState([]); //senhas

    useEffect(()=> { //useEffect para pegar as senhas do local storage e armazennar na state senha
        const minhasSenhas = localStorage.getItem('senhas');
        setSenhas(JSON.parse(minhasSenhas) || []);

    }, [senhas])

    function excluirSenha(senha){ //exclui uma senha armazennada
        let filtroSenhas = senhas.filter((item) => {
            return (item !== senha)
        })

        setSenhas(filtroSenhas);
        localStorage.setItem('senhas', JSON.stringify(filtroSenhas));
    }

    if(senhas.length == 0){ // se não tiver senhas criadas (Renderização conndicional)
        return(
            <div className="conteiner-Saved">
                <h1>Você não tem senhas salvas ainda :( </h1>
                <Link to="/pssgen"><button className="botao-pss2">Clique aqui para gerar uma nova senha</button></Link>
            </div>
        )
    }

    return(
        <div className="conteiner-Saved">
            <h1>Suas senhas</h1>
            
            <ul id="lista-Saved">
                {senhas.map((item) => {return(
                    <li id="item-lista-Saved">
                        <span>{item}</span>
                        <div>
                            {/* Copiar senha */}
                            <CopyToClipboard text={item}> 
                                <button id="botao-excluir-Psssaved" onClick={()=>{toast.success("COPIADO!!")}}>Copiar senha</button>
                            </CopyToClipboard>
                            <button onClick={()=>{excluirSenha(item)}} id="botao-excluir-Psssaved">Excluir</button>   
                        </div>
                    </li>
                    
                )})}
            </ul>
            
            {/* botão para voltar para o menu */}
            <Link to="/pssgen"><button className="botao-pss2">Gerar nova Senha</button></Link>
        </div>
    );
}