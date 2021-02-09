import React from 'react';
import Alert from './Alert';

const App = () => {
    return (
        <div className="container mt-5">
            <Alert text=" meu mundão"/>
            <Alert /> 
            <Alert />
            <Alert text=" meu mundululu"/>
        </div>
    );
}

export default App;