import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ProductResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/requests';
import ProductCard from './Components/ProductCard';
import ProductCardLoader from './Components/ContentLoaders/ProductCardLoader';
import './styles.scss';
import Pagination from 'core/components/Pagination';

const Catalog = () => {

    //Estado do carregamento da página
    const [isLoading, setIsloading] = useState(false);

    //quando o componente iniciar, buscar a lista de produtos
    //quando a lista de produtos estiver disponível,
    //popular um estado do componente, e listar os produtos dinamicamente
    const [productsResponse, setProductsResponse] = useState<ProductResponse>();

    //console.log(productsResponse);

    //quando o componente iniciar, buscar a lista de produtos
    useEffect(() => {
        //console.log('Catalog: Componente de listagem de produtos iniciado.')
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
            direction: 'ASC',
            orderBy: 'id',
        }
        //Iniciar o Loader
        setIsloading(true);
        makeRequest({ url: '/products', params })
        .then(response => setProductsResponse(response.data))
        .finally(() => {
            //Finalizar o loader
            setIsloading(false);
        });

    }, []);//É chamado apenas quando o componente iniciar

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catalogo de produtos</h1>
            <div className="catalog-products border-radius-10">
                {isLoading ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product}/>
                        </Link>
                    ))
                )} 
            </div>
            <Pagination />
        </div>
    );
}

export default Catalog;