import { useState } from "react/cjs/react.development";

export default function Testes(){
    const[d1, setD1] = useState();
    const[d2, setD2] = useState();
    const[resr, setResr] = useState();

    function data1(){
        let d = new Date();
        // console.log("data " + d.getTime())
        setD1(d.getTime());
    }
    function data2(){
        let d = new Date();
        // console.log("data " + d.getTime())
        setD2(d.getTime());
    }
    function res(){
        let r = ((((d2-d1)/1000)/60)/60)/24;
        setResr(r);
    }
    return(
        <div>
            <button onClick={data1}>D1</button>
            <button onClick={data2}>D2</button>
            <button onClick={res}>D2</button>
            <p>teste:{resr}</p>
        </div>
    );
}