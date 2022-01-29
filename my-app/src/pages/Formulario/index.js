import { useState } from "react/cjs/react.development"
import firebase from "../../firebaseConnection";

export default function Formulario(){
    const[nome, setNome] = useState('');
    const[idade, setIdade] = useState('');
    const[senha, setSenha] = useState('');
    const[usuario, setUser] = useState('');
    
    return(
        <>
            <h1>Formulario</h1>
        </>
    )
}