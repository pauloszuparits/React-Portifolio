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
                    <Link to="pssgen"> Password Generator</Link>
                </div>
            </header>
        </div>
    );
}