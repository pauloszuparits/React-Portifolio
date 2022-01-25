import { useEffect, useState } from "react";
import './passGen.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";


// Classificar senhas
//Colocar Abbr no inicio meio fim

export default function PssGen(){
    const duvidaPersonalizado = "Ao selecionar essa opção você irá digitar uma palavra que você quer que tenha em sua senha, por exemplo, ao colocar a palavra teste, poderá ser gerado a senha exemplo@731a"

    const duvidaCarac = "Essa é a quantidade de caracteres aleatórios, caso use a opção -personalizar senha com texto- a palavra que escolher não irá contar no numero de caracteres. O minimo de caracteres aleatórios é igual a 4"

    const letrasMaiusculas = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'
                            , 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'
                            , 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const letrasMinusculas = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
                                , 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's'
                                , 't', 'u', 'v', 'w', 'x', 'y', 'z'
                            ];

    const caracteresEspeciais = ['!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '_', '-', 
                                '=', '+', '[', ']', '{', '}', '?', '/'];

    const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];


    const[gerado, setGerado] = useState(false); //se a senha ja foi gerada
    
    var[senha, setSenha] = useState(); //a senha em si

    const[personalizada, setPersonalizada] = useState();

    var[flag, setFlag] = useState(false);
    // var[senhaSplit, setSenhaSplit] = useState([]);

    //numeros de caracteres
    var [carac, setCarac] = useState(4);
    

    //escolha caracteres especiais
    const [simEsp, setSimEsp] = useState(true);
    const [naoEsp, setNaoEsp] = useState(false);

    //escolha maiusculas
    const [simMai, setSimMai] = useState(true);
    const [naoMai, setNaoMai] = useState(false);

    //escolha numeros
    const [simNum, setSimNum] = useState(true);
    const [naoNum, setNaoNum] = useState(false);

    //escolhe senha Personalizada
    const [simPers, setSimPers] = useState(false);
    const [naoPers, setNaoPers] = useState(true);

    //escolhe embaralhar senha pernosalizada
    const [simEmb, setSimEmb] = useState(true);
    const [naoEmb, setNaoEmb] = useState(false);

    //inicio fim e meio da palavra personalizada na senha
    const[inicio, setInicio] = useState(false);
    const[fim, setFim] = useState(false);
    const[meio, setMeio] = useState(false);

    function handleChangeEsp(){ //mudança dos especiasi
        setSimEsp(!simEsp);
        setNaoEsp(!naoEsp);
      };

      function handleChangeMai(){ //mudança maiusculas
        setSimMai(!simMai);
        setNaoMai(!naoMai);
      };

      function handleChangeNum(){ //mudança numeros
        setSimNum(!simNum);
        setNaoNum(!naoNum);
      };

      function handleChangePers(){ //mudança senha personalizada
        setSimPers(!simPers);
        setNaoPers(!naoPers);
      };

      function handleChangeEmb(){ //mudança senha personalizada embaralhada
        setSimEmb(!simEmb);
        setNaoEmb(!naoEmb);
      };

      function handleChangeInicioMeioFim(num){
            switch(num){
                case 1:
                    setInicio(!inicio);
                    setMeio(false);
                    setFim(false);
                    break;
                case 2:
                    setInicio(false);
                    setMeio(!meio);
                    setFim(false);
                    break;
                case 3:
                    setInicio(false);
                    setMeio(false);
                    setFim(!fim);
                    break;
            }
      }

      
      //função para embaralhar a string gerada - retorna uma sttring que se tornará senha
      function embaralhar(stg){
            let arr = stg.split("");
            for(let i = arr.length-1; i>0;i--){
                let j = Math.floor(Math.random()*i+1);
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
            return arr.join("");
      }

      
      



      function gerar(){  //escolhe a opção selecionada pelo usuário e manda para o gerador
        
        

        if(simEsp && simMai && simNum){
            //caractere especial, maiuscula, numero
            let c = ''; //variavel para manipoular a senha
            
            while(true){ // enquanto c nnao for do tamanho solicitado o while conntinua rodando
                
                c += letrasMinusculas[Math.floor(Math.random()*letrasMinusculas.length)];
                if(c.length == carac){
                    break;
                }
                c += letrasMaiusculas[Math.floor(Math.random()*letrasMaiusculas.length)];
                if(c.length == carac){
                    break;
                }
                c += numeros[Math.floor(Math.random()*numeros.length)];
                if(c.length == carac){
                    break;
                }
                c += caracteresEspeciais[Math.floor(Math.random()*caracteresEspeciais.length)];
                if(c.length == carac){
                    break;
                }
                
            }
            
            setSenha(gerarPersonalizada(c));
            
         
        }else{
            if(simEsp && simMai && naoNum){
                //especial, maiuscula
                let c = '';
            
            while(true){
                
                c += letrasMinusculas[Math.floor(Math.random()*letrasMinusculas.length)];
                if(c.length == carac){
                    break;
                }
                c += letrasMaiusculas[Math.floor(Math.random()*letrasMaiusculas.length)];
                if(c.length == carac){
                    break;
                }
                c += caracteresEspeciais[Math.floor(Math.random()*caracteresEspeciais.length)];
                if(c.length == carac){
                    break;
                }
                
            }

            setSenha(gerarPersonalizada(c));
            
                
            }
            if(simMai && simNum && naoEsp){
                //maiuscula e numero
                let c = '';
            
            while(true){
                
                c += letrasMinusculas[Math.floor(Math.random()*letrasMinusculas.length)];
                if(c.length == carac){
                    break;
                }
                c += letrasMaiusculas[Math.floor(Math.random()*letrasMaiusculas.length)];
                if(c.length == carac){
                    break;
                }
                c += numeros[Math.floor(Math.random()*numeros.length)];
                if(c.length == carac){
                    break;
                }
                
            }

            setSenha(gerarPersonalizada(c));
              
            }
            if(simNum && simEsp && naoMai){
                //numero e especial
                let c = '';
            
            while(true){
                
                c += numeros[Math.floor(Math.random()*numeros.length)];
                if(c.length == carac){
                    break;
                }
                c += caracteresEspeciais[Math.floor(Math.random()*caracteresEspeciais.length)];
                if(c.length == carac){
                    break;
                }
                
            }

            setSenha(gerarPersonalizada(c));
            
            }
            if(simMai && naoEsp && naoNum){
                //maiuscula e minuscula
                let c = '';
            
            while(true){
                
                c += letrasMinusculas[Math.floor(Math.random()*letrasMinusculas.length)];
                if(c.length == carac){
                    break;
                }
                c += letrasMaiusculas[Math.floor(Math.random()*letrasMaiusculas.length)];
                if(c.length == carac){
                    break;
                }
                
            }

            setSenha(gerarPersonalizada(c));
                
            }
            if(simNum && naoMai && naoEsp){
                //Numero 
                let c = '';
            
            while(true){
            
                c += numeros[Math.floor(Math.random()*numeros.length)];
                if(c.length == carac){
                    break;
                }  
                
            }

            setSenha(gerarPersonalizada(c));
            
            }
            if(simEsp && naoMai && naoNum){
                //especial
                let c = '';
            
            while(true){
                
                c += caracteresEspeciais[Math.floor(Math.random()*caracteresEspeciais.length)];
                if(c.length == carac){
                    break;
                }
                
            }

            setSenha(gerarPersonalizada(c));
            
                
            }
            if(naoEsp && naoMai && naoNum){
                //nenhuma opção
                let c = '';
            
            while(true){
                
                c += letrasMinusculas[Math.floor(Math.random()*letrasMinusculas.length)];
                if(c.length == carac){
                    break;
                }  
            }

            setSenha(gerarPersonalizada(c));
            
                
            }
        }
        

        setGerado(true);

        
      }

      function gerarPersonalizada(senhaA){
        senhaA = embaralhar(senhaA);  
        if(naoPers){
            return senhaA;
        }

        let s = '';
        
        if(simEmb){
            let s = senhaA + personalizada;
            s = embaralhar(s);
            return s;
        }

        if(inicio){
          s = personalizada + senhaA;
          
        }
        if(meio){
          let arr = senhaA.split("");
          let tam = parseInt(arr.length/2);

          for(let i = 0; i < tam; i++){
              s += arr[i];
          }
          s += personalizada;
          for(let i = tam + 1; i < arr.length; i++){
              s+=arr[i];
          }   
        }
        if(fim){
          s = senhaA + personalizada;
        }

        return s;

      }

    
      function salvarSenha(){ //função para salvar senha 
          const minhasSenhas = localStorage.getItem('senhas'); //pega todas as senhas ja armazenadas no Local Storage
          
          let senhasSalvas = JSON.parse(minhasSenhas) || []; //armazena tudo em senhasSalvas, se vir vazio, array vazio

          const hasSenha = senhasSalvas.some((password)=> password === senha); //se a senha ja tiver sido salva

          if(hasSenha){
              toast.error('Essa senha ja foi salva!');
              return;
          }

          senhasSalvas.push(senha); //coloca a senha no array senhasSalvas
          localStorage.setItem('senhas', JSON.stringify(senhasSalvas)); //salva novamente no localStorage
          toast.success('Senha Salva com sucesso');

      }

      if(gerado){ //se a senha ja tiver sido gerada
          return(
          <div className="conclusao">
              <h1 className="titulo-pss2" >Sua senha:<br/><p>{senha}</p></h1>
              {/* Copiar para o clipboar */}
              <CopyToClipboard text={senha}>
                  <button className="botao-pss2" onClick={() => {toast.success('COPIADO!!!');}}>Copiar senha</button>
              </CopyToClipboard>
              {/* salvar nova senha */}
              <button className="botao-pss2" onClick={()=>{salvarSenha()}}>Salvar senha</button> 
              {/* Ir para senhas ja salvas */}
              <Link to="/pssgen/saved"><button className="botao-pss2">Senhas Salvas</button></Link> 
              <button onClick={()=>{setGerado(false)}} className="botao-pss2">Gerar Nova Senha com caracteristicas diferentes</button>
              <button onClick={()=>{gerar(); }} className="botao-pss2">Gerar senha com as mesmas caracteristicas</button>
          </div>
          );
      }

    return( //se a senha ainda nao tiver sido gerada
        <div className="conteiner">
           
        
        <h1 id="titulo-pss-main">Password Generator</h1>
            
            {/* quantidade de caracteres */}
            <div className="itens">
                <p className="Item-pss">Quantos caracteres você deseja?
                    <abbr title={duvidaCarac} id="duvida">?</abbr>
                </p>
                <input type="number" min={4} value={carac} onInput={(e)=>{setCarac(e.target.value); }} className="Item-pss" id="input-pss"/>

                <p className="Item-pss">Deseja caracteres especiais?</p>
                <input type="checkbox" checked={simEsp} onChange={()=>{handleChangeEsp()}} className="Item-pss check"/>Sim
                <input type="checkbox" checked={naoEsp} onChange={()=>{handleChangeEsp()}}/>Não 

                <p className="Item-pss">Deseja Números?</p>
                <input type="checkbox" checked={simNum} onChange={()=>{handleChangeNum()}} className="Item-pss"/>Sim 
                <input type="checkbox" checked={naoNum} onChange={()=>{handleChangeNum()}} className="Item-pss"/>Não 

                <p className="Item-pss">Deseja maiusculas e minusculas?</p>
                <input type="checkbox" checked={simMai} onChange={()=>{handleChangeMai()}} className="Item-pss"/>Sim
                <input type="checkbox" checked={naoMai} onChange={()=>{handleChangeMai()}} className="Item-pss"/>Não

                <p className="Item-pss">Deseja personalizar sua senha com um texto? 
                    <abbr title={duvidaPersonalizado} id="duvida">?</abbr>
                </p>
                <input type="checkbox" checked={simPers} onChange={()=>{handleChangePers()}} className="Item-pss"/>Sim
                <input type="checkbox" checked={naoPers} onChange={()=>{handleChangePers()}} className="Item-pss"/>Não

                {/* Caso o usuário deseje a senha persnoalizada */}
                {simPers && <div>
                    <p className="Item-pss">Digite a palavra desejada: </p>
                    <input type="text" className="Item-pss" id="input-pss" onChange={(e) => {setPersonalizada(e.target.value)}}/>
                    <p className="Item-pss">Deseja embaralhar essa palavra?</p>
                    <input type="checkbox" checked={simEmb} onChange={()=>{handleChangeEmb()}} className="Item-pss"/>Sim
                    <input type="checkbox" checked={naoEmb} onChange={()=>{handleChangeEmb()}} className="Item-pss"/>Não
                </div>
                }
                {naoEmb && 
                    <div>
                        <p className="Item-pss">Deseja a palavra personalizada no: </p>
                        <div className="emb">
                            <p ><input type="checkbox" checked={inicio} onChange={()=>{handleChangeInicioMeioFim(1)}} className="Item-pss"/>inicio da senha</p>
                            <p><input type="checkbox" checked={meio} onChange={()=>{handleChangeInicioMeioFim(2)}} className="Item-pss"/>meio da senha</p>
                            <p><input type="checkbox" checked={fim} onChange={()=>{handleChangeInicioMeioFim(3)}} className="Item-pss"/>final da senha</p>
                        </div>
                    
                </div>}

            </div>

            
            {/* botao para gerar senha */}
            <p><button onClick={()=>{gerar()}} className="botao-pss">Gerar Senha</button></p> 
            
        </div>
    )
}