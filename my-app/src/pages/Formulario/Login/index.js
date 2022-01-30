import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import firebase from "../../../firebaseConnection";
export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState({});
    const [logado, setLogado] = useState(false);

    async function login(){
        await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(async(value)=>{
            await firebase.firestore().collection('usuarios')
            .doc(value.user.uid)
            .get()
            .then((snapshot)=>{
                setUsuario({
                    nome: snapshot.data().nome,
                    cargo: snapshot.data().cargo,
                    empresa: snapshot.data().empresa,
                    idade: snapshot.data().idade
                });
            })
            setLogado(true);
        })
        .catch((error)=>{
            if(error.code === "auth/invalid-email"){
                alert('email invalido')
            }
            if(error.code === "auth/wrong-password"){
                alert('senha Invalida')
            }
        });
    }

    if(logado){
        return(
            <>
                <h1>Você está logado</h1>
            </>
        )
    }

    return(
        <>
            <h1>Login</h1>
            <p>Digite seu email</p>
            <input type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
            <p>Digite sua senha</p>
            <input type="password" onChange={(e)=>{setSenha(e.target.value)}}/>
            <button>Efetuar login</button>
            <Link to="/formulario/cadastro">Cadastrar Usuário</Link>
        </>
    )
}