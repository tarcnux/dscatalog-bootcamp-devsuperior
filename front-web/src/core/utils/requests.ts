import axios, { Method } from 'axios';

type RequestParams = {
    method?: Method; //Não é obrigatório
    url: string;
    data?: object; //Não é obrigatório
    params?: object; //Não é obrigatório
}

const BASE_URL = 'http://localhost:3000';

export const makeRequest = ({method = 'GET', url, data, params}: RequestParams) => {
    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params,
    });
};