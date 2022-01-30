import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import firebase from "../../../firebaseConnection";
import './../formulario.css'
export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState({});

    const [logado, setLogado] = useState(true); //se logado true cai na condicional

    //função para efetuar Login
    async function login(){
        await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(async(value)=>{ //se login der certo
            await firebase.firestore().collection('usuarios')
            .doc(value.user.uid)
            .get()
            .then((snapshot)=>{ 
                setUsuario({ //armazena tudo no objeto usuario
                    nome: snapshot.data().nome,
                    cargo: snapshot.data().cargo,
                    empresa: snapshot.data().empresa,
                    idade: snapshot.data().idade
                });
            })
            setLogado(true);
        })
        .catch((error)=>{ //se login não der certo
            if(error.code === "auth/invalid-email"){
                alert('email invalido')
            }
            if(error.code === "auth/wrong-password"){
                alert('senha Invalida')
            }
        });
    }

    //function for logout
    async function logout(){ 
        await firebase.auth().signOut();
    }

    if(logado){ //condicional logado
        return(  
            <div>
                <h1 id="titulo-formulario-logado">Você está logado</h1>
                <div className="conteiner-logado">
                    <p>Seus dados:</p>
                    <p><strong>Nome:</strong> {usuario.nome}</p>
                    <p><strong>Cargo:</strong> {usuario.cargo}</p>
                    <p><strong>Empresa:</strong> {usuario.empresa}</p>
                    <p><strong>Idade:</strong> {usuario.idade}</p>
                    <button onClick={ logout }>Deslogar</button>
                </div>
            </div>
        )
    }

    return( //render principal
        <div className="conteiner">
            <h1 id="titulo-formulario">Login</h1>
                <div className="itens-Forumlario">       
                    <p className="Item-formulario" >Digite seu email</p>
                    <input type="text" onChange={(e)=>{setEmail(e.target.value)}} className="input-formulario"/>
                    <p className="Item-formulario" >Digite sua senha</p>
                    <input type="password" onChange={(e)=>{setSenha(e.target.value)}} className="input-formulario"/>
                    
                    <div className="link-formulario">
                        <Link to="/formulario/cadastro" id="link-cadastro">Não possui login? cadastre seu usuário</Link>
                    </div>
                </div>
                <button onClick={ login } className="botao-formulario">Efetuar login</button>
        </div>
    )
}