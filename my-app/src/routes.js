import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    BrowserRouter
  } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Calculator from "./pages/Calculator"
import Cronometro from "./pages/Cronometro";
import Formulario from "./pages/Formulario/Cadastro";
import Login from "./pages/Formulario/Login";
import PssGen from "./pages/GeradorSenhas/PssGen";
import PssSaved from "./pages/GeradorSenhas/PssSaved";
import Testes from "./pages/Testes";
import Album from "./pages/Formulario/Album";
import Tarefas from "./pages/Tarefas";
const Rotas = ()=>{
    return(
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/calculadora" element={<Calculator />}/>
                <Route path="/cronometro" element={<Cronometro/>}/>
                <Route path="/pssgen" element={<PssGen/>}/>
                <Route path="/pssgen/saved" element ={<PssSaved/>}/>
                <Route path="/formulario" element ={<Login/>}/>
                <Route path="/formulario/cadastro" element ={<Formulario/>}/>
                <Route path="/testes" element ={<Testes/>}/>
                <Route path="/album/:id" element ={<Album/>}/>
                <Route path="/tarefas" element ={<Tarefas/>}/>
              
            </Routes>
        </Router>
    );
}

export default Rotas;