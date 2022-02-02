import { useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import firebase from "../../../firebaseConnection";

export default function Album(){
    
    const src = {source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1200px-Icon-round-Question_mark.svg.png',
                valor: 0}
    const {id} = useParams(); //id to acesss user album
    
    const [carregado, setCarregado] = useState(false);

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
            setSrc1(getGift(0));
        }else{
            setSrc1(src)
        }
        
    }

    async function getGift(doc){
        let objeto = {};
        await firebase.firestore().collection('gifts')
        .doc(doc)
        .get()
        .then((snaphot)=>{
            objeto = {
                source: snaphot.data().source,
                valor: snaphot.data().valor
            }
        })

        return objeto;
    }
    
    
    return(
        <div>
            <h1>Seu Album</h1>
            
            {carregado ? 
            <div className="conteiner-album">
                <img src={src1.source}/>
                <img src={src2.source}/>
                <img src={src3.source}/>
                <img src={src4.source}/>
            </div>
            :
            <button onClick={ carregarAlbum }>Carregar seu Album</button>}
            
        </div>
    );
}