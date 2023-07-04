import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './BASE_URL';
import { TResponseFlag } from "./TResponseFlag";

interface IServerResponseFlag {
    success: boolean;
    error?: any;
    data?: any;
}

const doRequest = <T>(config: AxiosRequestConfig) : Promise<TResponseFlag<T>> => {
    return new Promise<TResponseFlag<T>>((res, rej) => {
        axios({
            baseURL: API_BASE_URL,
            ...config,
        })
        .then(response => {
            const serverResponseFla = response.data as IServerResponseFlag;
            serverResponseFla.success? res(serverResponseFla) : rej(serverResponseFla);
        })
        .catch(error => {
            rej({success: false, error})
        })
    })
}

export default doRequest;