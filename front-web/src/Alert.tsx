import React from 'react';

type Props = {
    text?: string;
}

const Alert = ({ text }: Props) => {
    return (
        <div className="alert alert-primary">
            Alert Tarcnux {text}!
        </div>
    );
}

export default Alert;