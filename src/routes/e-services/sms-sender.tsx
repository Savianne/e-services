import { styled } from "@mui/material/styles";
import React from "react";
import { Container, Content } from "../../app/AppLayout";

import { 
    Paper,
    Box
} from "@mui/material";

const RouteContent = styled(Content)`
    flex-wrap: wrap;
`
const TableContainer = styled(Paper)`
    display: flex;
    flex: 0 1 1000px;
    height: 500px;
    padding: 10px;
    background-color: ${({theme}) => theme.customTheme.mainBackground};
`;


const SmsSender: React.FC = () => {
    return (
        <>
            <Container>
                <RouteContent>
                    <TableContainer>

                    </TableContainer>
                </RouteContent>
            </Container>
        </>
    )
}

export default SmsSender;
