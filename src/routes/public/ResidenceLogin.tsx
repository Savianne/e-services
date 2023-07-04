import { Button, IconButton } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import React, { useState } from "react";
import styled from "styled-components";
import doRequest from "../../API/doRequest";
import useMediaQuery from '@mui/material/useMediaQuery';
import { CircularProgress, Snackbar, Alert } from "@mui/material";

const LoginButton = styled(Button)`
    height: 100%;
    width: 120px;
    font-size: 30px;
`;

type TUser = {
    picture: string | null,
    name: string,
    residentUID: string
}

const FCResidenceLogin: React.FC<{className?: string, onLoginSuccess: (e: TUser) => void}> = ({className, onLoginSuccess}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [inputVal, setInputVal] = useState("");

    const matches = useMediaQuery('(min-width:400px)');

    const handleLogin = () => {
        setIsLoading(true);
        doRequest<any>({
            method: "POST",
            url: '/login',
            baseURL: "http://localhost:3005/resident",
            data: { residentUID: inputVal}
        })
        .then((res) => {
            const user = res.data;
            isError && setIsError(false);
            setIsSuccess(true);
            setIsLoading(false);
            onLoginSuccess(user.user as TUser);
        })
        .catch(err => {
            setIsError(true);
            isSuccess && setIsSuccess(false);
            setIsLoading(false);
        })
    }
    return (
        <div className={className}>
            <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} type="text" placeholder="Login with your Resident ID"/>
            {
                matches? <LoginButton disabled={inputVal.length < 10} variant="contained" endIcon={isLoading? <CircularProgress size="20px" color="inherit" /> : <LoginIcon />}
                onClick={handleLogin}>
                Login
                </LoginButton> : <IconButton disabled={inputVal.length < 10} color="primary" onClick={handleLogin}>
                    {isLoading? <CircularProgress size="20px" color="inherit" /> : <LoginIcon />}
                </IconButton>
            }
            <Snackbar open={isError} autoHideDuration={6000} onClose={() => setIsError(false)}>
                <Alert onClose={() => setIsError(false)} severity="error" sx={{ width: '100%' }}>
                    Failed to login, please check your login info
                </Alert>
            </Snackbar>
        </div>
    )
};

const ResidenceLogin = styled(FCResidenceLogin)`
    display: flex;
    flex: 0 1 1000px;
    margin: 15px;
    height: 80px;
    padding: 5px;
    align-items: center;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);

    input,
    input:active,
    input:focus,
    input:hover {
        flex: 1;
        height: 100%;
        outline: 0;
        border: 0;
        border: 1px solid #8984842e;
        border-radius: 4px;
        font-size: 40px;
        padding: 0 10px;
        margin-right: 5px;
    }

    @media screen and (max-width: 670px) {
        input,
        input:active,
        input:focus,
        input:hover {
            font-size: 18px;
        }
    }

    @media screen and (max-width: 400px) {
        height: 50px;

        input,
        input:active,
        input:focus,
        input:hover {
            font-size: 13px;
        }
    }

    
`;

export default ResidenceLogin;