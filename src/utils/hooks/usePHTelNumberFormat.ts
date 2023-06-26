import { useState, useEffect } from "react";

function usePHTelNumberFormat() {
    const [formattedValue, setFormattedValue] = useState("");

    
    return [
        formattedValue, 
        function (input: string) {
          const formattedNumericValue = formatPhoneNumber(input);
            setFormattedValue(formattedNumericValue);
        }
      ] as [string, (input: string) => void]
}

export function formatPhoneNumber(input: string): string {
    // Remove any non-digit characters from the input
  const digitsOnly = input.replace(/\D/g, '');

  // Check if the input has a valid length
  if (digitsOnly.length > 5) {
    if (digitsOnly.length <= 8) {
      return digitsOnly.replace(/(\d{4})(\d{1,4})/, '$1-$2');
    } else if (digitsOnly.length <= 10) {
      const areaCode = digitsOnly.substring(0, 2);
      const localExchangeCode = digitsOnly.substring(2, 6);
      const subscriberNumber = digitsOnly.substring(6);

      return `(${areaCode}) ${localExchangeCode}-${subscriberNumber}`;
    } else if (digitsOnly.length > 10) {
      const areaCode = digitsOnly.substring(0, 3);
      const localExchangeCode = digitsOnly.substring(3, 7);
      const subscriberNumber = digitsOnly.substring(7);

      return `(${areaCode}) ${localExchangeCode}-${subscriberNumber}`;
    }
  }

  // Return input as is if it doesn't meet the formatting condition
  return input;
}
export default usePHTelNumberFormat;