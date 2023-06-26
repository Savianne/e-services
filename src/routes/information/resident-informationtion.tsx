import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { IStyledFC } from "../../app/IStyledFC";

import { TResident } from "../../API/getResidentsRecord";

//Helpers
import checkObjectValuesMatch from "../../utils/helpers/checkObjValueMatch";
import useFormControl from "../../utils/hooks/useFormControl";
//Validators
import validatePHNumber from "../../utils/inputValidators/validators/validatePHNumber";
import validatePHTelephone from "../../utils/inputValidators/validators/validatePHTelNumber";
//Date Picker Component
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Mui Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';

//MUI Component
import {
    Avatar,
    Box, Divider, Paper, Button,TextField, Select, MenuItem
} from '@mui/material';


import { Container, Content } from "../../app/AppLayout";
import ResidentsTable from "../../app/ResidentsTable";
import useGetResidentsRecord from "../../API/hooks/useGetResidentsRecord";
import { formatToPHCPNumberValue } from "../../utils/hooks/usePHCPNumberFormat";
import { formatPhoneNumber } from "../../utils/hooks/usePHTelNumberFormat";

const TableContainer = styled(Paper)`
    display: flex;
    flex: 0 1 1000px;
    height: fit-content;
    padding: 10px;
    background-color: ${({theme}) => theme.customTheme.mainBackground};

    .row {
        display: flex;
        flex: 0 1 100%;
    }

    .center-content {
        justify-content: center;
    }

    .col-1, .col-2 {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        height: 100%;
    }

    .col-1 {
        flex: 0 0 300px;
        /* background-color: pink; */

        .dp-container {
            margin-top: 20px;
        }
    }

    .col-2 {
        flex: 1;
        padding: 0 15px;
        
        h2 {
            margin: 10px 0;
        }

        .data-group {
            display: flex;
            flex: 0 1 100%;
            flex-wrap: wrap;
            padding: 10px;
            gap: 10px;
            h4 {
                flex: 0 1 100%;
                margin: 5px 0;
            }
        }
    }

    .resident-uid  {
        margin: 0;
        padding: 0;
    }

    .action-btn {
        margin: 2px 0;
    }
`;

interface TResidentInfoWithAddress extends TResident {
    currentRegion: string,
    currentProvince: string,
    currentCityMun: string,
    currentBarangay: string,
    currentZone: string,
    permanentRegion: string,
    permanentProvince: string,
    permanentCityMun: string,
    permanentBarangay: string,
    permanentZone: string
}

const ResidentInformation: React.FC = () => {
    const {action, residentUID} = useParams();
    const [mode, setMode] = useState(action as string);
    const [editData, setEditData] = useState<null | TResidentInfoWithAddress>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<null | TResidentInfoWithAddress>({
        residentUID: "SC09375683",
        picture: "assets/images/avatar/apple.png",
        firstName: "Apple Jane",
        middleName: "Libao",
        surname: "De Guzman",
        extName: null,
        gender: "Female",
        maritalStatus: "Single",
        dateOfBirth: "1995-06-26",
        personalEmail: 'ajdeeguzman@gmail.com',
        personalCPNumber: "09128486021",
        personalTelNumber: null,
        homeEmail: null,
        homeCPNumber: "09176538798",
        homeTelNumber: "(02) 7695-0975",
        currentRegion: "Region 2",
        currentProvince: "Isabela",
        currentCityMun: "Quezon",
        currentBarangay: "Arellano",
        currentZone: "6",
        permanentRegion: "Region 2",
        permanentProvince: "Isabela",
        permanentCityMun: "Quezon",
        permanentBarangay: "Arellano",
        permanentZone: "6",
        currentAddress: "",
        permanentAddress: ""
    });

    const [form, formDispatcher] = useFormControl({
        firstName: {
            required: true,
            minValLen: 5,
            maxValLen: 25,
            errorText: 'Invalid Entry',
            validateAs: 'text',
        },
        middleName: {
            required: false,
            errorText: 'Invalid Entry',
            validateAs: 'text',
            minValLen: 5,
            maxValLen: 25,
        },
        surName: {
            required: true,
            errorText: 'Invalid Entry',
            validateAs: 'text',
            minValLen: 5,
            maxValLen: 25,
        },
        extName: {
            required: false,
            errorText: 'Invalid Entry',
            validateAs: 'select',
            validValues: ['jr', 'sr']
        },
        dateOfBirth: {
            required: true,
            errorText: 'Invalid Date',
            min: '1920-01-01',
            max: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
            validateAs: 'date',
        },
        gender: {
            required: true,
            errorText: 'Invalid Entry',
            validateAs: 'select',
            validValues: ['male', 'female']
        },
        maritalStatus: {
            required: true,
            errorText: 'Invalid Entry',
            validateAs: 'select',
            validValues: ['married', 'widowed', 'divorced', 'separated', 'single']
        },
        emailAddress: {
            required: false,
            errorText: 'Invalid Email',
            validateAs: 'email',
        },
        cpNumber: {
            required: false,
            validateAs: 'number',
            errorText: 'Invalid Value',
            validators: [validatePHNumber]
        },
        telNumber: {
            required: false,
            validateAs: 'number',
            errorText: 'Invalid Value',
            validators: [validatePHTelephone]
        },
        region: {
            required: true,
            errorText: 'Invalid Entry',
            validateAs: 'select'
        },
        province: {
            required: true,
            errorText: 'Invalid Entry',
            validateAs: 'select'
        },
        cityOrMunicipality: {
            required: true,
            errorText: 'Invalid Entry',
            validateAs: 'select'
        },
        barangay: {
            required: true,
            errorText: 'Invalid Entry',
            validateAs: 'select'
        },
        zone: {
            required: true,
            errorText: 'Invalid Entry',
            validateAs: 'select',
            validValues: ['1', '2', '3', '4', '5', '6']
        }});

    React.useEffect(() => {
        if(currentRecord) setEditData(currentRecord);
    }, [currentRecord])

    React.useEffect(() => {
        editData && currentRecord && setHasChanges(!checkObjectValuesMatch(editData, currentRecord));
    }, [editData]);

    React.useEffect(() => {
        // if(editData) {
            formDispatcher?.firstName(editData?.firstName as string);
            formDispatcher?.middleName(editData?.middleName as string);
            // formDispatcher?.surName(editData?.surname as string);
            // formDispatcher?.extName(editData?.extName as string);
        // }
    }, [editData]);

    React.useEffect(() => {
        console.log(form.values)
    }, [form])
    return (
        <>
            <Container>
                <TableContainer elevation={5}>
                    <div className="col-1">
                        <div className="row center-content dp-container">
                            <Avatar sx={{height: '140px', width: '140px'}} src="/assets/images/avatar/apple.png" alt="Danielle" />
                        </div>
                        <div className="row center-content">
                            <h2>Apple Jane De Guzman</h2>
                        </div>
                        <div className="row center-content">
                            <h4 className="resident-uid">SC09434385</h4>
                        </div>
                        <Divider sx={{flex: "0 1 100%", padding: '10px 0'}} variant="middle" orientation="horizontal" flexItem/>
                        <div className="row center-content action-btn">
                            <Button startIcon={<EditIcon />} sx={{width: "90%"}} size="large" color="success">Edit Information</Button>
                        </div>
                        <div className="row center-content action-btn">
                            <Button startIcon={<DeleteIcon />} sx={{width: "90%"}} size="large" color="error">Delete Record</Button>
                        </div>
                        <div className="row center-content action-btn">
                            <Button startIcon={<PrintIcon />} sx={{width: "90%"}} size="large">Print Document</Button>
                        </div>
                    </div>
                    <Divider orientation="vertical" sx={{height: "100%"}}/>
                    <div className="col-2">
                        <h2>Resident Information</h2>
                        <Divider sx={{flex: "0 1 100%"}} orientation="horizontal" flexItem />
                        {
                            editData && mode == "edit" && <>
                            <div className="data-group">
                                <h4>basic Information</h4>
                                <TextField
                                error={form.errors.firstName? true : false}
                                helperText={form.errors.firstName?.errorText}
                                // disabled
                                sx={{flex: "1 0 230px"}}
                                label="First-name"
                                id="outlined-size-small"
                                value={editData.firstName}
                                onChange={(e) => {
                                    setEditData({...editData, firstName: e.target.value});
                                }}
                                size="small"
                                />
                                <TextField
                                error={form.errors.middleName? true : false}
                                helperText={form.errors.middleName?.errorText}
                                // disabled
                                sx={{flex: "1 0 230px"}}
                                label="Middle-name"
                                id="outlined-size-small"
                                value={editData.middleName}
                                onChange={(e) => {
                                    setEditData({...editData, middleName: e.target.value});
                                }}
                                size="small"
                                />
                                <TextField
                                error={form.errors.surName? true : false}
                                helperText={form.errors.surName?.errorText}
                                // disabled
                                sx={{flex: "1 0 230px"}}
                                label="Sur-name"
                                id="outlined-size-small"
                                value={editData.surname}
                                onChange={(e) => {
                                    setEditData({...editData, surname: e.target.value});
                                }}
                                size="small"
                                />
                                <TextField
                                error={form.errors.extName? true : false}
                                helperText={form.errors.extName?.errorText}
                                select
                                // disabled
                                sx={{flex: "1 0 230px"}}
                                value={editData.extName || ""}
                                onChange={(e) => setEditData({...editData, extName: e.target.value})}
                                label="Ext. name"
                                size="small"
                                >
                                    <MenuItem value="">
                                        <em>N/A</em>
                                    </MenuItem>
                                    <MenuItem value="Jr">JR.</MenuItem>
                                    <MenuItem value="Sr">SR.</MenuItem>    
                                </TextField>
                                <DatePicker
                                // disabled
                                value={`${new Date(editData.dateOfBirth).getFullYear()}-${new Date(editData.dateOfBirth).getMonth() + 1}-${new Date(editData.dateOfBirth).getDate()}`}
                                onChange={(e) => {
                                    setEditData({...editData, dateOfBirth: e? `${new Date(e).getFullYear()}-${new Date(e).getMonth() + 1}-${new Date(e).getDate()}` : ""})
                                }}
                                label="Date of Birth"
                                renderInput={(params) => <TextField sx={{flex: "1 0 230px"}} size="small" {...params} />}
                                />
                                <TextField
                                select
                                // disabled
                                sx={{flex: "1 0 230px"}}
                                value={editData.gender}
                                onChange={(e) => setEditData({...editData, gender: e.target.value})}
                                label="Gender"
                                size="small"
                                >
                                    <MenuItem value="">
                                        <em>N/A</em>
                                    </MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </TextField>
                                <TextField
                                select
                                // disabled
                                sx={{flex: "1 0 230px"}}
                                value={editData.maritalStatus}
                                onChange={(e) => setEditData({...editData, maritalStatus: e.target.value})}
                                label="Marital Status"
                                size="small"
                                >
                                    <MenuItem value="">
                                        <em>N/A</em>
                                    </MenuItem>
                                    <MenuItem value="Single">Single</MenuItem>
                                    <MenuItem value="Married">Married</MenuItem>
                                    <MenuItem value="Widowed">Widowed</MenuItem>
                                    <MenuItem value="Divorced">Divorced</MenuItem>
                                    <MenuItem value="Separated">Separated</MenuItem>
                                </TextField>
                            </div>
                            <div className="data-group">
                                <h4>Contact Information (Personal)</h4>
                                <TextField
                                // disabled
                                sx={{flex: "1 0 230px"}}
                                label="Email"
                                id="outlined-size-small"
                                value={editData.personalEmail || ""}
                                onChange={(e) => setEditData({...editData, personalEmail: e.target.value})}
                                size="small"
                                />
                                <TextField
                                // disabled
                                sx={{flex: "1 0 230px"}}
                                label="CP Number"
                                id="outlined-size-small"
                                value={editData.personalCPNumber || ""}
                                onChange={(e) => setEditData({...editData, personalCPNumber: formatToPHCPNumberValue(e.target.value)})}
                                size="small"
                                />
                                <TextField
                                // disabled
                                sx={{flex: "1 0 230px"}}
                                label="Tel Number"
                                id="outlined-size-small"
                                value={editData.personalTelNumber || ""}
                                onChange={(e) => setEditData({...editData, personalTelNumber: formatPhoneNumber(e.target.value)})}
                                size="small"
                                />
                            </div>
                            <div className="data-group">
                                <h4>Contact Information (Home)</h4>
                                <TextField
                                // disabled
                                sx={{flex: "1 0 230px"}}
                                label="Email"
                                id="outlined-size-small"
                                value={editData.homeEmail || ""}
                                onChange={(e) => setEditData({...editData, homeEmail: e.target.value})}
                                size="small"
                                />
                                <TextField
                                // disabled
                                sx={{flex: "1 0 230px"}}
                                label="CP Number"
                                id="outlined-size-small"
                                value={editData.homeCPNumber || ""}
                                onChange={(e) => setEditData({...editData, homeCPNumber: formatToPHCPNumberValue(e.target.value)})}
                                size="small"
                                />
                                <TextField
                                // disabled
                                sx={{flex: "1 0 230px"}}
                                label="Tel Number"
                                id="outlined-size-small"
                                value={editData.homeTelNumber || ""}
                                onChange={(e) => setEditData({...editData, homeTelNumber: formatPhoneNumber(e.target.value)})}
                                size="small"
                                />
                            </div>
                            <div className="data-group">
                                <Button disabled={!hasChanges} sx={{marginLeft: "auto"}} color="primary">Update Changes</Button>
                            </div>
                            </>
                        }
                        {/* End of  Edit view */}
                        {
                            currentRecord && mode == "view" && <>
                            <div className="data-group">
                                <h4>basic Information</h4>
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="First-name"
                                id="outlined-size-small"
                                defaultValue={currentRecord.firstName}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Middle-name"
                                id="outlined-size-small"
                                defaultValue={currentRecord.middleName}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Sur-name"
                                id="outlined-size-small"
                                defaultValue={currentRecord.surname}
                                size="small"
                                />
                                <TextField
                                select
                                disabled
                                sx={{flex: "1 0 230px"}}
                                defaultValue={currentRecord.extName || "N/A"}
                                label="Ext. name"
                                size="small"
                                >
                                    <MenuItem value="N/A">
                                        <em>N/A</em>
                                    </MenuItem>
                                    {
                                        currentRecord.extName && <MenuItem value={currentRecord.extName}>{currentRecord.extName}</MenuItem>
                                    }     
                                </TextField>
                                <DatePicker
                                onChange={() => {}}
                                disabled
                                value={`${new Date(currentRecord.dateOfBirth).getFullYear()}-${new Date(currentRecord.dateOfBirth).getMonth() + 1}-${new Date(currentRecord.dateOfBirth).getDate()}`}
                                label="Date of Birth"
                                renderInput={(params) => <TextField sx={{flex: "1 0 230px"}} size="small" {...params} />}
                                />
                                <TextField
                                select
                                disabled
                                sx={{flex: "1 0 230px"}}
                                defaultValue={currentRecord.gender}
                                label="Gender"
                                size="small"
                                >
                                    <MenuItem value={currentRecord.gender}>{currentRecord.gender}</MenuItem>
                                </TextField>
                                <TextField
                                select
                                disabled
                                sx={{flex: "1 0 230px"}}
                                value={currentRecord.maritalStatus}
                                label="Marital Status"
                                size="small"
                                >
                                    <MenuItem value={currentRecord.maritalStatus}>{currentRecord.maritalStatus}</MenuItem>
                                </TextField>
                            </div>
                            <div className="data-group">
                                <h4>Contact Information (Personal)</h4>
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Email"
                                id="outlined-size-small"
                                defaultValue={currentRecord.personalEmail || "N/A"}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="CP Number"
                                id="outlined-size-small"
                                defaultValue={currentRecord.personalCPNumber || "N/A"}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Tel Number"
                                id="outlined-size-small"
                                defaultValue={currentRecord.personalTelNumber || "N/A"}
                                size="small"
                                />
                            </div>
                            <div className="data-group">
                                <h4>Contact Information (Home)</h4>
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Email"
                                id="outlined-size-small"
                                defaultValue={currentRecord.homeEmail || "N/A"}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="CP Number"
                                id="outlined-size-small"
                                defaultValue={currentRecord.homeCPNumber || "N/A"}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Tel Number"
                                id="outlined-size-small"
                                defaultValue={currentRecord.homeTelNumber || "N/A"}
                                size="small"
                                />
                            </div>
                            <div className="data-group">
                                <h4>Permanent Address</h4>
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Region"
                                id="outlined-size-small"
                                defaultValue={currentRecord.permanentZone}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Province"
                                id="outlined-size-small"
                                defaultValue={currentRecord.permanentProvince}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="City/Municipality"
                                id="outlined-size-small"
                                defaultValue={currentRecord.permanentCityMun}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Barangay"
                                id="outlined-size-small"
                                defaultValue={currentRecord.permanentBarangay}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Zone/Purok"
                                id="outlined-size-small"
                                defaultValue={currentRecord.permanentZone}
                                size="small"
                                />
                            </div>
                            <div className="data-group">
                                <h4>Current Address</h4>
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Region"
                                id="outlined-size-small"
                                defaultValue={currentRecord.currentZone}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Province"
                                id="outlined-size-small"
                                defaultValue={currentRecord.currentProvince}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="City/Municipality"
                                id="outlined-size-small"
                                defaultValue={currentRecord.currentCityMun}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Barangay"
                                id="outlined-size-small"
                                defaultValue={currentRecord.currentBarangay}
                                size="small"
                                />
                                <TextField
                                disabled
                                sx={{flex: "1 0 230px"}}
                                label="Zone/Purok"
                                id="outlined-size-small"
                                defaultValue={currentRecord.currentZone}
                                size="small"
                                />
                            </div>
                            </>
                        }
                        
                    </div>
                </TableContainer>
            </Container>
        </>
    )
}

export default ResidentInformation;