import React from "react";
// import styled from 'styled-components';
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

import { useTheme } from "@mui/material";
import { IStyledFC } from "./IStyledFC";

import AppHeader from "./AppHeader";
import AppTabs from "./AppTabs";
import SiteMapBoard from "./SiteMapBoard";

//MUI Component
import {
    Box
} from '@mui/material';

export const Container = styled(Box)`
    display: flex;
    flex: 0 1 100%;
    min-width: 0;
    height: fit-content;
    justify-content: center;
    background-color: ${(props) => props.theme.customTheme.mainBackground};
    padding: 50px 0;
`;

export const Content = styled(Box)`
    display: flex;
    flex: 0 1 1000px;
    min-width: 0;
    padding: 10px;
    height: fit-content;
    /* background-color: pink; */
`

const FCAppLayout: React.FC<IStyledFC> = ({className}) => {
    const theme = useTheme();
    return (
        <div className={className}>
            <AppHeader />
            <AppTabs />
            <Outlet />
        </div>
    )
}

const AppLayout = styled(FCAppLayout)`
    display: flex;
    flex: 0 1 100%;
    flex-wrap: wrap;
    height: fit-content;
    min-width: 0;
`

export default AppLayout;