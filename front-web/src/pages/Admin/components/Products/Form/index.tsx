import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: string;
}

const Form = () => {

    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '',
    }); 

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        //console.log({name, value});

        setFormData(data => ({...data, [name]: value}));
        
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="cadastrar um produto">
                <div className="row">
                    <div className="col-6">
                        <input type="text" className="form-control mb-4"
                        onChange={handleOnChange}
                        name="name" value={formData.name}
                        placeholder="Nome do produto"/>

                        <select name="category"  value={formData.category}
                            className="form-control mb-4"
                            onChange={handleOnChange}>
                                <option value="livros">Livros</option>
                                <option value="computadores">Computadores</option>
                                <option value="eletronicos">Eletrônicos</option>
                            </select>

                    
                        <input type="text" className="form-control"
                        onChange={handleOnChange}
                        name="price" value={formData.price}
                        placeholder="Preço do produto"/>

                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;