import { useState } from "react/cjs/react.development"
import firebase from "../../../firebaseConnection";
import { Link } from "react-router-dom";
export default function Formulario(){
    //Informações do usuário para usar no cadastro
    const[nome, setNome] = useState('');
    const[idade, setIdade] = useState('');
    const[senha, setSenha] = useState('');
    const[usuario, setUsuario] = useState('');
    const[empresa, setEmpresa] = useState('');
    const[cargo, setCargo] = useState('');
    const[trabalha, setTrabalha] = useState(false); 


    const[cadastrado, setCadastrado] = useState(false); // se cadastrado cai no condicional

    function handleChangeTrabalha(){
        setTrabalha(!trabalha);
    }

    if(cadastrado){
        return(
            <>
                <h1>Cadastro efetuado com sucesso</h1>
                <Link to = "/formulario"> Fazer Login</Link>
            </>
        );
    }

    return(
        <>
            <h1>Formulario</h1>
            <div>
                <p>Digite seu nome</p>
                <input type="text" value={nome} onChange={(e) => {setNome(e.target.value)}}/>
                <p>Digite sua idade</p>
                <input type="number" value={idade} onChange={(e) => {setIdade(e.target.value)}}/>
                <p>Você trabalha?</p>
                <input type="checkbox" checked={trabalha} onChange={ handleChangeTrabalha }/>Sim
                <input type="checkbox" checked={!trabalha} onChange={ handleChangeTrabalha }/>Não
                {trabalha && 
                    <div>
                        <p>Digite o nome da empresa em que trabalha</p>
                        <input type="text" value={empresa} onChange={(e) => {setEmpresa(e.target.value)}}/>
                        <p>Digite seu cargo</p>
                        <input type="text" value={cargo} onChange={(e) => {setCargo(e.target.value)}}/>
                    </div>
                }
                <p>Digite o nome de usuário desejado</p>
                <input type="text" value={usuario} onChange={(e) => {setUsuario(e.target.value)}}/>
                <p>Digite sua senha</p>
                <input type="text" value={senha} onChange={(e) => {setSenha(e.target.value)}}/>
            </div>
                <button>Cadastrar</button>
        </>
    )
}