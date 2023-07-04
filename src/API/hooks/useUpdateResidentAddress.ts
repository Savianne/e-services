import React from "react";
import doRequest from "../doRequest";
import { TUpdateResidentAddressQuery } from "../../app/types/TUpdateResidentAddress";

function useUpdateResidentAddress() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<null | any>(null);
    
    return {
        updateResidentAddress: (residentUID: string, recordUpdates: TUpdateResidentAddressQuery, onSuccess: () => void | undefined, onError: () => void | undefined) => {
            setIsLoading(true);
            doRequest({
                method: "PATCH",
                url: "/update-resident-address",
                data: { residentUID: residentUID, recordUpdates: recordUpdates }
            })
            .then(response => {
                setIsLoading(false);
                isError && setIsError(false);
                error && setError(null);
                setIsSuccess(true);
                onSuccess && onSuccess()
            })
            .catch(err => {
                setIsLoading(false);
                isSuccess && setIsSuccess(false);
                setIsError(true);
                onError && onError();
                setError("Internal Server Error");
            })
        },
        isLoading,
        isError,
        isSuccess,
        error,
    }
}

export default useUpdateResidentAddress;