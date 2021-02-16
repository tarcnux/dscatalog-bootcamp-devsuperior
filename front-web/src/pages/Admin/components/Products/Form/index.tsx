import { makeRequest } from 'core/utils/requests';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {

    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '1',
        description: '',
    }); 

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        //console.log({name, value});

        setFormData(data => ({...data, [name]: value}));
        
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://res.cloudinary.com/gametecgroup/image/upload/c_fit,f_auto,h_1000,w_1000/c_fit,g_south,l_watermark,o_50,w_250,x_5,y_5/console-xbox-one-x-1tb-white-white-new-576826_1',
            categories: [{id: parseInt(formData.category)}]
        }
        //console.log(payload);
        makeRequest({
            url: '/products',
            method: 'POST',
            data: payload,
        }).then(() => {
            setFormData({name: '', category: '', price: '', description: ''});
        });
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
                                <option value="2">Livros</option>
                                <option value="3">Computadores</option>
                                <option value="1">Eletrônicos</option>
                            </select>

                    
                        <input type="text" className="form-control"
                        onChange={handleOnChange}
                        name="price" value={formData.price}
                        placeholder="Preço do produto"/>

                    </div>
                    <div className="col-6">
                        <textarea
                            onChange={handleOnChange}
                            name="description" 
                            value={formData.description}
                            className="form-control"
                            id="" cols={30} rows={10} />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;