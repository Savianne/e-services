import React from "react";
import { styled } from '@mui/material/styles';
import { IStyledFC } from "../../app/IStyledFC";

import SiteMapBoard from "../../app/SiteMapBoard";

import TermsOfServiceTable from "../../app/TermsOfServiceTable";

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


const TermsOfService: React.FC = () => {
    return (
        <>
            <SiteMapBoard title="Term of Service Table (Barangay)" path="/information / terms-of-service" />
            <Container>
                <Content>
                    <TableContainer>
                        <TermsOfServiceTable />
                    </TableContainer>
                </Content>
            </Container>
        </>
    )
}

export default TermsOfService;