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
    
    const[loading, setLoading] = useState(false);
    const[cadastrado, setCadastrado] = useState(false); // se cadastrado cai no condicional

    function handleChangeTrabalha(){
        setTrabalha(!trabalha);
    }

    async function novoUsuario(){
        setLoading(true);
        await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(async (value)=>{
            await firebase.firestore().collection('usuarios')
            .doc(value.user.uid)
            .set({
                nome: nome,
                idade: idade,
                empresa: empresa,
                cargo: cargo
            })
            .then(()=>{
                setNome('');
                setIdade('');
                setEmpresa('');
                setCargo('');
                setEmail('');
                setSenha('');
                setLoading(false);
                setCadastrado(true);
            })
        })
        .catch((error)=>{
            if(error.code === 'auth/weak-password'){
              alert('Senha muito fraca..');
            }else if(error.code === 'auth/email-already-in-use'){
              alert('email ja cadastrado');
            }
        })
    }

    if(loading){
        return(<h1>Carregando...</h1>)
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
                <p>Digite seu email</p>
                <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <p>Digite sua senha</p>
                <input type="text" value={senha} onChange={(e) => {setSenha(e.target.value)}}/>
            </div>
                <button onClick={ novoUsuario }>Cadastrar</button>
        </>
    )
}