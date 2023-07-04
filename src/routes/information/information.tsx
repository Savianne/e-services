import React from "react";
// import styled from 'styled-components';
import { styled } from "@mui/material/styles";

import { useTheme } from "@mui/material";
import { IStyledFC } from "../../app/IStyledFC";

import SiteMapBoard from "../../app/SiteMapBoard";

//Mui Icons
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import Groups3RoundedIcon from '@mui/icons-material/Groups3Rounded';

//MUI Component
import {
    Box,
} from '@mui/material';

import { Container, Content } from "../../app/AppLayout";
import RecordsCard from "../../app/RecordsCard";

const InformationRouteContent = styled(Content)`
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

const Information: React.FC = () => {
    return (
        <>
            <SiteMapBoard title="Information" path="/information" />
            <Container>
                <InformationRouteContent>
                    <CardContainer>
                        <RecordsCard title="Residents"  icon={<GroupsRoundedIcon />} color="#19fd22" link="residents" />
                        <RecordsCard title="Senior Citizens of Brgy. Sandiat Centro"  icon={<Groups3RoundedIcon />} color="#607D8B" link="senior-citizens" />
                        {/* <RecordsCard title="Brgy. Officials ( Current Term )" recordsCount={15} icon={<Groups3RoundedIcon />} color="#00bcd4" link="brgy-officials" /> */}
                    </CardContainer>
                    <CardContainer>
                        <RecordsCard title="Term of Service (Barangay)" icon={<Groups3RoundedIcon />} color="#00bcd4" link="terms-of-service" />
                        <RecordsCard title="Term of Service (SK)" icon={<Groups3RoundedIcon />} color="#E91E63" link="terms-of-service-sk" />
                    </CardContainer>
                </InformationRouteContent>
            </Container>
        </>
    )
}

export default Information;