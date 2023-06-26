import React from "react";
import addResidenRecord from "../addResidentRecord";
import getResidentsRecord, { TResident } from "../getResidentsRecord";
import TResidentRecord from "../../app/types/TResidentRecord";

function useGetResidentsRecord() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<null | any>(null);
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [data, setData] = React.useState<TResidentRecord[] | null>(null);

    React.useEffect(() => {
        getResidentsRecord()
        .then(response => {
            setIsLoading(false);
            isError && setIsError(false);
            setIsSuccess(true);
            setData(chageShape(response.data as TResident[]))
        })
        .catch(err => {
            setIsLoading(false);
            setIsError(true);
            setError(err)
        })
    }, []);
    return {
        isLoading,
        isSuccess,
        isUpdating,
        isError,
        error,
        data
    }
}

function chageShape(data: TResident[]) {
    return data.map(from => {
        return {
            residentUID: from.residentUID,
            gender: from.gender,
            maritalStatus: from.maritalStatus,
            picture: from.picture,
            permanentAddress: from.permanentAddress,
            currentAddress: from.currentAddress,
            dateOfBirth: new Date(from.dateOfBirth).toDateString(),
            name: {
                firstName: from.firstName,
                lastName: from.surname,
                middleName: from.middleName,
                extName: from.extName
            },
            personalContactInfo: {
                personalEmail: from.personalEmail,
                personalCPNumber: from.personalCPNumber,
                personalTelNumber: from.personalTelNumber,
            },
            homeContactInfo: {
                homeEmail: from.homeEmail,
                homeCPNumber: from.homeCPNumber,
                homeTelNumber: from.homeTelNumber
            },
        } as TResidentRecord
    })
}

export default useGetResidentsRecord;