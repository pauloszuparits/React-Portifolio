import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import firebase from "../../../firebaseConnection";
export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState({});

    const [logado, setLogado] = useState(false); //se logado true cai na condicional

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

    if(logado){ //condicional logado
        return(
            <>
                <h1>Você está logado</h1>
                <p>Seus dados:</p>
                <p>Nome: {usuario.nome}</p>
                <p>Cargo: {usuario.cargo}</p>
                <p>Empresa: {usuario.empresa}</p>
                <p>Idade: {usuario.idade}</p>  
            </>
        )
    }

    return( //render principal
        <>
            <h1>Login</h1>
            <p>Digite seu email</p>
            <input type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
            <p>Digite sua senha</p>
            <input type="password" onChange={(e)=>{setSenha(e.target.value)}}/>
            <button onClick={ login }>Efetuar login</button>
            <Link to="/formulario/cadastro">Cadastrar Usuário</Link>
        </>
    )
}