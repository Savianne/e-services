import React from "react";
import { styled } from "@mui/material/styles";

import { IStyledFC } from "./IStyledFC";

//MUI Icons
import AccountTreeIcon from '@mui/icons-material/AccountTree';

//MUI Components
import {
    Box
} from '@mui/material';

interface IFCSiteMapBoard extends IStyledFC {
    title?: string,
    path?: string,
}
const FCSiteMapBoard: React.FC<IFCSiteMapBoard> = ({className, title, path, children}) => {
    return (
        <div className={className}>
            <img className="logo" src={`${window.location.origin}/logo.png`} />
            <div className="board-content">
                {
                    children? children : <>
                        <h1>{title}</h1>
                        <span><AccountTreeIcon /> <p>{path}</p></span>
                    </>
                }
            </div>
        </div>
    )
}

const SiteMapBoard = styled(FCSiteMapBoard)`
    position: relative;
    display: flex;
    flex: 0 1 100%;
    height: 200px;
    align-items: center;
    justify-content: center;
    background-color: rgb(68, 84, 106);
    overflow: hidden;
    font-size: 30px;
    color: white;

    .board-content {
        display: flex;
        flex-wrap: wrap;
        flex: 0 1 1000px;
        height: fit-content;
        align-items: center;
        padding: 0 15px;
    }
    
    .board-content h1,
    .board-content span {
        font-size: 1em;
        flex: 0 1 100%;
        margin: 0;
        font-weight: 100;
        color: white;
    }

    .board-content span {
        color: #b0b0b0;
        display: flex;
        align-items: center;
    }

    .board-content span p {
        margin: 0;
        margin-left: 5px;
        font-size: 1rem;
    }

    .logo {
        position: absolute;
        width: 700px;
        height: 700px;
        left: -5%;
        opacity: 0.1;
        pointer-events: none;
    }
`

export default SiteMapBoard;