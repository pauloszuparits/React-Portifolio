import { useState } from "react/cjs/react.development";

export default function Tarefas(){

    const[tarefa, setTarefa] = useState('');
    const[tarefas, setTarefas] = useState([]);
    const[contador, setContador] = useState(0);

    function handleAdd(){
        let objTarefa = {id: contador,
                        tarefa: tarefa}
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
            <h1>Suas Tarefas</h1>
            <input type="text" value = {tarefa} onChange={(e)=>{setTarefa(e.target.value)}}/>
            <button onClick={handleAdd}>Adicionar</button>
            <ul>
                {tarefas.map(tarefa => (
                    <div>
                        <li key={tarefa.id}>{tarefa.tarefa}</li>
                        <button onClick={()=>{handleDelete(tarefa.id)}}>X</button>
                    </div>
                ))}
            </ul>
        </div>
    );
}