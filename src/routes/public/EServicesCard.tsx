import React from "react";
import styled from "styled-components";

const EServicesCard = styled.div`
    display: flex;
    flex: 0 1 300px;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    padding: 20px;
    min-width: 300px;
    min-height: 300px;
    background-color: white;
    border-radius: 5px;
    background: #e0e0e0;
    box-shadow:  20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff;

    .card-title {
        font-size: 30px;
        font-weight: 600;
        text-align: center;
    }
`;

export default EServicesCard;
