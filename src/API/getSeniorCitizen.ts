import axios from 'axios';
import { API_BASE_URL } from './BASE_URL';
import { TResponseFlag } from "./TResponseFlag";
import { TResident } from './getResidentsRecord';

const getSeniorCitizenResidentsRecord = () : Promise<TResponseFlag<TResident[]>> => {
    return new Promise<TResponseFlag<TResident[]>>((res, rej) => {
        axios.post(`${API_BASE_URL}/get-senior-citizens`)
        .then(resonse => {
            const responseFlag = resonse.data as TResponseFlag<TResident[]>;
            responseFlag.success? res(responseFlag) : rej(responseFlag);
        })
        .catch(err => rej(err));
    })
}

export default getSeniorCitizenResidentsRecord;

