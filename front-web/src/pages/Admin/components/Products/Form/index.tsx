import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

const Form = () => {

    const [name, setName] = useState(''); //Nome do Produto
    const [price, setPrice] = useState(''); //Preço do produto
    const [category, setCategory] = useState('computadores'); //Categoria do Produto

    const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleOnChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    }

    const handleOnChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    }

    const handleClick = () => {
        setName('devSuperior')
    }

    return (
        <BaseForm title="cadastrar um produto">
            <p className="my-5">
                Nome: {name} <br />
                Categoria: {category} <br />
                Preço: {price} <br />
            </p>
            <button className="btn btn-primary btn-lg my-5" onClick={handleClick}>
                Atualizar para "devsuperior"
            </button>
            <div className="row">
                <div className="col-6">
                    <input type="text" className="form-control mb-4"
                    onChange={handleOnChangeName}
                    value={name} placeholder="Nome do produto"/>

                    <select value={category} 
                        className="form-control mb-4"
                        onChange={handleOnChangeCategory}>
                            <option value="livros">Livros</option>
                            <option value="computadores">Computadores</option>
                            <option value="eletronicos">Eletrônicos</option>
                        </select>

                
                    <input type="text" className="form-control"
                    onChange={handleOnChangePrice}
                    value={price} placeholder="Preço do produto"/>

                </div>
            </div>
        </BaseForm>
    )
}

export default Form;