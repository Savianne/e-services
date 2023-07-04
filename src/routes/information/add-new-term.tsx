import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { IStyledFC } from "../../app/IStyledFC";
import { ITerm, ISKTerm } from "../../app/types/ITerm";
import SiteMapBoard from "../../app/SiteMapBoard";
import YearSelect from "../../app/YearSelect";
import TermsOfServiceTable from "../../app/TermsOfServiceTable";
import AutocompleteModal from "../../app/AutoCompleteModal";
import useGetResidentsRecord from "../../API/hooks/useGetResidentsRecord";
import SelectCouncilorModal from "../../app/SelectCouncilor";
import useAddTerm from "../../API/hooks/useAddTerm";
import useAddSKTerm from "../../API/hooks/useAddSKTerm";
//Mui Icons
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

//MUI Component
import {
    Box,
    Paper,
    Divider,
    TextField,
    Alert,
    MenuItem,
    Avatar,
    IconButton,
    Snackbar,
    Button,
    CircularProgress
} from '@mui/material';

import { Container, Content } from "../../app/AppLayout";

type TPerson = {
    fullName: string,
    picture: string | null,
    position: string,
    residentUID: string
}

const PersonPaper = styled(Paper)<{cardColor: string}>`
    display: flex;
    flex: 0 1 500px;
    align-items: center;
    height:  fit-content;
    padding: 10px;
    border-radius: 5px;
    background-color: ${(props) => props.cardColor};
    color: white;

    .col-right {
        display: flex;
        height: 100%;
        margin-left: 10px;
        flex: 1;
        flex-wrap: wrap;
        align-items: center;

        .name {
            flex: 0 1 100%;
            font-size: 18px;
            font-weight: 600;
        }

        .position {
            font-size: 11px;
        }
    }
`; 

interface PersonWithCommittee extends TPerson {
    committee?: string
} 

const PersonCard: React.FC<{person: PersonWithCommittee, cardColor:string}> = ({person, cardColor}) => {

    return(
        <PersonPaper cardColor={cardColor}>
            <div className="picture-area">
                <Avatar src={`/assets/images/avatar/${person.picture}`} sx={{height: "60px", width: "60px"}} />
            </div>
            <div className="col-right">
                <div className="name">{person.fullName}</div>
                <div className="position">{person.position} {person.committee? "| " + person.committee : ""}</div>
            </div>
        </PersonPaper>
    )
}

const AddNewTermContainer = styled(Paper)`
    display: flex;
    flex: 0 1 1000px;
    flex-wrap: wrap;
    gap: 10px;
    height: fit-content;
    padding: 10px;
    background-color: ${({theme}) => theme.customTheme.mainBackground};

    .row {
        display: flex;
        align-items: center;
        flex: 0 1 100%;

        .col {
            flex: 1;
        }

        .category-title-col {
            width: 180px;
            align-items: center;
            text-align: right;
            margin-right: 15px;
        }

        .input-group-col {
            display: flex;
            align-items: center;
        }
    }

    .title, h1, h2, h3 {
        margin: 0;
        padding: 0;
    }

    .position-container {
        justify-content: center;
        flex-wrap: wrap;

        h3 {
            flex: 0 1 100%;
            text-align: center;
            margin-bottom: 20px;
        }
    }
`;

interface ICouncilor {
    fullName: string;
    residentUID: string;
    picture: string | null,
    committee: string,
    committeeID: string | number
}


const AddNewTermsOfService: React.FC = () => {
    const {org} = useParams();
    const {addTerm, isLoading: isAddingTerm, isSuccess: isSuccessAddingTerm, isError: isErrorAddingTerm } = useAddTerm();
    const {addSKTerm, isLoading: isAddingSKTerm, isSuccess: isSuccessAddingSKTerm, isError: isErrorAddingSKTerm} = useAddSKTerm();
    const {data, isLoading, isError, isSuccess} = useGetResidentsRecord();
    const [termFor, setTermFor] = useState("barangay");
    const [startYear, setStartYear] = useState(new Date().getFullYear().toString());
    const [endYear, setEndYear] = useState((new Date().getFullYear() + 3).toString());
    const [barangayChairPerson, setBarangayChairPerson] = useState<null | TPerson>(null);
    const [options, setOptions] = useState<{fullName: string, picture: string | null, residentUID: string,}[]>([]);
    const [barangaySecretary, setBarangaySecretary] = useState<null | TPerson>(null);
    const [barangayCouncilors, setBarangayCouncilors] = useState<ICouncilor[]>([]);
    const [barangayTreasurer, setBarangayTreasurer] = useState<null | TPerson>(null);
    const [skChairPerson, setSkChairPerson] = useState<null | TPerson>(null);
    const [skSecretary, setSkSecretary] = useState<null | TPerson>(null);
    const [skCouncilors, setSkCouncilors] = useState<ICouncilor[]>([]);
    const [skTreasurer, setSkTreasurer] = useState<null | TPerson>(null);
    const [invalidStartEndDate, setInvalidStartEndDate] = useState(false);
    const [dupSelectError, setDupSelectError] = useState(false);
    const [addTermSuccessSnackbar, setAddTermSuccessSnackBar] = useState(false);

    useEffect(() => {
        if(data) {
            const options:  {
                fullName: string,
                picture: string | null,
                residentUID: string,
            }[] = data.map(item => ({
                fullName: `${item.name.firstName} ${item.name.middleName[0]}. ${item.name.lastName}`.toUpperCase(),
                picture: item.picture,
                residentUID: item.residentUID
            }));

            setOptions(options);
        }
    }, [data]);

    useEffect(() => {
        (startYear <= endYear)? setInvalidStartEndDate(false) : setInvalidStartEndDate(true);
    }, [startYear, endYear]);

    useEffect(() => {
        if(isSuccessAddingTerm) {
            setAddTermSuccessSnackBar(true);
            setBarangayChairPerson(null);
            setBarangayCouncilors([]);
            setBarangaySecretary(null);
            setBarangayTreasurer(null);
        } 
        if(isSuccessAddingSKTerm) {
            setAddTermSuccessSnackBar(true);
            setSkChairPerson(null);
            setSkCouncilors([]);
            setSkSecretary(null);
            setSkTreasurer(null);
        } 
    }, [isSuccessAddingTerm, isSuccessAddingSKTerm]);

    useEffect(() => {
        if(org) {
            org == "barangay"? setTermFor("barangay") : setTermFor("sk");
        }
    }, [org])
    return (
        <>
            <Container>
                <Content>
                    <AddNewTermContainer elevation={5}>
                        <div className="row">
                            <h1 className="title">Update term</h1>
                        </div>
                        {
                            termFor == "sk" && isErrorAddingSKTerm && <div className="row">
                                <Alert severity="error" sx={{ width: '100%', marginLeft: "10px" }}>
                                Failed to add SK Term. Possible reasons include lack of internet connection, authentication failure, or duplicate entries in start-year and end-year.
                                </Alert>
                            </div>
                        }
                         {
                            termFor == "barangay" && isErrorAddingTerm && <div className="row">
                                <Alert severity="error" sx={{ width: '100%', marginLeft: "10px" }}>
                                Failed to add Term. Possible reasons include lack of internet connection, authentication failure, or duplicate entries in start-year and end-year.
                                </Alert>
                            </div>
                        }
                        <Divider orientation="horizontal" sx={{width: "100%"}}/>
                        <div className="row">
                            <div className="category-title-col">
                                <strong>Term for: </strong>
                            </div>
                            <div className="input-group-col">
                                <TextField value={termFor} select size="small" onChange={(e) => setTermFor(e.target.value)}>
                                    <MenuItem value="sk">Sangguniang Kabataan (SK)</MenuItem>
                                    <MenuItem value="barangay">Barangay position</MenuItem>
                                </TextField>
                            </div>
                        </div>
                        <div className="row">
                            <div className="category-title-col">
                                <strong>Year of term: </strong>
                            </div>
                            <div className="input-group-col">
                                <YearSelect error={invalidStartEndDate} value={startYear} onChange={(e) => setStartYear(e)} />
                                <strong style={{margin: "0 10px"}}>-</strong>
                                <YearSelect error={invalidStartEndDate} value={endYear} onChange={(e) => setEndYear(e)} />
                                {
                                    invalidStartEndDate && <Alert severity="error" sx={{ width: '100%', marginLeft: "10px" }}>
                                        Start-year must be less than end-year
                                    </Alert>
                                }
                            </div>
                        </div>
                        <Divider orientation="horizontal" sx={{width: "100%"}}/>
                        {
                            termFor == "barangay" && <>
                            <div className="row position-container">
                                <h3>Barangay Chairperson</h3>
                                {
                                    barangayChairPerson? <>
                                    <PersonCard person={barangayChairPerson} cardColor="orange" />
                                    <IconButton sx={{marginLeft: '5px'}} aria-label="delete" size="large" 
                                    onClick={() => {
                                        setBarangayChairPerson(null)
                                    }}>
                                        <ClearIcon fontSize="inherit" />
                                    </IconButton>
                                    </>  : 
                                    <AutocompleteModal onSelect={(val) => {
                                        const itemOnList = [...barangayCouncilors.map(item => item.residentUID), barangaySecretary?.residentUID, barangayTreasurer?.residentUID].filter(i => i == val.residentUID);
                                        if(itemOnList.length) {
                                            setDupSelectError(true);
                                        } else {
                                            setBarangayChairPerson({...val, position: "Brgy. Chairperson"});
                                        }
                                    }} options={options} />
                                }
                               
                            </div>
                            <Divider orientation="horizontal" sx={{width: "100%"}}/>
                            <div className="row position-container">
                                <h3>Barangay Secretary</h3>
                                {
                                    barangaySecretary? <>
                                    <PersonCard person={barangaySecretary} cardColor="rgb(104 143 79)" />
                                    <IconButton sx={{marginLeft: '5px'}} aria-label="delete" size="large"
                                    onClick={() => setBarangaySecretary(null)}>
                                        <ClearIcon fontSize="inherit" />
                                    </IconButton>
                                    </>  :
                                    <AutocompleteModal onSelect={(val) => {
                                        const itemOnList = [...barangayCouncilors.map(item => item.residentUID), barangayChairPerson?.residentUID, barangayTreasurer?.residentUID].filter(i => i == val.residentUID);
                                        if(itemOnList.length) {
                                            setDupSelectError(true);
                                        } else {
                                            setBarangaySecretary({...val, position: "Brgy. Secretary"})
                                        }
                                    }} options={options} />
                                }
                               
                            </div>
                            <Divider orientation="horizontal" sx={{width: "100%"}}/>
                            <div className="row position-container">
                                <h3>Barangay Treasurer</h3>
                                {
                                    barangayTreasurer? <>
                                    <PersonCard person={barangayTreasurer} cardColor="rgb(0, 176, 80)" />
                                    <IconButton sx={{marginLeft: '5px'}} aria-label="delete" size="large"
                                    onClick={() => setBarangayTreasurer(null)}>
                                        <ClearIcon fontSize="inherit" />
                                    </IconButton>
                                    </>  :
                                    <AutocompleteModal onSelect={(val) => {
                                        const itemOnList = [...barangayCouncilors.map(item => item.residentUID), barangayChairPerson?.residentUID, barangaySecretary?.residentUID].filter(i => i == val.residentUID);
                                        if(itemOnList.length) {
                                            setDupSelectError(true);
                                        } else {
                                            setBarangayTreasurer({...val, position: "Brgy. Treasurer"});
                                        }
                                    }} options={options} />
                                }
                            </div>
                            <Divider orientation="horizontal" sx={{width: "100%"}}/>
                            <div className="row position-container">
                                <h3>Barangay Councilors</h3>
                            </div>
                            {
                                barangayCouncilors.map(councilor => {
                                    return (
                                        <div className="row position-container">
                                            <PersonCard person={{
                                                residentUID: councilor.residentUID,
                                                picture: councilor.picture,
                                                fullName: councilor.fullName,
                                                position: "Brgy. Councilor",
                                                committee: councilor.committee

                                            }} cardColor="rgb(72 107 167)" />
                                            <IconButton sx={{marginLeft: '5px'}} aria-label="delete" size="large"
                                            onClick={() => {
                                                const removeItem = barangayCouncilors.filter(i => i.residentUID !== councilor.residentUID);
                                                setBarangayCouncilors([...removeItem]);
                                            }}>
                                                <ClearIcon fontSize="inherit" />
                                            </IconButton>
                                        </div>
                                    )
                                })
                            }
                            <div className="row position-container">
                                <SelectCouncilorModal org="barangay" onSelect={(e) => {
                                    const itemOnList = [...barangayCouncilors.map(item => item.residentUID), barangayChairPerson?.residentUID, barangaySecretary?.residentUID, barangayTreasurer?.residentUID].filter(i => i == e.residentUID);
                                    if(itemOnList.length) {
                                        setDupSelectError(true);
                                    } else {
                                        setBarangayCouncilors([...barangayCouncilors, e]);
                                    }
                                }} options={options}/>
                            </div>
                            {
                                isErrorAddingTerm && <div className="row">
                                    <Alert severity="error" sx={{ width: '100%', marginLeft: "10px" }}>
                                    Failed to add Term. Possible reasons include lack of internet connection, authentication failure, or duplicate entries in start-year and end-year.
                                    </Alert>
                                </div>
                            }
                            <div className="row">
                                <Alert severity="info" sx={{ width: '100%', marginLeft: "10px" }}>
                                Please note that saving this information will replace the current term, if one is already set. By saving the new term, the existing term will be overwritten, and the system will consider the new term as the current one. It's important to ensure the accuracy and relevance of the new term before proceeding with the save operation.
                                </Alert>
                            </div>
                            <Divider orientation="horizontal" sx={{width: "100%"}}/>
                            <div className="row position-container">
                                <Button disabled={
                                    !(barangayChairPerson && barangaySecretary && barangayTreasurer && barangayCouncilors.length >= 7 && invalidStartEndDate == false) || isAddingTerm
                                }
                                endIcon={isAddingTerm? <CircularProgress size={20} color="inherit" /> : null}
                                onClick={() => {
                                    if(barangayChairPerson && barangaySecretary && barangayTreasurer && barangayCouncilors.length >= 7 && invalidStartEndDate == false) {
                                        const term: ITerm = {
                                            startYear: +startYear,
                                            endYear: +endYear,
                                            barangayChairperson: {residentUID: barangayChairPerson?.residentUID},
                                            barangaySecretary: {residentUID: barangaySecretary.residentUID},
                                            barangayTreasurer: {residentUID: barangayTreasurer.residentUID},
                                            barangayCouncilors: [
                                                ...barangayCouncilors.map(c => (
                                                    {
                                                        residentUID: c.residentUID,
                                                        committee: c.committeeID.toString()  
                                                    } 
                                                ))
                                            ]
                                        }

                                        addTerm(term)
                                    }
                                }}>Save Changes</Button>
                            </div>
                            </>
                        }
                        {
                            termFor == "sk" && <>
                            <div className="row position-container">
                                <h3>SK Chairperson</h3>
                                {
                                    skChairPerson? <>
                                    <PersonCard person={skChairPerson} cardColor="orange" />
                                    <IconButton sx={{marginLeft: '5px'}} aria-label="delete" size="large" 
                                    onClick={() => {
                                        setSkChairPerson(null)
                                    }}>
                                        <ClearIcon fontSize="inherit" />
                                    </IconButton>
                                    </>  : 
                                    <AutocompleteModal onSelect={(val) => {
                                        const itemOnList = [...skCouncilors.map(item => item.residentUID), skSecretary?.residentUID, skTreasurer?.residentUID].filter(i => i == val.residentUID);
                                        if(itemOnList.length) {
                                            setDupSelectError(true);
                                        } else {
                                            setSkChairPerson({...val, position: "SK Chairperson"});
                                        }
                                    }} options={options} />
                                }
                               
                            </div>
                            <Divider orientation="horizontal" sx={{width: "100%"}}/>
                            <div className="row position-container">
                                <h3>SK Secretary</h3>
                                {
                                    skSecretary? <>
                                    <PersonCard person={skSecretary} cardColor="rgb(104 143 79)" />
                                    <IconButton sx={{marginLeft: '5px'}} aria-label="delete" size="large"
                                    onClick={() => setSkSecretary(null)}>
                                        <ClearIcon fontSize="inherit" />
                                    </IconButton>
                                    </>  :
                                    <AutocompleteModal onSelect={(val) => {
                                        const itemOnList = [...skCouncilors.map(item => item.residentUID), skChairPerson?.residentUID, skTreasurer?.residentUID].filter(i => i == val.residentUID);
                                        if(itemOnList.length) {
                                            setDupSelectError(true);
                                        } else {
                                            setSkSecretary({...val, position: "SK Secretary"})
                                        }
                                    }} options={options} />
                                }
                               
                            </div>
                            <Divider orientation="horizontal" sx={{width: "100%"}}/>
                            <div className="row position-container">
                                <h3>SK Treasurer</h3>
                                {
                                    skTreasurer? <>
                                    <PersonCard person={skTreasurer} cardColor="rgb(0, 176, 80)" />
                                    <IconButton sx={{marginLeft: '5px'}} aria-label="delete" size="large"
                                    onClick={() => setSkTreasurer(null)}>
                                        <ClearIcon fontSize="inherit" />
                                    </IconButton>
                                    </>  :
                                    <AutocompleteModal onSelect={(val) => {
                                        const itemOnList = [...skCouncilors.map(item => item.residentUID), skChairPerson?.residentUID, skSecretary?.residentUID].filter(i => i == val.residentUID);
                                        if(itemOnList.length) {
                                            setDupSelectError(true);
                                        } else {
                                            setSkTreasurer({...val, position: "SK Treasurer"});
                                        }
                                    }} options={options} />
                                }
                            </div>
                            <Divider orientation="horizontal" sx={{width: "100%"}}/>
                            <div className="row position-container">
                                <h3>SK Councilors</h3>
                            </div>
                            {
                                skCouncilors.map(councilor => {
                                    return (
                                        <div className="row position-container">
                                            <PersonCard person={{
                                                residentUID: councilor.residentUID,
                                                picture: councilor.picture,
                                                fullName: councilor.fullName,
                                                position: "SK Councilor",
                                                committee: councilor.committee

                                            }} cardColor="rgb(72 107 167)" />
                                            <IconButton sx={{marginLeft: '5px'}} aria-label="delete" size="large"
                                            onClick={() => {
                                                const removeItem = skCouncilors.filter(i => i.residentUID !== councilor.residentUID);
                                                setSkCouncilors([...removeItem]);
                                            }}>
                                                <ClearIcon fontSize="inherit" />
                                            </IconButton>
                                        </div>
                                    )
                                })
                            }
                            <div className="row position-container">
                                <SelectCouncilorModal org="sk" onSelect={(e) => {
                                    const itemOnList = [...skCouncilors.map(item => item.residentUID), skChairPerson?.residentUID, skSecretary?.residentUID, skTreasurer?.residentUID].filter(i => i == e.residentUID);
                                    if(itemOnList.length) {
                                        setDupSelectError(true);
                                    } else {
                                        setSkCouncilors([...skCouncilors, e]);
                                    }
                                }} options={options}/>
                            </div>
                            {
                                isErrorAddingSKTerm && <div className="row">
                                    <Alert severity="error" sx={{ width: '100%', marginLeft: "10px" }}>
                                    Failed to add SK Term. Possible reasons include lack of internet connection, authentication failure, or duplicate entries in start-year and end-year.
                                    </Alert>
                                </div>
                            }
                            <div className="row">
                            <Alert severity="info" sx={{ width: '100%', marginLeft: "10px" }}>
                            Please note that saving this information will replace the current term, if one is already set. By saving the new term, the existing term will be overwritten, and the system will consider the new term as the current one. It's important to ensure the accuracy and relevance of the new term before proceeding with the save operation.
                            </Alert>
                        </div>
                            <Divider orientation="horizontal" sx={{width: "100%"}}/>
                            <div className="row position-container">
                                <Button disabled={
                                    !(skChairPerson && skSecretary && skTreasurer && skCouncilors.length >= 7 && invalidStartEndDate == false) || isAddingSKTerm
                                }
                                endIcon={isAddingSKTerm? <CircularProgress size={20} color="inherit" /> : null}
                                onClick={() => {
                                    if(skChairPerson && skSecretary && skTreasurer && skCouncilors.length >= 7 && invalidStartEndDate == false) {
                                        const skterm: ISKTerm = {
                                            startYear: +startYear,
                                            endYear: +endYear,
                                            skChairperson: {residentUID: skChairPerson?.residentUID},
                                            skSecretary: {residentUID: skSecretary.residentUID},
                                            skTreasurer: {residentUID: skTreasurer.residentUID},
                                            skCouncilors: [
                                                ...skCouncilors.map(c => (
                                                    {
                                                        residentUID: c.residentUID,
                                                        committee: c.committeeID.toString()  
                                                    } 
                                                ))
                                            ]
                                        }

                                        addSKTerm(skterm)
                                    }
                                }}>Save Changes</Button>
                            </div>
                            </>
                        }
                    </AddNewTermContainer>
                </Content>
                <Snackbar open={dupSelectError} autoHideDuration={6000} onClose={() => setDupSelectError(false)}>
                    <Alert onClose={() => setDupSelectError(false)} severity="error" sx={{ width: '100%' }}>
                    Duplicate entry
                    </Alert>
                </Snackbar>
                <Snackbar open={addTermSuccessSnackbar} autoHideDuration={6000} onClose={() => setAddTermSuccessSnackBar(false)}>
                    <Alert  onClose={() => setAddTermSuccessSnackBar(false)} severity="success" sx={{ width: '100%' }}>
                    Adding Term of Service Success
                    </Alert>
                </Snackbar>
            </Container>
        </>
    )
}

export default AddNewTermsOfService;