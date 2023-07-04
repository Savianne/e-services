import axios from 'axios';
import { API_BASE_URL } from './BASE_URL';
import { TResponseFlag } from "./TResponseFlag";
import { TResident } from './getResidentsRecord';

export interface TResidentInfoWithAddress extends TResident {
    currentRegion: string,
    currentProvince: string,
    currentCityMun: string,
    currentBarangay: string,
    currentZone: string,
    permanentRegion: string,
    permanentProvince: string,
    permanentCityMun: string,
    permanentBarangay: string,
    permanentZone: string
}

const getResidentRecord = (residentUID: string) : Promise<TResponseFlag<TResidentInfoWithAddress>> => {
    return new Promise<TResponseFlag<TResidentInfoWithAddress>>((res, rej) => {
        axios.post(`${API_BASE_URL}/get-resident-record`, {residentUID: residentUID})
        .then(resonse => {
            const responseFlag = resonse.data as TResponseFlag<TResidentInfoWithAddress>;
            responseFlag.success? res(responseFlag) : rej(responseFlag);
        })
        .catch(err => rej(err));
    })
}

export default getResidentRecord;

