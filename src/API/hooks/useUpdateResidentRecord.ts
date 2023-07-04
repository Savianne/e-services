import React from "react";
import doRequest from "../doRequest";
import { TUpdateQuery } from "../../app/types/TUpdateRecordQuery";

function useUpdateResidentRecord() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<null | any>(null);
    
    return {
        updateResidentRecord: (residentUID: string, recordUpdates: TUpdateQuery, onSuccess: () => void | undefined) => {
            setIsLoading(true);
            doRequest({
                method: "PATCH",
                url: "/update-resident-record",
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
                setError("Internal Server Error");
            })
        },
        isLoading,
        isError,
        isSuccess,
        error,
    }
}

export default useUpdateResidentRecord;