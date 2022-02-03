import { Link } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import firebase from "../../../firebaseConnection";
import './../formulario.css';
import './../carregando.gif';


export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [gift, setGift] = useState({}); //source for gifts
    const [usuario, setUsuario] = useState({}); //data about the user

    var [urlAlbum, setUrlAlbum] = useState();
    
    const [revindicado, setRevindicado] = useState(false); //if true, gift was claimed
    const [logado, setLogado] = useState(false); //se logado true cai na condicional

    const[loading, setLoading] = useState(false);


    //function to login
    async function login(){
        setLoading(true);
        await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(async(value)=>{ //se login der certo
            await firebase.firestore().collection('usuarios')
            .doc(value.user.uid)
            .get()
            .then((snapshot)=>{ 
                setUsuario({ //armazena tudo no objeto usuario
                    id: value.user.uid,
                    nome: snapshot.data().nome,
                    cargo: snapshot.data().cargo,
                    empresa: snapshot.data().empresa,
                    idade: snapshot.data().idade,
                    nivel: snapshot.data().nivel,
                    pontos: snapshot.data().pontos,
                    album: snapshot.data().album
                });
                setUrlAlbum('/album/'+value.user.uid);
            })
            setLogado(true);
            setLoading(false);
            
        })
        .catch((error)=>{ //se login não der certo
            if(error.code === "auth/invalid-email"){
                alert('email invalido')
            }
            if(error.code === "auth/wrong-password"){
                alert('senha Invalida')
            }
        });

        let n = String(Math.floor(Math.random() * 3)); //generates a random number
        
        await firebase.firestore().collection('gifts') //get data from collection gifts -> image and points for each image
        .doc(n) 
        .get()
        .then((snapshot)=>{
            setGift({src: snapshot.data().source,
                    pontos: snapshot.data().valor,
                    id: n});
        });
        
    }

    

    //function for logout
    async function logout(){ 
        await firebase.auth().signOut();
        setLogado(false);
        setRevindicado(false);
    }

    //A function to level up and update points of the user after he clicked on the button
    async function subirNivel(){
        let p = usuario.pontos + gift.pontos;
        
        await firebase.firestore().collection('usuarios')
        .doc(usuario.id)
        .update({nivel: usuario.nivel+1,
                 pontos: p,
                 album: usuario.album + ',' + gift.id}) //to get what pictures user have
        .then(()=>{
            console.log('sucesso');
            
            setRevindicado(true);
        })
        .catch((error)=>{
            console.log(error);
        })

        await firebase.firestore().collection('usuarios') //get data again after level up
            .doc(usuario.id)
            .get()
            .then((snapshot)=>{ 
                setUsuario({ 
                    id: usuario.id,
                    nome: snapshot.data().nome,
                    cargo: snapshot.data().cargo,
                    empresa: snapshot.data().empresa,
                    idade: snapshot.data().idade,
                    nivel: snapshot.data().nivel,
                    pontos: snapshot.data().pontos,
                    album: snapshot.data().album
                });
            })

            console.log(usuario.album);
    }

    if(loading){ //condicional para Loading
        return(
        <div className="carregando">
            <h1 id="carregando-txt">Carregando ...</h1>
            <img src={require('./../carregando.gif')} id="img-carregando"/> 
        </div>
        
        )
    }

    if(logado){ //condicional logado
        return(  
            <div>
                <div id="dados-logado">
                    <div>
                        <h1 id="titulo-formulario-logado">Você está logado</h1>
                        <div className="conteiner-logado">
                            <p>Seus dados:</p>
                            <p><strong>Nome:</strong> {usuario.nome}</p>
                            <p><strong>Cargo:</strong> {usuario.cargo}</p>
                            <p><strong>Empresa:</strong> {usuario.empresa}</p>
                            <p><strong>Idade:</strong> {usuario.idade}</p>
                            <button onClick={ logout } id="deslogar">Deslogar</button>
                        </div>
                    </div>
                    <div>
                        <p>Seu Nível: {usuario.nivel}</p>
                        <p>Seus Pontos: {usuario.pontos}</p>
                        <div className="album">
                            <Link to={urlAlbum} id="album">Acesse seu Album</Link>
                        </div>
                    </div>
                </div>

                {revindicado ? //if 'revindidcado' true, gift was claimed
                
                <h2>Seu premio ja foi revindicado hoje</h2>
                
                :
                //if 'revindicado' false, gift wasn't claimed
                <div className="conteiner-nivel"> 
                    <p id="nivel-texto">Agora voce tem direito de pegar uma imagem e subir um nível, você só pode subir um nível por dia, quanto mais você entrar mais niveis você irá acumular!</p>
                    <img src={gift.src} id="gift"/>
                    <p>+</p>
                    <p>Seu nível irá para o nível {usuario.nivel + 1}</p>
                    <button onClick={ subirNivel }>Revindicar sua recompensa</button>
                    </div>
                }
            </div>
        )
    }

    return( //main render
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