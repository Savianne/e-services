import React from "react";
import getResidentsRecord, { TResident } from "../getResidentsRecord";
import TResidentRecord from "../../app/types/TResidentRecord";
import getSeniorCitizenResidentsRecord from "../getSeniorCitizen";
import { chageShape } from "./useGetResidentsRecord";

function useGetSeniorCitizenResidentsRecord() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<null | any>(null);
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [data, setData] = React.useState<TResidentRecord[] | null>(null);

    React.useEffect(() => {
        setIsLoading(true);
        getSeniorCitizenResidentsRecord()
        .then(response => {
            setIsLoading(false);
            isError && setIsError(false);
            setIsSuccess(true);
            setData(chageShape(response.data as TResident[]))
        })
        .catch(err => {
            setIsLoading(false);
            setIsError(true);
            isSuccess && setIsSuccess(false);
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


export default useGetSeniorCitizenResidentsRecord;