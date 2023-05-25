import React, { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { IStyledFC } from "./IStyledFC";

//MUI Component
import {
    Box,
    Paper
} from '@mui/material';

const RecordsCardStyles = styled(Paper)<{color: string}>`
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 470px;
    min-width: 300px;
    height: 200px;
    background-color: ${(props) => props.theme.customTheme.mainBackground};
    overflow: hidden;
    cursor: pointer;

    
    /* .top-left-corner,
    .bottom-right-corner {
        position: absolute;
        left: -75%;
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.color};
        transform: rotate(-45deg);
    } */
    
    .top-left-corner,
    .bottom-right-corner {
        position: absolute;
        left: -170%;
        display: inline-block;
        width: 300%;
        height: 100%;
        background-color: ${(props) => props.color};
        transform: rotate(-45deg);
    }

    :hover .top-left-corner {
        transition: left 100ms ease-in-out;
        left: -155%;
    }

    .top-left-corner {
        top: -5%;
    }

    /* .bottom-right-corner {
        left: 85%;
        opacity: 0.7;
        bottom: -5%;
    } */

    .bottom-right-corner {
        left: -15%;
        opacity: 0.7;
        bottom: -5%;
    }

    .content {
        display: flex;
        flex: 0 1 100%;
        margin-left: 15%;
        height: fit-content;
        flex-wrap: wrap;
        z-index: 1;
    }

    .content h1 {
        display: flex;
        flex: 0 1 100%;
        margin: 0;
    }

    .content span h3 {
        margin: 0;
    }

    .icon {
        position: absolute;
        right: 15px;
        bottom: -20px;
    }

    .icon svg {
        font-size: 150px;
        opacity: 0.2;
    }
`;

interface IFCRecordsCard {
    title: string,
    recordsCount: number,
    color: string,
    icon: ReactNode,
    link: string,
}

const RecordsCard:React.FC<IFCRecordsCard> = ({title, recordsCount, icon, color, link}) => {
    const navigate = useNavigate();
    return (
        <RecordsCardStyles elevation={6} color={color} onClick={(e) => navigate(link)}>
            <div className="top-left-corner" />
            <div className="bottom-right-corner" />
            <div className="content">
                <h1>{title}</h1>
                <span><h3>{recordsCount}</h3>Records</span>
            </div>
            <i className="icon">{icon}</i>
        </RecordsCardStyles>
    )
}

export default RecordsCard;