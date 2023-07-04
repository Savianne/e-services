import React from "react";
import addResidenRecord from "../addResidentRecord";
import { TResidentRecord } from "../addResidentRecord";

function useAddResidentRecord() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<null | any>(null);
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [residentUID, setResidentUID] = React.useState<null | string>(null);

    return {
        addResidenRecord: (residentRecord: TResidentRecord, onSuccess?: () => void, onError?: () => void, onLoading?:  () => void) => {
            setIsLoading(true);
            addResidenRecord(residentRecord)
            .then(response => {
                setIsLoading(false);
                isError && setIsError(false);
                setIsSuccess(true);
                onSuccess && onSuccess();
                onError && onError();
                onLoading && onLoading();
                console.log(response)
                response.data && setResidentUID(response.data)
            })
            .catch(err => {
                setIsLoading(false);
                setIsError(true);
                setError(err)
            })
        },
        isSuccess,
        isLoading,
        isUpdating,
        isError,
        error,
        residentUID
    }
}

export default useAddResidentRecord;