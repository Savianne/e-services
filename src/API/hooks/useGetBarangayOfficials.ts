import React from "react";
import doRequest from "../doRequest";
import getResidentsRecord, { TResident } from "../getResidentsRecord";
import { IBarangayOfficials } from "../../app/types/IbarangayOfficials";

function useGetBarangayOfficials() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<null | any>(null);
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [data, setData] = React.useState<IBarangayOfficials[] | null>(null);

    React.useEffect(() => {
        doRequest<IBarangayOfficials[]>({
            method: "POST",
            url: '/barangay-officials',
            baseURL: "http://localhost:3005/"
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
    }, []);
    return {
        refetch: () => {
            doRequest<IBarangayOfficials[]>({
                method: "POST",
                url: '/barangay-officials',
                baseURL: "http://localhost:3005/"
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



export default useGetBarangayOfficials;