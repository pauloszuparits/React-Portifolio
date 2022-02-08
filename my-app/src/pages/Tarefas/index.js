import { useState } from "react/cjs/react.development";
import './tarefas.css'
import Draggable from "react-draggable";
import { useEffect } from "react";
export default function Tarefas(){

    const[tarefa, setTarefa] = useState('');
    const[descricao, setDescricao] = useState('');
    const[tarefas, setTarefas] = useState([]);
    const[contador, setContador] = useState(0);
    
    //condicional render
    const[amareloB, setAmareloB] = useState(false);
    const[laranjaB, setLaranjaB] = useState(false);
    const[vermelhoB, setVermelhoB] = useState(false);
    const[verdeB, setVerdeB] = useState(false);
    const[azulB, setAzulB] = useState(false);
    
    //subtitles
    const[amareloLeg, setAmareloLeg] = useState('');
    const[laranjaLeg, setLaranjaLeg] = useState('');
    const[vermelhoLeg, setVermelhoLeg] = useState('');
    const[verdeLeg, setVerdeLeg] = useState('');
    const[azulLeg, setAzulLeg] = useState('');

    //position
    const[posicao, setPosicao] = useState({x: -3, y:10})

    //select color value
    const[cor, setCor] = useState("amarelo");

    useEffect(()=>{
        const status = localStorage.getItem('status');
        const legendas = localStorage.getItem('legendas');
        
        let statusSaved = JSON.parse(status) || [];
        let legSaved = JSON.parse(legendas) || [];

        setTarefas(statusSaved);
        
            setAmareloLeg(legSaved.amarelo);
            setLaranjaLeg(legSaved.laranja);
            setVermelhoLeg(legSaved.vermelho);
            setVerdeLeg(legSaved.verde);
            setAzulLeg(legSaved.azul);
            console.log('entrou')
    },[])


    function handleAdd(){
        
        let objTarefa = {id: contador,
                        tarefa: tarefa,
                        descricao: descricao.length === 0 ? 'Tarefa sem descrição' : descricao,
                        cor: cor,
                        posicao: {x: -3, y:10}
                        }
        setTarefas([...tarefas, objTarefa]);
        setTarefa('');
        setDescricao('');
        let cont = contador + 1;
        setContador(cont);

    }

    function handleDelete(id){
        let filtro = tarefas.filter((item)=>{return(item.id !== id)})
        setTarefas(filtro);
    }

    function saveStatus(){
        let objLeg = {amarelo: amareloLeg,
                      laranja: laranjaLeg,
                      vermelho: vermelhoLeg,
                      verde: verdeLeg,
                      azul: azulLeg
        }  
        localStorage.setItem('status', JSON.stringify(tarefas));
        localStorage.setItem('legendas', JSON.stringify(objLeg));
    }

    
    
    return(
        <div>
            <div className="titulo-tarefas-conteiner">
                
                    
                        <div>
                            <h1 className="item-titulo-tarefa">Suas Tarefas</h1>
                            <div className="input-tarefa">
                                <p className="item-titulo-tarefa">Titulo da Tarefa</p>
                                <input className="item-titulo-tarefa" id="titulo-tarefa" type="text" value = {tarefa} onChange={(e)=>{setTarefa(e.target.value)}}/>
                                <p className="item-titulo-tarefa">Descrição da Tarefa</p>
                                <textarea className="item-titulo-tarefa" value={descricao} onChange={(e)=>{setDescricao(e.target.value)}} id="descricao-tarefa"></textarea>
                                <p>Selecione a cor que você deseja</p>
                                <select onChange={(e)=>{setCor(e.target.value)}} className="item-titulo-tarefa">
                                    <option value="amarelo" selected>amarelo</option>
                                    <option value="laranja">laranja</option>
                                    <option value="vermelho">vermelho</option>
                                    <option value="verde">verde</option>
                                    <option value="azul">azul</option>
                                </select>
                            </div>
                        </div>

                <div>
                    <h2>Legenda</h2>
                    
                        <div>
                            <h3>Digite a legenda para cada cor </h3>
                            {amareloB ?
                            <div>
                                <p>🟨 - Amarelo - {amareloLeg}</p>
                                <button onClick={()=>{setAmareloB(false)}}>Editar</button>
                            </div>
                            :
                            <div>
                                <p>🟨 - Amarelo</p>
                                <input type="text" value={amareloLeg}
                                onChange={(e)=>{setAmareloLeg(e.target.value)}}/>
                                <button onClick={()=>{setAmareloB(true)}}>Adicionar</button>
                                
                            </div>
                            }
                            {laranjaB ?
                            <div>
                                <p>🟧 - Laranja {laranjaLeg}</p>
                                <button onClick={()=>{setLaranjaB(false)}}>Editar</button>
                            </div>
                            :
                            <div>
                                <p>🟧 - Laranja</p>
                                <input type="text" value={laranjaLeg}
                                onChange={(e)=>{setLaranjaLeg(e.target.value)}}/>
                                <button onClick={()=>{setLaranjaB(true)}}>Adicionar</button>
                            </div>
                            }
                            {vermelhoB ?
                            <div>
                                <p>🟥 - Vermelho {vermelhoLeg}</p>
                                <button onClick={()=>{setVermelhoB(false)}}>Editar</button>
                            </div>
                            :
                            <div>
                                <p>🟥 - Vermelho</p>
                                <input type="text" value={vermelhoLeg}
                                onChange={(e)=>{setVermelhoLeg(e.target.value)}}/>
                                <button onClick={()=>{setVermelhoB(true)}}>Adicionar</button>
                            </div>
                            }
                            {verdeB ?
                            <div>
                                <p>🟩 - Verde {verdeLeg}</p>
                                <button onClick={()=>{setVerdeB(false)}}>Editar</button>
                            </div>
                            :
                            <div>
                                <p>🟩 - Verde</p>
                                <input type="text" value={verdeLeg}
                                onChange={(e)=>{setVerdeLeg(e.target.value)}}/>
                                <button onClick={()=>{setVerdeB(true)}}>Adicionar</button>
                            </div>
                            }
                            {azulB ?
                            <div>
                                <p>🟦 - Azul {azulLeg}</p>
                                <button onClick={()=>{setAzulB(false)}}>Editar</button>
                            </div>
                            :
                            <div>
                                <p>🟦 - Azul</p>
                                <input type="text" value={azulLeg}
                                onChange={(e)=>{setAzulLeg(e.target.value)}}/>
                                <button onClick={()=>{setAzulB(true)}}>Adicionar</button>
                            </div>
                            }
                            
                        </div>
                    
                </div>

            </div>
            <button className="item-titulo-tarefa" onClick={handleAdd}>Adicionar</button>
            <button onClick={saveStatus}>Salvar estado das Tarefas</button>
            <div className="conteiner-tarefas">
                <div className="tarefas" id="planejado">
                    <h2>Planejado</h2>
                    
                        {tarefas.map(tarefa => (
                            
                            
                                <Draggable defaultPosition={tarefa.posicao} key={tarefa.id}
                                bounds="body" 
                                onDrag={(e, ui)=>{
                                    setPosicao({x: posicao.x + ui.deltaX,
                                                y: posicao.y + ui.deltaY})
                                }} onStop={()=>{tarefa.posicao = posicao}}>
                                    <div className="tarefa" id={tarefa.cor}>
                                        <p>{tarefa.tarefa}</p>
                                        <div>
                                            <abbr title={tarefa.descricao} id="descricao-abbr">?</abbr>
                                            <button  onClick={()=>{handleDelete(tarefa.id)}} id="botao-delete">X</button>
                                        </div>
                                    </div>
                                </Draggable>
                            
                            
                        ))}
                    
                </div>

                <div className="tarefas" id="progresso">
                    <h2>Em progresso</h2>
                </div>

                <div className="tarefas" id="feito">
                    <h2>Feito</h2>
                </div>
            </div>
        </div>
    );
}