import React from "react";
import { TResidentInfoWithAddress } from "../getResidentRecord";
import getResidentRecord from "../getResidentRecord";

function useGetResidentRecord(residentUID?: string) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<null | any>(null);
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [data, setData] = React.useState<TResidentInfoWithAddress | null>(null);

    React.useEffect(() => {
        if(residentUID) {
            getResidentRecord(residentUID)
            .then(response => {
                setIsLoading(false);
                isError && setIsError(false);
                setIsSuccess(true);
                setData(response.data as TResidentInfoWithAddress)
            })
            .catch(err => {
                setIsLoading(false);
                setIsError(true);
                setError(err)
            })
        }
    }, [residentUID]);
    return {
        refetch: (residentUID: string) => {
            if(residentUID) {
                getResidentRecord(residentUID)
                .then(response => {
                    setIsLoading(false);
                    isError && setIsError(false);
                    setIsSuccess(true);
                    setData(response.data as TResidentInfoWithAddress)
                })
                .catch(err => {
                    setIsLoading(false);
                    setIsError(true);
                    setError(err)
                })
            }
        },
        isLoading,
        isSuccess,
        isUpdating,
        isError,
        error,
        data
    }
}

export default useGetResidentRecord;