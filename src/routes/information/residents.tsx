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
import ResidentsTable from "../../app/ResidentsTable";
import useGetResidentsRecord from "../../API/hooks/useGetResidentsRecord";

const TableContainer = styled(Box)`
    display: block;
    width: 100%;
    height: fit-content;
    padding: 10px;
`;

const TableContent = styled(Content)`
    flex: 0 1 1350px;
`;

const Residents: React.FC = () => {
    return (
        <>
            <SiteMapBoard title="Residents" path="/information / residents" />
            <Container>
                <TableContent>
                    <TableContainer>
                        <ResidentsTable />
                    </TableContainer>
                </TableContent>
            </Container>
        </>
    )
}

export default Residents;