import React from "react";
import doRequest from "../doRequest";

function useGenerateDocument() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<null | any>(null);
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [data, setData] = React.useState<string | null>(null);

    return {
        generateDocument: (payload:{
            residentUID: string,
            type: string,
            purpose?: string
        }) => {
            setIsLoading(true);
            doRequest<string>({
                method: "POST",
                url: '/generate-pdf',
                data: payload
            })
            .then(response => {
                setIsLoading(false);
                isError && setIsError(false);
                setIsSuccess(true);
                setData(response.data? response.data : null);
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
        data
    }
}


export default useGenerateDocument;