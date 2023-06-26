import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import React from "react";
import styled from "styled-components";

const LoginButton = styled(Button)`
    height: 100%;
    width: 120px;
    font-size: 30px;
`;

const FCResidenceLogin: React.FC<{className?: string}> = ({className}) => {

    return (
        <div className={className}>
            <input type="text" placeholder="Login with your Recidential ID"/>
            <LoginButton variant="contained" endIcon={<LoginIcon />}>
            Login
            </LoginButton>
        </div>
    )
};

const ResidenceLogin = styled(FCResidenceLogin)`
    display: flex;
    flex: 0 1 1000px;
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

    
`;

export default ResidenceLogin;