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


import PssGen from "./GeradorSenhas/PssGen";
import PssSaved from "./GeradorSenhas/PssSaved";
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
            </Routes>
        </Router>
    );
}

export default Rotas;