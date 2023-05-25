import React from "react";

import { styled } from "@mui/material/styles";

import { useTheme } from "@mui/material";
import { IStyledFC } from "../../app/IStyledFC";

import SiteMapBoard from "../../app/SiteMapBoard";

//MUI Component
import {
    Box
} from '@mui/material';

import { Container, Content } from "../../app/AppLayout";


const EServices: React.FC = () => {
    return (
        <>
            <SiteMapBoard title="E-Services" path="/e-services" />
            <Container>
                <Content>
                    E-services
                </Content>
            </Container>
        </>
    )
}

export default EServices;