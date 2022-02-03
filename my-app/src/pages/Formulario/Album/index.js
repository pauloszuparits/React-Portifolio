import { useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import firebase from "../../../firebaseConnection";
import { Link } from "react-router-dom";
import Login from "../Login";
export default function Album(){
    
    //object standard for image, that is, if user doesn't have the card, that src will be shown
    const src = {source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1200px-Icon-round-Question_mark.svg.png',
                valor: 0}

    const {id} = useParams(); //id to acesss user album
    
    const [carregado, setCarregado] = useState(false); //if button was clicked, this var becomes true

    //src vars
    const [src1, setSrc1] = useState({});
    const [src2, setSrc2] = useState({});
    const [src3, setSrc3] = useState({});
    const [src4, setSrc4] = useState({});
    
    async function carregarAlbum(){
        
        let s;
        await firebase.firestore().collection('usuarios')
        .doc(id)
        .get()
        .then((snapshot)=>{
            s = snapshot.data().album;
            setCarregado(true);
            
        })
        .catch((error)=>{
            console.log(error);
        });

        let separado = s.split(",");
        
        
        if(separado.some((e)=>e==='0')){
            await firebase.firestore().collection('gifts')
            .doc('0')
            .get()
            .then((snaphot)=>{
            setSrc1({
                source: snaphot.data().source,
                valor: snaphot.data().valor
                })
            });
            
        }else{
            setSrc1(src)
            
        }
        
        
        if(separado.some((e)=>e==='1')){
            await firebase.firestore().collection('gifts')
            .doc('1')
            .get()
            .then((snaphot)=>{
            setSrc2({
                source: snaphot.data().source,
                valor: snaphot.data().valor
                })
            });
        }else{
            setSrc2(src)
        }
        if(separado.some((e)=>e==='2')){
            await firebase.firestore().collection('gifts')
            .doc('2')
            .get()
            .then((snaphot)=>{
            setSrc3({
                source: snaphot.data().source,
                valor: snaphot.data().valor
                })
            });
        }else{
            setSrc3(src)
        }
        if(separado.some((e)=>e==='3')){
            await firebase.firestore().collection('gifts')
            .doc('3')
            .get()
            .then((snaphot)=>{
            setSrc4({
                source: snaphot.data().source,
                valor: snaphot.data().valor
                })
            });
        }else{
            setSrc4(src)
        }
        
        
    }

    
    
    return(
        <div>
            <h1>Seu Album</h1>
            
            {carregado ? 
            <div className="conteiner-album">
                <div className="imagem-album"><img src={src1.source}/><p>{src1.valor}</p></div>
                <div className="imagem-album"><img src={src2.source}/><p>{src2.valor}</p></div>
                <div className="imagem-album"><img src={src3.source}/><p>{src3.valor}</p></div>
                <div className="imagem-album"><img src={src4.source}/><p>{src4.valor}</p></div>
            </div>
            :
            <button onClick={ carregarAlbum }>Carregar seu Album</button>}
            <Link to={"/formulario"}>Voltar</Link>
        </div>
    );
}