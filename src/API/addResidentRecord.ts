import axios from 'axios';
import { API_BASE_URL } from './BASE_URL';
import { TResponseFlag } from "./TResponseFlag";

type TAddress = {
    region: string,
    province: string,
    cityOrMunicipality: string,
    barangay: string,
    zone: number | string
} 

type TContactInfo = {
    email: string | null,
    cpNumber: string | null,
    telephoneNumber: string | null,
}

export type TResidentRecord = {
    personalInformation: {
        firstName: string,
        middleName: string,
        surName: string,
        extName: string | null, 
        maritalStatus: string,
        dateOfBirth: string,
        gender: string,
    },
    contactInformation: TContactInfo,
    homeContactInformation: TContactInfo,
    currentAddress: TAddress | null,
    permanentAddress: TAddress,
    senior_citizen: boolean
}

const addResidentRecord = (residentRecord: TResidentRecord) : Promise<TResponseFlag<string>> => {
    return new Promise<TResponseFlag<string>>((res, rej) => {
        axios.post(`${API_BASE_URL}/add-resident-record`, { residentRecord: residentRecord })
        .then(resonse => {
            const responseFlag = resonse.data as TResponseFlag<string>;
            responseFlag.success? res(responseFlag) : rej(responseFlag);
        })
        .catch(err => rej(err));
    })
}

export default addResidentRecord;