import { useState } from "react/cjs/react.development";
import './tarefas.css'
import Draggable from "react-draggable";
export default function Tarefas(){

    const[tarefa, setTarefa] = useState('');
    const[tarefas, setTarefas] = useState([]);
    const[contador, setContador] = useState(0);

    

    function handleAdd(){
        let objTarefa = {id: contador,
                        tarefa: tarefa,
                        posicao: {x: -3, y: 10}}
        setTarefas([...tarefas, objTarefa]);
        setTarefa('');
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
                <h1 className="item-titulo-tarefa">Suas Tarefas</h1>
                <input className="item-titulo-tarefa" type="text" value = {tarefa} onChange={(e)=>{setTarefa(e.target.value)}}/>
                <button className="item-titulo-tarefa" onClick={handleAdd}>Adicionar</button>
            </div>

            <div className="conteiner-tarefas">
                <div className="tarefas" id="planejado">
                    <h2>Planejado</h2>
                    
                        {tarefas.map(tarefa => (
                            <Draggable defaultPosition={tarefa.posicao} key={tarefa.id}>
                                <div className="tarefa">
                                    <p >{tarefa.tarefa}</p>
                                    <button  onClick={()=>{handleDelete(tarefa.id)}}>X</button>
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