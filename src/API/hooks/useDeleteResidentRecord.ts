import React from "react";
import doRequest from "../doRequest";

function useDeleteResidentRecord() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<null | any>(null);
    
    return {
        deleteResident: (residentUID: string) => {
            setIsLoading(true);
            doRequest({
                method: "DELETE",
                url: "/delete-resident-record",
                data: { residentUID: residentUID }
            })
            .then(response => {
                setIsLoading(false);
                isError && setIsError(false);
                error && setError(null);
                setIsSuccess(true);
            })
            .catch(err => {
                setIsLoading(false);
                isSuccess && setIsSuccess(false);
                setIsError(true);
                setError("Internal Server Error");
            })
        },
        isLoading,
        isError,
        isSuccess,
        error,
    }
}

export default useDeleteResidentRecord;