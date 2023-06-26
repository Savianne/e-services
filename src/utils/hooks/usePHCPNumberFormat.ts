import { useState, useEffect } from "react";

function usePHCPNumberFormat() {
    const [formattedValue, setFormattedValue] = useState("");
    
    return [
        formattedValue, 
        function (input: string) {
            const formattedNumericValue = formatToPHCPNumberValue(input);
            setFormattedValue(formattedNumericValue); // Pass the unformatted numeric value to the onChange function
        }
    ] as [string, (input: string) => void]
}

export function formatToPHCPNumberValue(inputValue:string) {
    const numericValue = inputValue.replace(/\D/g, "").slice(0, 11); // Remove non-numeric characters and limit to 11 digits
    const formattedNumericValue = numericValue.replace(/(\d{0,4})(\d{0,3})(\d{0,4})/, (_, p1, p2, p3) => {
    let parts = [];
    if (p1) parts.push(p1);
    if (p2) parts.push(p2);
    if (p3) parts.push(p3);
    return parts.join("-");
    }); // Format the numeric value as XXXX-XXX-XXXX

    return formattedNumericValue;
}

export default usePHCPNumberFormat;