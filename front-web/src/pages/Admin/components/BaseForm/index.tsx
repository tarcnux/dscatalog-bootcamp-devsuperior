import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

type Props = {
    title: string;
    children: React.ReactNode;
}

const BaseForm = ({ title, children }: Props) => {

    const history = useHistory();
    const handleCancel = () => {
        history.goBack();
    }

    return (
        <div className="admin-base-form card-base">
            <h1 className="base-form-title">
                {title}
            </h1>
            {children}
            <div className="base-form-actions">
                <button onClick={handleCancel}
                    className="btn btn-outline-danger text-uppercase border-radius-10 mr-3">
                    cancelar
                </button>
                <button className="btn btn-primary text-uppercase border-radius-10 mr-3">
                    cadastrar
                </button>
            </div>
        </div>
    );
}

export default BaseForm;