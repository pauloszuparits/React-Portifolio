//Fazer uma verificaação de tentativa de senha com login e armazenar no local storage
//Traduzir todos os comentários
//Trocar Readme


import { useState } from "react/cjs/react.development"
import firebase from "../../../firebaseConnection";
import { Link } from "react-router-dom";
import './../formulario.css'
import './../theOffice.gif';
import './../carregando.gif';

export default function Formulario(){
    //User information
    const[nome, setNome] = useState('');
    const[idade, setIdade] = useState('');
    const [email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[empresa, setEmpresa] = useState('');
    const[cargo, setCargo] = useState('');
    const[trabalha, setTrabalha] = useState(false); 
    
    const[loading, setLoading] = useState(false); // if loading true enter on 'if'
    const[cadastrado, setCadastrado] = useState(false); // if cadastrado true enter on 'if'

    //function to change 'trabalha' checkbox
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
                cargo: cargo,
                nivel: 0,
                pontos: 0,
                album: ''
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
        return(
        <div className="carregando">
            <h1 id="carregando-txt">Carregando ...</h1>
            <img src={require('./../carregando.gif')} id="img-carregando"/> 
        </div>
        
        )
    }

    if(cadastrado){ //Condicional para se já cadastrado
        return(
            <div className="conteiner">
                <h1 id="titulo-formulario">PARABÉNS!!!!</h1>
                <div className="conteiner-cadastrado">
                    
                    <h2 id="titulo-formulario2">Cadastro efetuado com sucesso</h2>
                    <div>
                        <Link to = "/formulario" id="link-cadastro2"> Fazer Login</Link>
                    </div>
                </div>
                <img src={require('./../theOffice.gif')} id="gif"/>
            </div>
            
        );
    }

    return( //renderização principal
        <div className="conteiner">
            <h1 id="titulo-formulario">Formulario</h1>
            <div className="itens-Forumlario">
                <p className="Item-formulario">Digite seu nome</p>
                <input type="text" value={nome} onChange={(e) => {setNome(e.target.value)}} className="input-formulario"/>
                <p className="Item-formulario">Digite sua idade</p>
                <input type="number" value={idade} onChange={(e) => {setIdade(e.target.value)}} className="input-formulario"/>
                <p className="Item-formulario">Você trabalha?</p>
                <input type="checkbox" checked={trabalha} onChange={ handleChangeTrabalha } className="Item-formulario"/>Sim
                <input type="checkbox" checked={!trabalha} onChange={ handleChangeTrabalha } className="Item-formulario"/>Não
                {trabalha && //caso usuário selecionar sim no checkbox
                    <div>
                        <p className="Item-formulario">Digite o nome da empresa</p>
                        <input type="text" value={empresa} onChange={(e) => {setEmpresa(e.target.value)}} className="input-formulario"/>
                        <p className="Item-formulario">Digite seu cargo</p>
                        <input type="text" value={cargo} onChange={(e) => {setCargo(e.target.value)}} className="input-formulario"/>
                    </div>
                }
                <p className="Item-formulario">Digite seu email</p>
                <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} className="input-formulario"/>
                <p className="Item-formulario">Digite sua senha</p>
                <input type="password" value={senha} onChange={(e) => {setSenha(e.target.value)}} className="input-formulario"/>
            </div>
                <button onClick={ novoUsuario } className="botao-formulario">Cadastrar</button>
        </div>
    )
}