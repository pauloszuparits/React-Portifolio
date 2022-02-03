import { useState } from "react/cjs/react.development";

export default function Tarefas(){

    const[tarefa, setTarefa] = useState('');
    const[tarefas, setTarefas] = useState([]);

    
    return(
        <div>
            <h1>Suas Tarefas</h1>
            <input type="text" value = {tarefa} onChange={(e)=>{setTarefa(e.target.value)}}/>
            <button onClick={()=>{setTarefas([...tarefas, tarefa]);
            setTarefa('');}}>Adicionar</button>
            <ul>
                {tarefas.map(tarefa => (
                    <li key={tarefa}>{tarefa}</li>
                ))}
            </ul>
        </div>
    );
}