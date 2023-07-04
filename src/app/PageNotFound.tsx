import React from "react";
import styled from "@emotion/styled";

import { 
    Box,
    Button
} from "@mui/material";


const PageNotFoundContainer = styled(Box)`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: white;
    z-index: 10000;
    flex-wrap: wrap;
    align-content: flex-start;
`;

const Image404 = styled.img`
    height: 40%;
    flex-grow: 0;
    margin-top: 50px;
`;

const StrongText = styled.strong`
    flex: 0 1 100%;
    text-align: center;
    margin-top: 30px;
    font-size: 35px;
    font-weight: 200;
    color: gray;
`;

const LightText = styled.strong`
    flex: 0 1 600px;
    text-align: center;
    margin-top: 15px;
    font-size: 15px;
    font-weight: 200;
    color: gray;
`;

const PageNotFound: React.FC = () => {
    return (
    <PageNotFoundContainer>
        <Image404 src="/assets/images/404.png" />
        <StrongText>
            Uh oh. Page not found.
        </StrongText>
        <LightText>
        The page you are looking for could not be found. It may have been moved, deleted, or never existed in the first place.
        </LightText>
        <Box sx={{
            flex: "0 1 100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px"
        }}>
            <Button size="large" href="/admin/home">
                GO HOME
            </Button>
        </Box>
    </PageNotFoundContainer>
    )
}

export default PageNotFound;