import { useEffect } from "react/cjs/react.development";


export default function Album(){
    
    // async function carregarAlbum(){
    //     await firebase
    // }


    return(
        <div>
            <h1>Seu Album</h1>
            {/* <button onClick={ carregarAlbum }>Carregar seu Album</button> */}
            <div className="conteiner-album">
                <img src=""/>
                <img src=""/>
                <img src=""/>
                <img src=""/>
            </div>
        </div>
    );
}