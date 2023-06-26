import React from "react";
import { styled } from "@mui/material/styles";
import { 
    Typography
} from "@mui/material";

import { IStyledFC } from "./IStyledFC";

const FCSystemLogo: React.FC<IStyledFC> = ({className}) => {

    return (
        <div className={className}>
            <img className="logo" src="/logo.png" /> 
        </div>
    )
}


const SystemLogo = styled(FCSystemLogo)`
    display: flex;
    width: fir-content;
    height: 100%;
    align-items: center;

    & .logo {
        display: inline-block;
        height: 80px;
        /* width: 90px; */
    }
`;

export default SystemLogo
