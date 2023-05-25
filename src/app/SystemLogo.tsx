import React from "react";
import { styled } from "@mui/material/styles";
import { 
    Typography
} from "@mui/material";

import { IStyledFC } from "./IStyledFC";

const FCSystemLogo: React.FC<IStyledFC> = ({className}) => {

    return (
        <div className={className}>
            <img className="logo" src="assets/images/favlogo.png" /> 
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
        height: 50px;
        width: 50px;
    }
`;

export default SystemLogo
