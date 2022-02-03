import { Link } from "react-router-dom";
import "./header.css"
export default function Header(){
    return(
        <div>
            <header>
                <h2 id="logo">
                    <Link to="/">Meus Projetos</Link>
                </h2>
                <div className="links">
                    <Link to="/calculadora">Calculadora</Link>
                    <Link to="/cronometro">Cronometro</Link>
                    <Link to="/pssgen"> Password Generator</Link>
                    <Link to="/formulario"> Formulario</Link>
                    <Link to="/tarefas"> Tarefas</Link>
                    <Link to="/testes"> Área de testes</Link>
                </div>
            </header>
        </div>
    );
}