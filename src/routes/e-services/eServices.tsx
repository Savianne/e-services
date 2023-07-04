import React from "react";

import { styled } from "@mui/material/styles";

import { useTheme } from "@mui/material";
import { IStyledFC } from "../../app/IStyledFC";

import SiteMapBoard from "../../app/SiteMapBoard";
import RecordsCard from "../../app/RecordsCard";

import SmsIcon from '@mui/icons-material/Sms';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

//MUI Component
import {
    Box
} from '@mui/material';

import { Container, Content } from "../../app/AppLayout";

const RouteContent = styled(Content)`
    flex-wrap: wrap;
`

const CardContainer = styled(Box)`
    display: flex;
    flex: 0 1 100%;
    flex-wrap: wrap;
    height: fit-content;
    column-gap: 20px;
    row-gap: 20px;
    padding: 0 10px;
    margin-bottom: 20px;
`;

const EServices: React.FC = () => {
    return (
        <>
            <SiteMapBoard title="E-Services" path="/e-services" />
            <Container>
                <RouteContent>
                    <CardContainer>
                        <RecordsCard title="SMS" icon={<SmsIcon/>} color="#009688" link="sms" />
                        <RecordsCard title="Document Request" recordsCount={15} icon={<ChecklistRtlIcon />} color="#607D8B" link="document-request" />
                    </CardContainer>
                    <CardContainer>
                        <RecordsCard title="Print Document" icon={<LocalPrintshopIcon/>} color="#3F51B5" link="print-document" />
                    </CardContainer>
                </RouteContent>
            </Container>
        </>
    )
}

export default EServices;