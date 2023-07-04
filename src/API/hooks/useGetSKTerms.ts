import React from "react";
import doRequest from "../doRequest";
import getResidentsRecord, { TResident } from "../getResidentsRecord";
import { ISKOfficials } from "../../app/types/ISKOfficials";

function useGetSKTerms() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<null | any>(null);
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [data, setData] = React.useState<ISKOfficials[] | null>(null);

    React.useEffect(() => {
        doRequest<ISKOfficials[]>({
            method: "POST",
            url: '/get-sk-terms'
        })
        .then(response => {
            setIsLoading(false);
            isError && setIsError(false);
            setIsSuccess(true);
            console.log(response)
            setData(response.data? response.data : [])
        })
        .catch(err => {
            setIsLoading(false);
            setIsError(true);
            setError(err)
        })
    }, []);
    return {
        refetch: () => {
            doRequest<ISKOfficials[]>({
                method: "POST",
                url: '/get-terms'
            })
            .then(response => {
                setIsLoading(false);
                isError && setIsError(false);
                setIsSuccess(true);
                setData(response.data? response.data : [])
            })
            .catch(err => {
                setIsLoading(false);
                setIsError(true);
                setError(err)
            })
        },
        isLoading,
        isSuccess,
        isUpdating,
        isError,
        error,
        data
    }
}



export default useGetSKTerms;