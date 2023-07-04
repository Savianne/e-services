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
import AddIcon from '@mui/icons-material/Add';

interface PersonOption {
  fullName: string;
  residentUID: string;
  picture: string | null
}

const AutocompleteModal: React.FC<{onSelect: (e:PersonOption) => void, options: PersonOption[]}> = ({onSelect, options}) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<PersonOption | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (event: React.ChangeEvent<{}>, options: PersonOption | null) => {
    setSelectedOption(options);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onSelect(selectedOption);
    }

    handleClose();
  };

  return (
    <div>
        <IconButton sx={{marginLeft: '5px'}} aria-label="delete" size="large" 
            onClick={handleOpen}>
            <AddIcon fontSize="inherit" />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select a Resident</DialogTitle>
            <DialogContent>
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
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
                Select
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
};

const AutoCompleteModalDialog = styled(Dialog)`
    display: flex;
    flex: 0 1 300px;
`
export default AutocompleteModal;
