import axios from 'axios';
import { API_BASE_URL } from './BASE_URL';
import { TResponseFlag } from "./TResponseFlag";

export type TResident = {
    residentUID: string,
    picture: string | null,
    firstName: string,
    middleName: string,
    surname: string,
    extName: string | null,
    gender: string,
    maritalStatus: string,
    dateOfBirth: string,
    personalEmail: string | null,
    personalCPNumber: string | null,
    personalTelNumber: string | null,
    homeEmail: string | null,
    homeCPNumber: string | null,
    homeTelNumber: string | null,
    currentAddress: string,
    permanentAddress: string
}

const getResidentsRecord = () : Promise<TResponseFlag<TResident[]>> => {
    return new Promise<TResponseFlag<TResident[]>>((res, rej) => {
        axios.post(`${API_BASE_URL}/get-residents-record`)
        .then(resonse => {
            const responseFlag = resonse.data as TResponseFlag<TResident[]>;
            responseFlag.success? res(responseFlag) : rej(responseFlag);
        })
        .catch(err => rej(err));
    })
}

export default getResidentsRecord;

