import React from "react";
import { styled } from '@mui/material/styles';

import SiteMapBoard from "../../app/SiteMapBoard";
//Mui Icons

//MUI Component
import {
    Box,
    Snackbar,
    Alert
} from '@mui/material';

import { Container, Content } from "../../app/AppLayout";
import SeniorCitizenTable from "../../app/SeniorCitizenTable";

const TableContainer = styled(Box)`
    display: block;
    width: 100%;
    height: fit-content;
    padding: 10px;
`;

const TableContent = styled(Content)`
    flex: 0 1 1350px;
`;

const SeniorCitizens: React.FC = () => {
    return (
        <>
            <SiteMapBoard title="Senior Citizens" path="/information / senior-citizens" />
            <Container>
                <TableContent>
                    <TableContainer>
                        <SeniorCitizenTable />
                    </TableContainer>
                </TableContent>
            </Container>
        </>
    )
}

export default SeniorCitizens;