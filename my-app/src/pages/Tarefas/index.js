import { useState } from "react/cjs/react.development";
import './tarefas.css'
import Draggable from "react-draggable";
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
    const posicao = {x: -3, y: 10}
    
    //select color value
    const[cor, setCor] = useState("amarelo");


    function handleAdd(){
        
        let objTarefa = {id: contador,
                        tarefa: tarefa,
                        descricao: descricao.length === 0 ? 'Tarefa sem descrição' : descricao,
                        cor: cor
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
                            <p>🟨 - Amarelo - {amareloLeg}</p>
                            :
                            <div>
                                <p>🟨 - Amarelo</p>
                                <input type="text" value={amareloLeg}
                                onChange={(e)=>{setAmareloLeg(e.target.value)}}/>
                                <button onClick={()=>{setAmareloB(true)}}>Adicionar</button>
                            </div>
                            }
                            {laranjaB ?
                            <p>🟧 - Laranja {laranjaLeg}</p>
                            :
                            <div>
                                <p>🟧 - Laranja</p>
                                <input type="text" value={laranjaLeg}
                                onChange={(e)=>{setLaranjaLeg(e.target.value)}}/>
                                <button onClick={()=>{setLaranjaB(true)}}>Adicionar</button>
                            </div>
                            }
                            {vermelhoB ?
                            <p>🟥 - Vermelho {vermelhoLeg}</p>
                            :
                            <div>
                                <p>🟥 - Vermelho</p>
                                <input type="text" value={vermelhoLeg}
                                onChange={(e)=>{setVermelhoLeg(e.target.value)}}/>
                                <button onClick={()=>{setVermelhoB(true)}}>Adicionar</button>
                            </div>
                            }
                            {verdeB ?
                            <p>🟩 - Verde {verdeLeg}</p>
                            :
                            <div>
                                <p>🟩 - Verde</p>
                                <input type="text" value={verdeLeg}
                                onChange={(e)=>{setVerdeLeg(e.target.value)}}/>
                                <button onClick={()=>{setVerdeB(true)}}>Adicionar</button>
                            </div>
                            }
                            {azulB ?
                            <p>🟦 - Azul {azulLeg}</p>
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
            <div className="conteiner-tarefas">
                <div className="tarefas" id="planejado">
                    <h2>Planejado</h2>
                    
                        {tarefas.map(tarefa => (
                            
                            
                                <Draggable defaultPosition={posicao} key={tarefa.id}
                                bounds="body">
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