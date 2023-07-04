import React, { useState } from 'react';
import styled from '@emotion/styled';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Avatar, Box, IconButton } from '@mui/material';

interface PersonOption {
  fullName: string;
  residentUID: string;
  picture: string | null
}

const ResidentSelector: React.FC<{onSelect: (e:PersonOption | null) => void, options: PersonOption[]}> = ({onSelect, options}) => {
  const [selectedOption, setSelectedOption] = useState<PersonOption | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<{}>, options: PersonOption | null) => {
    setSelectedOption(options);
    onSelect(options)
  };

  return (
    <Autocomplete
    sx={{width: '300px', marginTop: "10px"}}
    options={options}
    getOptionLabel={(option) => option.fullName}
    renderOption={(props, option) => (
        <Box component="li" sx={{fontSize: '11px'}} {...props}>
            <Avatar
            sx={{height: '30px', width: '30px', marginRight: '10px'}}
            src={`/assets/images/avatar${option.picture}`}
            alt=""
            />
            {option.fullName}
        </Box>
        )}

    value={selectedOption}
    onChange={handleOptionChange}
    renderInput={(params) => (
    <TextField {...params} size='small' label="Search resident" variant="outlined" />
    )}
    />

    );
};

const AutoCompleteModalDialog = styled(Dialog)`
    display: flex;
    flex: 0 1 300px;
`
export default ResidentSelector;
