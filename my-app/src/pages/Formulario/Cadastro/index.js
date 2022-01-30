//Fazer uma verificaação de tentativa de senha com login e armazenar no local storage
//caso o usuario esteja logado fazer um joguinho

import { useState } from "react/cjs/react.development"
import firebase from "../../../firebaseConnection";
import { Link } from "react-router-dom";
export default function Formulario(){
    //Informações do usuário para usar no cadastro
    const[nome, setNome] = useState('');
    const[idade, setIdade] = useState('');
    const [email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[empresa, setEmpresa] = useState('');
    const[cargo, setCargo] = useState('');
    const[trabalha, setTrabalha] = useState(false); 
    
    const[loading, setLoading] = useState(false); // se loading true cai no condicional
    const[cadastrado, setCadastrado] = useState(false); // se cadastrado cai no condicional

    //função para mudar o checkbox do trabalho
    function handleChangeTrabalha(){
        setTrabalha(!trabalha);
    }

    //função para cadastrar novo usuário no banco de dados
    async function novoUsuario(){
        setLoading(true); // começa a renderizar a pagina de carregando
        await firebase.auth().createUserWithEmailAndPassword(email, senha) //cria um usuario e senha
        .then(async (value)=>{ //se der certo a criação de usuario e senha
            await firebase.firestore().collection('usuarios') //adiciona dados no banco 'usuarios'
            .doc(value.user.uid) //usa o uid como chave unica
            .set({
                nome: nome,
                idade: idade,
                empresa: empresa,
                cargo: cargo
            })
            .then(()=>{ //se der certo a criação do banco de dados
                setNome('');
                setIdade('');
                setEmpresa('');
                setCargo('');
                setEmail('');
                setSenha('');
                setLoading(false); //para o carregamento
                setCadastrado(true); //segue para a pagina de cadastrado
            })
        })
        .catch((error)=>{ //se criação de usuario e senha der errado
            if(error.code === 'auth/weak-password'){
              alert('Senha muito fraca..');
            }else if(error.code === 'auth/email-already-in-use'){
              alert('email ja cadastrado');
            }
        })
    }

    if(loading){ //condicional para Loading
        return(<h1>Carregando...</h1>)
    }

    if(cadastrado){ //Condicional para se já cadastrado
        return(
            <>
                <h1>Cadastro efetuado com sucesso</h1>
                <Link to = "/formulario"> Fazer Login</Link>
            </>
        );
    }

    return( //renderização principal
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
                {trabalha && //caso usuário selecionar sim no checkbox
                    <div>
                        <p>Digite o nome da empresa em que trabalha</p>
                        <input type="text" value={empresa} onChange={(e) => {setEmpresa(e.target.value)}}/>
                        <p>Digite seu cargo</p>
                        <input type="text" value={cargo} onChange={(e) => {setCargo(e.target.value)}}/>
                    </div>
                }
                <p>Digite seu email</p>
                <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <p>Digite sua senha</p>
                <input type="password" value={senha} onChange={(e) => {setSenha(e.target.value)}}/>
            </div>
                <button onClick={ novoUsuario }>Cadastrar</button>
        </>
    )
}