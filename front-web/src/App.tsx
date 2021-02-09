import React, { useState, useEffect } from 'react';

const App = () => {
    
    //React Hooks useStsate - Componente com estado
    const [counter, setCounter] = useState(0);

    //React Hook useEffect - Ciclo de Vida do componente
    useEffect(() => {
        console.log("Componente iniciado")
    }, []);

    return (
        <div className="container mt-5">
            <button className="btn btn-primary mr-5"
                onClick={() => setCounter(counter + 1)} 
            >
                +
            </button>
            <span>
                { counter }
            </span>
            <button className="btn btn-danger ml-5"
                onClick={() => setCounter(counter - 1)} 
            >
                -
            </button>             
            {counter > 5 && <h2 className="bg-primary text-light">O valor é maior do que 5</h2>}
            {counter <= 5 && <h2 className="bg-danger text-light">O valor é menor do que 5</h2>}
        </div>
    );
}

export default App;