import React from "react";
import doRequest from "../doRequest";
import { ISKTerm } from "../../app/types/ITerm";

function useAddSKTerm() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<null | any>(null);
    const [isUpdating, setIsUpdating] = React.useState(false);
    // const [data, setData] = React.useState< null>(null);
    return {
        addSKTerm: (term: ISKTerm) => {
            setIsLoading(true);
            doRequest({
                method: "POST",
                url: "/add-sk-term",
                data: term
            })
            .then(response => {
                setIsLoading(false);
                isError && setIsError(false);
                setIsSuccess(true);
            })
            .catch(err => {
                setIsLoading(false);
                setIsError(true);
                isSuccess && setIsSuccess(false);
                setError(err)
            })
        },
        isLoading,
        isSuccess,
        isUpdating,
        isError,
        error,
    }
}

export default useAddSKTerm;