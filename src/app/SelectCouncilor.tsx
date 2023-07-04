import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Avatar, Box, IconButton, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import doRequest from '../API/doRequest';

interface PersonOption {
  fullName: string;
  residentUID: string;
  picture: string | null,
}

interface PersonOptionWithCommittee extends PersonOption {
  committee: string,
  committeeID: string | number
}

type TCommittee = {
  id: string,
  committee: string
}
const SelectBarangayCouncilorModal: React.FC<{onSelect: (e:PersonOptionWithCommittee) => void, options: PersonOption[], org: "barangay" | "sk"}> = ({onSelect, options, org}) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<PersonOption | null>(null);
  const [selectCommitte, setSelectCommittee] = useState("");
  const [committee, setCommittee] = useState<null | TCommittee[]>(null);
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
    if (selectedOption && selectCommitte && committee) {
      const selected_committee = committee.filter(i => i.id == selectCommitte);
      onSelect({
        ...selectedOption,
        committee:  selected_committee[0].committee,
        committeeID: selectCommitte
      });

      setSelectCommittee("");
      setSelectedOption(null);
    }

    handleClose();
  };

  useEffect(() => {
    doRequest({
      method: "GET",
      url: `/get-committee/${org}`,
    })
    .then(response => {
      setCommittee(response.data as TCommittee[]);
    })
  }, [])

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
                <TextField sx={{width: '300px', marginTop: "10px"}} value={selectCommitte} onChange={(e) => setSelectCommittee(e.target.value)} select size='small' label="Select Committee" variant="outlined">
                  <MenuItem value="">N/A</MenuItem>
                  {
                    committee?.map(item => {
                      return <MenuItem value={item.id}>{item.committee}</MenuItem>
                    })
                  }
                </TextField>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={!(selectCommitte && selectedOption)} onClick={handleSubmit} variant="contained" color="primary">
                Select
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
};


export default SelectBarangayCouncilorModal;
