import React from "react";
import styled from "styled-components";

const FCResidentsRequestInteface: React.FC<{className?: string}> = ({className}) => {
    
    return (
        <div className={className}>

        </div>
    )
}

const ResidentsRequestInteface = styled(FCResidentsRequestInteface)`
    display: flex;
    flex: 0 1 1200px;
    height: 500px;
    background-color: white;
`;

export default ResidentsRequestInteface;