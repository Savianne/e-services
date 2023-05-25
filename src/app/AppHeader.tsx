import React from "react";
// import styled from "styled-components";
import { styled } from "@mui/material/styles"; 

import { IStyledFC } from "./IStyledFC";

import SystemLogo from "./SystemLogo";
import AdminDropDown from "./AdminDropDown";

const FCAppHeader: React.FC<IStyledFC> = ({className}) => {
    return (
        <div className={className}>
            <div className="header-content">
                <SystemLogo />
                <span>
                    <h1>Brgy. Sandiat Centro</h1>
                    <h2>Information and E-Services System</h2>
                </span>
                <AdminDropDown />
            </div>
        </div>
    )
}

const AppHeader = styled(FCAppHeader)`
    position: sticky;
    top: 0;
    display: flex;
    flex: 0 1 100%;
    height: 65px;
    justify-content: center;
    backdrop-filter: blur(30px);
    background-color: ${(props) => props.theme.customTheme.mainBackground};
    border-bottom: 1px solid ${(props) => props.theme.customTheme.borderColor};
    z-index: 1000;
   
    & .header-content {
        display: flex;
        flex: 0 1 1350px;
        height: 100%;
        align-items: center;
        padding: 0 15px;
    }

    & span {
        display: flex;
        flex-wrap: wrap;
        height: fit-content;
        margin-left: 10px;
    }

    & span h1,
    & span h2 {
        margin: 0;
    }

    & span h1 {
        flex: 0 1 100%;
        font-size: 20px;
    }

    & span h2 {
        font-size: 13px;
        color: rgb(18 141 229 / 44%);
    }

    @media screen and (max-width: 485px) {
        & span {
            display: none;
        }
    }
`;

export default AppHeader;