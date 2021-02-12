import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { makeRequest } from '../../core/utils/requests';
import ProductCard from './Components/ProductCard';
import './styles.scss';

const Catalog = () => {
    //quando o componente iniciar, buscar a lista de produtos
    //quando a lista de produtos estiver disponível,
    //popular um estado do componente, e listar os produtos dinamicamente
    useEffect(() => {
        console.log('Catalog: Componente de listagem de produtos iniciado.')
        //Limitações fetch API:
        // - Muito verboso
        // - Não tem suporte nativo para ler progresso de upload de arquivos
        // - Não tem suporte nativo para enviar query strings
        /**
         * fetch('http://localhost:3000/products') **Proxy**
         * .then(response => response.json())
         * .then(response => console.log(response));
         */
        //axios('http://localhost:3000/products')
        
        const params = {
            page: 0,
            linesPerPage: 12,
            direction: 'DESC',
            orderBy: 'id',
        }

        makeRequest({ url: '/products', params })
        .then(response => console.log(response));

    }, []);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catalogo de produtos</h1>
            <div className="catalog-products border-radius-10">
                <Link to="/products/1"><ProductCard /></Link>
                <Link to="/products/2"><ProductCard /></Link>
                <Link to="/products/3"><ProductCard /></Link>
                <Link to="/products/4"><ProductCard /></Link>
                <Link to="/products/5"><ProductCard /></Link>
                <Link to="/products/6"><ProductCard /></Link>
                <Link to="/products/7"><ProductCard /></Link>
                <Link to="/products/8"><ProductCard /></Link>
                <Link to="/products/9"><ProductCard /></Link>
            </div>
        </div>
    );
}

export default Catalog;