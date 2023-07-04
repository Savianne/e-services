import React from 'react';
import { Select, MenuItem } from '@mui/material';

interface IYearSelect {
  error?: boolean,
  value: string,
  onChange: (val:string) => void
}

const YearSelect:React.FC<IYearSelect> = ({error, value, onChange}) => {
  const currentYear = new Date().getFullYear();
  const startYear = 1901;
  const endYear = currentYear + 10;

  const renderYearOptions = () => {
    const options = [];
    for (let year = startYear; year <= endYear; year++) {
      options.push(
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      );
    }
    return options;
  };

  return (
    <Select error={error} value={value} onChange={(e) => onChange(e.target.value)} variant="outlined" size="small">
      {renderYearOptions()}
    </Select>
  );
};

export default YearSelect;