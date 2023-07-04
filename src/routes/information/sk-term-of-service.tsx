import React from "react";
import { styled } from '@mui/material/styles';
import { IStyledFC } from "../../app/IStyledFC";

import SiteMapBoard from "../../app/SiteMapBoard";

import SKTermsOfServiceTable from "../../app/SKTermOfServiceTable";

//Mui Icons

//MUI Component
import {
    Box,
} from '@mui/material';

import { Container, Content } from "../../app/AppLayout";

const TableContainer = styled(Box)`
    display: block;
    width: 100%;
    height: fit-content;
    padding: 10px;
`;


const SKTermsOfService: React.FC = () => {
    return (
        <>
            <SiteMapBoard title="Term of Service Table (SK)" path="/information / terms-of-service / sk" />
            <Container>
                <Content>
                    <TableContainer>
                        <SKTermsOfServiceTable />
                    </TableContainer>
                </Content>
            </Container>
        </>
    )
}

export default SKTermsOfService;