import React from "react";
import { styled } from '@mui/material/styles';
import { IStyledFC } from "../../app/IStyledFC";

import SiteMapBoard from "../../app/SiteMapBoard";

//Input Validators
import validatePHNumber from "../../utils/inputValidators/validators/validatePHNumber";
import validatePHTelephone from "../../utils/inputValidators/validators/validatePHTelNumber";
//Mui Icons

//MUI Component
import {
    Box,
    TextField,
    MenuItem,
    Paper,
    FormControlLabel,
    Checkbox,
    Button,
    CircularProgress,
} from '@mui/material';

//Date Picker Component
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Container, Content } from "../../app/AppLayout";

//Helpers
import { formatPhoneNumber } from "../../utils/hooks/usePHTelNumberFormat";
import { formatToPHCPNumberValue } from "../../utils/hooks/usePHCPNumberFormat";

//Custom Hooks
import useFormControl from "../../utils/hooks/useFormControl";
import usePHTelNumberFormat from "../../utils/hooks/usePHTelNumberFormat";
import usePHCPNumberFormat from "../../utils/hooks/usePHCPNumberFormat";

import usePhilippinePlacesPickerSelect, { optionValue } from "../../utils/hooks/usePhilippinePlacePickerSelect";

// import { usePlacePickerSelect, optionValue, getValue, getCode } from "../../utils/hooks/usePhilippinePlacesPicker";

import { TResidentRecord } from "../../API/addResidentRecord";
import useAddResidentRecord from "../../API/hooks/useAddResidentRecord";

const AddResidentFormControl = styled(Paper)`
    display: flex;
    flex: 0 1 100%;
    padding: 20px 10px;
    height: fit-content;
    flex-wrap: wrap;
    background-color: ${(props) => props.theme.customTheme.mainBackground};

    .data-title {
        margin: 5px;
    }
`;

const DataGroup = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 100%;
    margin: 5px 0;
`;

const InputField = styled(TextField)`
    flex: 1;
    min-width: 200px;
    margin: 5px;
`


const DatePickerInputField = styled(DatePicker)`
    flex: 1;
    min-width: 200px;
    margin: 5px;
`
const AddResidentFormSubmitButton = styled(Button)`
    margin: 15px 10px 15px auto;
`;

const AddResident: React.FC = () => {
    const {addResidenRecord, isError, isLoading, isUpdating, error} = useAddResidentRecord();
    const [cpNumber, setCpNumber] = usePHCPNumberFormat();
    const [telNumber, setTelNumber] = usePHTelNumberFormat();
    const [homeCpNumber, setHomeCpNumber] = usePHCPNumberFormat();
    const [homeTelNumber, setHomeTelNumber] = usePHTelNumberFormat();
    const [isSeniorCitizenMember, setIsSeniorCitizenMember] =  React.useState(false);
    const [formIsReadyState, updateFormIsReadyState] = React.useState(false);
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

    const [homeContactInfoForm, homeContactInfoFormDispatchers] = useFormControl({
        email: {
            required: false,
            errorText: 'Invalid Entry',
            validateAs: 'email'
        },
        cpNumber: {
            required: false,
            errorText: 'Invalid Entry',
            validateAs: "number",
            validators: [validatePHNumber]
        },
        telephoneNumber: {
            required: false,
            errorText: 'Invalid Entry',
            validateAs: "number",
            validators: [validatePHTelephone]
        },
    })

    const [currentAddressForm, currentAddressFormValueDispatcher] = useFormControl({
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
        }
    });

    const [sameAsPermanentAddress, updateSameAsPermanentAddress] = React.useState(false);

    const permanentAddress = usePhilippinePlacesPickerSelect(
        (region) => formDispatcher?.region(region),
        (province) => formDispatcher?.province(province),
        (cityMun) => formDispatcher?.cityOrMunicipality(cityMun),
        (barangay) => formDispatcher?.barangay(barangay)
    );

    const currentAddress = usePhilippinePlacesPickerSelect(
        (region) => currentAddressFormValueDispatcher?.region(region),
        (province) => currentAddressFormValueDispatcher?.province(province),
        (cityMun) => currentAddressFormValueDispatcher?.cityOrMunicipality(cityMun),
        (barangay) => currentAddressFormValueDispatcher?.barangay(barangay)
    );

    React.useEffect(() => {
        const personalInfoReady =  form.isReady;
        const currentAddressIsReady = sameAsPermanentAddress? true : currentAddressForm.isReady;
        const homeContactInfoReady = homeContactInfoForm.isReady;
        if(personalInfoReady && currentAddressIsReady && homeContactInfoReady) {
            updateFormIsReadyState(true)
        } else updateFormIsReadyState(false)
    }, [
        form.isReady, 
        currentAddressForm.isReady, 
        homeContactInfoForm.isReady,
        sameAsPermanentAddress,
    ])


    React.useEffect(() => {
        formDispatcher?.cpNumber(cpNumber)
    }, [cpNumber]);

    React.useEffect(() => {
        formDispatcher?.telNumber(telNumber)
    }, [telNumber])

    React.useEffect(() => {
        homeContactInfoFormDispatchers?.cpNumber(homeCpNumber)
    }, [homeCpNumber]);

    React.useEffect(() => {
        homeContactInfoFormDispatchers?.telephoneNumber(homeTelNumber)
    }, [homeTelNumber])
    return (
        <>
            <SiteMapBoard title="Add Resident" path="/information / residents / add-resident" />
            <Container>
                <Content>
                    {/* {
                        formIsReadyState? <h1>Form is now Ready to be submit</h1> : <h1>Form is not yet Ready to be submit</h1>
                    } */}
                    <AddResidentFormControl elevation={6} >
                        <h2 className="data-title">Personal Information</h2>
                        <DataGroup>
                            <InputField
                            required
                            error={form.errors.firstName? true : false}
                            helperText={form.errors.firstName?.errorText}
                            value={form.values.firstName || ""}
                            onChange={(e) => formDispatcher?.firstName(e.currentTarget.value as string)}
                            id="outlined-required"
                            label="First Name"
                            size="small"
                            />
                            <InputField
                            required
                            error={form.errors.middleName? true : false}
                            helperText={form.errors.middleName?.errorText}
                            value={form.values.middleName || ""}
                            onChange={(e) => formDispatcher?.middleName(e.currentTarget.value as string)}
                            id="outlined-required"
                            label="Middle Name"
                            size="small"
                            />
                            <InputField
                            required
                            error={form.errors.surName? true : false}
                            helperText={form.errors.surName?.errorText}
                            value={form.values.surName || ""}
                            onChange={(e) => formDispatcher?.surName(e.currentTarget.value as string)}
                            id="outlined-required"
                            label="Surname"
                            size="small"
                            />
                            <InputField
                            select
                            error={form.errors.extName? true : false}
                            helperText={form.errors.extName?.errorText}
                            value={form.values.extName || ""}
                            onChange={(e) => formDispatcher?.extName(e.target.value)}
                            id="outlined-required"
                            label="Ext. Name"
                            size="small">
                                <MenuItem value=''>No Value</MenuItem>
                                <MenuItem value='jr'>Jr.</MenuItem>
                                <MenuItem selected value='sr'>Sr.</MenuItem>
                            </InputField>
                            </DataGroup>
                            <DataGroup>
                                <DatePickerInputField
                                label="Date of Birth"
                                value={form.values.dateOfBirth}
                                onChange={(newValue) => {
                                    formDispatcher?.dateOfBirth(newValue as string)
                                }}
                                renderInput={(params) => <TextField size="small" {...params} error={form.errors.dateOfBirth? true : false} helperText={form.errors.dateOfBirth?.errorText} required />}
                                />
                            </DataGroup>
                            <DataGroup>
                                <InputField
                                select
                                required
                                error={form.errors.gender? true : false}
                                helperText={form.errors.gender?.errorText}
                                value={form.values.gender || ""}
                                onChange={(e) => formDispatcher?.gender(e.target.value as string)}
                                id="outlined-required"
                                label="Gender"
                                size="small">
                                    <MenuItem value="">No Value</MenuItem>
                                    <MenuItem value='male'>Male</MenuItem>
                                    <MenuItem value='female'>Female</MenuItem>
                                </InputField>
                            </DataGroup>
                            <DataGroup>
                                <InputField
                                select
                                required
                                error={form.errors.maritalStatus? true : false}
                                helperText={form.errors.maritalStatus?.errorText}
                                value={form.values.maritalStatus || ""}
                                onChange={(e) => formDispatcher?.maritalStatus(e.target.value as string)}
                                id="outlined-required"
                                label="Marital Status"
                                size="small">
                                    <MenuItem value="">No Value</MenuItem>
                                    <MenuItem value="single">Single</MenuItem>
                                    <MenuItem value="married">Married</MenuItem>
                                    <MenuItem value="widowed">Widowed</MenuItem>
                                    <MenuItem value="divorced">Divorced</MenuItem>
                                    <MenuItem value="separated">Separated</MenuItem>
                                </InputField>
                            </DataGroup>
                            <h2 className="data-title">Contact Information (Personal)</h2>
                            <DataGroup>
                                <InputField
                                type="email"
                                error={form.errors.emailAddress? true : false}
                                helperText={form.errors.emailAddress?.errorText}
                                value={form.values.emailAddress || ""}
                                onChange={(e) => formDispatcher?.emailAddress(e.target.value as string)}
                                id="outlined-required"
                                label="Email Address"
                                size="small" />
                                <InputField
                                type="tel"
                                required
                                error={form.errors.cpNumber? true : false}
                                helperText={form.errors.cpNumber?.errorText}
                                // onChange={(e) => formDispatcher?.cpNumber(e.target.value)}
                                value={cpNumber}
                                onChange={(e) => setCpNumber(e.target.value)}
                                id="outlined-required"
                                label="CP Number"
                                size="small" />
                                <InputField
                                type="tel"
                                error={form.errors.telNumber? true : false}
                                helperText={form.errors.telNumber?.errorText}
                                value={telNumber}
                                onChange={(e) => setTelNumber(e.target.value)}
                                // onChange={(e) => formDispatcher?.telNumber(e.target.value)}
                                id="outlined-required"
                                label="Tel Number"
                                size="small" />
                            </DataGroup>
                            <h2 className="data-title">Contact Information (Home)</h2>
                            <DataGroup>
                                <InputField
                                type="email"
                                error={homeContactInfoForm.errors.email? true : false}
                                helperText={homeContactInfoForm.errors.email?.errorText}
                                value={homeContactInfoForm.values.email || ""}
                                onChange={(e) => homeContactInfoFormDispatchers?.email(e.target.value as string)}
                                id="outlined-required"
                                label="Email Address"
                                size="small" />
                                <InputField
                                type="tel"
                                required
                                error={homeContactInfoForm.errors.cpNumber? true : false}
                                helperText={homeContactInfoForm.errors.cpNumber?.errorText}
                                // onChange={(e) => formDispatcher?.cpNumber(e.target.value)}
                                value={homeCpNumber}
                                onChange={(e) => setHomeCpNumber(e.target.value)}
                                id="outlined-required"
                                label="CP Number"
                                size="small" />
                                <InputField
                                type="tel"
                                error={homeContactInfoForm.errors.telephoneNumber? true : false}
                                helperText={homeContactInfoForm.errors.telephoneNumber?.errorText}
                                value={homeTelNumber}
                                onChange={(e) => setHomeTelNumber(e.target.value)}
                                // onChange={(e) => formDispatcher?.telNumber(e.target.value)}
                                id="outlined-required"
                                label="Tel Number"
                                size="small" />
                            </DataGroup>
                            <h2 className="data-title">Permanent Address</h2>
                            <DataGroup>
                                <InputField
                                select
                                required
                                error={form.errors.region? true : false}
                                helperText={form.errors.region?.errorText}
                                value={ permanentAddress.values.region || "" }
                                onChange={(e) => { 
                                    permanentAddress.setRegion(e.target.value)
                                }}
                                id="outlined-required"
                                label="Region"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    {
                                        permanentAddress.regions?.map(item => (
                                            <MenuItem value={optionValue(item.reg_code, item.name)}>{item.name}</MenuItem>
                                        ))
                                    }
                                </InputField>
                                <InputField
                                select
                                required
                                value={permanentAddress.values.province || ""}
                                disabled={!permanentAddress.values.region}
                                error={form.errors.province? true : false}
                                helperText={form.errors.province?.errorText}
                                onChange={(e) => {
                                    permanentAddress.setProvince(e.target.value);
                                }}
                                id="outlined-required"
                                label="Province"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    {
                                        permanentAddress.provinces?.map(item => (
                                            <MenuItem value={optionValue(item.prov_code, item.name)}>{item.name}</MenuItem>
                                        ))
                                    }
                                </InputField>
                                <InputField
                                select
                                required
                                value={permanentAddress.values.cityMun || ""}
                                disabled={!permanentAddress.values.province}
                                error={form.errors.cityOrMunicipality? true : false}
                                helperText={form.errors.cityOrMunicipality?.errorText}
                                onChange={(e) => {
                                    permanentAddress.setCityMun(e.target.value);
                                }}
                                id="outlined-required"
                                label="City / Municipality"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    {
                                        permanentAddress.cityMun?.map(item => (
                                            <MenuItem value={optionValue(item.mun_code, item.name)}>{item.name}</MenuItem>
                                        ))
                                    }
                                </InputField>
                                <InputField
                                select
                                required
                                value={ permanentAddress.values.barangay || "" }
                                disabled={!permanentAddress.values.cityMun}
                                error={form.errors.barangay? true : false}
                                helperText={form.errors.barangay?.errorText}
                                onChange={(e) => permanentAddress.setBarangay(e.target.value)}
                                id="outlined-required"
                                label="Brangay"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    {
                                        permanentAddress.barangay?.map(item => (
                                            <MenuItem value={item.name}>{item.name}</MenuItem>
                                        ))
                                    }
                                </InputField> 
                                <InputField
                                sx={{minWidth: '50px'}}
                                select
                                required
                                value={form.values.zone || ""}
                                error={form.errors.zone? true : false}
                                helperText={form.errors.zone?.errorText}
                                onChange={(e) => formDispatcher?.zone(e.target.value)}
                                id="outlined-required"
                                label="Zone (Purok)"
                                size="small">
                                <MenuItem value=''>No Value</MenuItem>
                                <MenuItem value='1'>1</MenuItem>
                                <MenuItem value='2'>2</MenuItem>
                                <MenuItem value='3'>3</MenuItem>
                                <MenuItem value='4'>4</MenuItem>
                                <MenuItem value='5'>5</MenuItem>
                                <MenuItem value='6'>6</MenuItem>
                            </InputField>
                        </DataGroup>
                        <h2 className="data-title">Current Address</h2> 
                        <FormControlLabel sx={{marginLeft: '10px'}} 
                            control={
                                <Checkbox 
                                checked={sameAsPermanentAddress} 
                                onChange={(e) => updateSameAsPermanentAddress(e.target.checked)}/>
                            } label="Same as Permanent Address" />
                        <DataGroup>
                        {
                            sameAsPermanentAddress? <>
                                <InputField
                                select
                                required
                                disabled
                                error={form.errors.region? true : false}
                                helperText={form.errors.region?.errorText}
                                value={ permanentAddress.values.region }
                                onChange={(e) => { 
                                    permanentAddress.setRegion(e.target.value)
                                }}
                                id="outlined-required"
                                label="Region"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    {
                                        permanentAddress.regions?.map(item => (
                                            <MenuItem value={optionValue(item.reg_code, item.name)}>{item.name}</MenuItem>
                                        ))
                                    }
                                </InputField>
                                <InputField
                                select
                                required
                                disabled
                                value={permanentAddress.values.province}
                                error={form.errors.province? true : false}
                                helperText={form.errors.province?.errorText}
                                onChange={(e) => {
                                    permanentAddress.setProvince(e.target.value);
                                }}
                                id="outlined-required"
                                label="Province"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    {
                                        permanentAddress.provinces?.map(item => (
                                            <MenuItem value={optionValue(item.prov_code, item.name)}>{item.name}</MenuItem>
                                        ))
                                    }
                                </InputField>
                                <InputField
                                select
                                required
                                disabled
                                value={permanentAddress.values.cityMun}
                                error={form.errors.cityOrMunicipality? true : false}
                                helperText={form.errors.cityOrMunicipality?.errorText}
                                onChange={(e) => {
                                    permanentAddress.setCityMun(e.target.value);
                                }}
                                id="outlined-required"
                                label="City / Municipality"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    {
                                        permanentAddress.cityMun?.map(item => (
                                            <MenuItem value={optionValue(item.mun_code, item.name)}>{item.name}</MenuItem>
                                        ))
                                    }
                                </InputField>
                                <InputField
                                select
                                required
                                disabled
                                value={ permanentAddress.values.barangay }
                                error={form.errors.barangay? true : false}
                                helperText={form.errors.barangay?.errorText}
                                onChange={(e) => permanentAddress.setBarangay(e.target.value)}
                                id="outlined-required"
                                label="Brangay"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    {
                                        permanentAddress.barangay?.map(item => (
                                            <MenuItem value={item.name}>{item.name}</MenuItem>
                                        ))
                                    }
                                </InputField> 
                                <InputField
                                sx={{minWidth: '50px'}}
                                select
                                required
                                disabled
                                value={form.values.zone || ""}
                                error={form.errors.zone? true : false}
                                helperText={form.errors.zone?.errorText}
                                onChange={(e) => formDispatcher?.zone(e.target.value)}
                                id="outlined-required"
                                label="Zone (Purok)"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    <MenuItem value='1'>1</MenuItem>
                                    <MenuItem value='2'>2</MenuItem>
                                    <MenuItem value='3'>3</MenuItem>
                                    <MenuItem value='4'>4</MenuItem>
                                    <MenuItem value='5'>5</MenuItem>
                                    <MenuItem value='6'>6</MenuItem>
                                </InputField>
                            </> : <>
                                <InputField
                                select
                                required
                                error={currentAddressForm.errors.region? true : false}
                                helperText={currentAddressForm.errors.region?.errorText}
                                value={ currentAddress.values.region || ""}
                                onChange={(e) => { 
                                    currentAddress.setRegion(e.target.value)
                                }}
                                id="outlined-required"
                                label="Region"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    {
                                        currentAddress.regions?.map(item => (
                                            <MenuItem value={optionValue(item.reg_code, item.name)}>{item.name}</MenuItem>
                                        ))
                                    }
                                </InputField>
                                <InputField
                                select
                                required
                                disabled={!currentAddress.values.region}
                                value={currentAddress.values.province || ""}
                                error={currentAddressForm.errors.province? true : false}
                                helperText={currentAddressForm.errors.province?.errorText}
                                onChange={(e) => {
                                    currentAddress.setProvince(e.target.value);
                                }}
                                id="outlined-required"
                                label="Province"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    {
                                        currentAddress.provinces?.map(item => (
                                            <MenuItem value={optionValue(item.prov_code, item.name)}>{item.name}</MenuItem>
                                        ))
                                    }
                                </InputField>
                                <InputField
                                select
                                required
                                disabled={!currentAddress.values.province}
                                value={currentAddress.values.cityMun || ""}
                                error={currentAddressForm.errors.cityOrMunicipality? true : false}
                                helperText={currentAddressForm.errors.cityOrMunicipality?.errorText}
                                onChange={(e) => {
                                    currentAddress.setCityMun(e.target.value);
                                }}
                                id="outlined-required"
                                label="City / Municipality"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    {
                                        currentAddress.cityMun?.map(item => (
                                            <MenuItem value={optionValue(item.mun_code, item.name)}>{item.name}</MenuItem>
                                        ))
                                    }
                                </InputField>
                                <InputField
                                select
                                required
                                disabled={!currentAddress.values.cityMun}
                                value={ currentAddress.values.barangay || "" }
                                error={currentAddressForm.errors.barangay? true : false}
                                helperText={currentAddressForm.errors.barangay?.errorText}
                                onChange={(e) => currentAddress.setBarangay(e.target.value)}
                                id="outlined-required"
                                label="Brangay"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    {
                                        currentAddress.barangay?.map(item => (
                                            <MenuItem value={item.name}>{item.name}</MenuItem>
                                        ))
                                    }
                                </InputField> 
                                <InputField
                                sx={{minWidth: '50px'}}
                                select
                                required
                                value={currentAddressForm.values.zone || ""}
                                error={currentAddressForm.errors.zone? true : false}
                                helperText={currentAddressForm.errors.zone?.errorText}
                                onChange={(e) => currentAddressFormValueDispatcher?.zone(e.target.value)}
                                id="outlined-required"
                                label="Zone (Purok)"
                                size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                    <MenuItem value='1'>1</MenuItem>
                                    <MenuItem value='2'>2</MenuItem>
                                    <MenuItem value='3'>3</MenuItem>
                                    <MenuItem value='4'>4</MenuItem>
                                    <MenuItem value='5'>5</MenuItem>
                                    <MenuItem value='6'>6</MenuItem>
                                </InputField>
                            </>
                        }
                        </DataGroup>
                        <h2 className="data-title">Barangay Senior Citizens Association</h2> 
                        <DataGroup>
                            <FormControlLabel sx={{marginLeft: '10px'}} 
                            control={
                                <Checkbox 
                                checked={isSeniorCitizenMember} 
                                onChange={(e) => setIsSeniorCitizenMember(e.target.checked)}/>
                            } label="Barangay Senior Citizens Association member?" />
                        </DataGroup>
                        <Button onClick={() => {
                            form.clear();
                            homeContactInfoForm.clear()
                            permanentAddress.setRegion(null);
                            currentAddress.setRegion(null);
                            setCpNumber("");
                            setHomeCpNumber("");
                            setTelNumber("");
                            setHomeTelNumber("");
                        }}>Clear form</Button>
                        <AddResidentFormSubmitButton 
                        endIcon={isLoading? <CircularProgress size={20} color="inherit" /> : null}
                        variant="contained" 
                        disabled={!formIsReadyState}
                        onClick={() => {
                            const residenRecord: TResidentRecord = {
                                personalInformation: {
                                    firstName: form.values.firstName as string,
                                    surName: form.values.surName as string,
                                    middleName: form.values.middleName as string,
                                    extName: form.values.extName as string | null,
                                    gender: form.values.gender as string,
                                    dateOfBirth: `${new Date(form.values.dateOfBirth as string).getFullYear()}-${new Date(form.values.dateOfBirth as string).getMonth() + 1}-${new Date(form.values.dateOfBirth as string).getDate()}` as string,
                                    maritalStatus: form.values.maritalStatus as string
                                },
                                contactInformation: {
                                    cpNumber: form.values.cpNumber as string | null,
                                    email: form.values.emailAddress as string | null,
                                    telephoneNumber: form.values.telNumber as string | null
                                },
                                homeContactInformation: {
                                    cpNumber: homeContactInfoForm.values.cpNumber as string | null,
                                    email: homeContactInfoForm.values.email as string | null,
                                    telephoneNumber: homeContactInfoForm.values.telephoneNumber as string | null
                                },
                                permanentAddress: {
                                    region: form.values.region as string,
                                    province: form.values.province as string,
                                    cityOrMunicipality: form.values.cityOrMunicipality as string,
                                    barangay: form.values.barangay as string,
                                    zone: form.values.zone as string
                                },
                                currentAddress: sameAsPermanentAddress? {
                                    region: form.values.region as string,
                                    province: form.values.province as string,
                                    cityOrMunicipality: form.values.cityOrMunicipality as string,
                                    barangay: form.values.barangay as string,
                                    zone: form.values.zone as string
                                } : {
                                    region: form.values.region as string,
                                    province: form.values.province as string,
                                    cityOrMunicipality: form.values.cityOrMunicipality as string,
                                    barangay: form.values.barangay as string,
                                    zone: form.values.zone as string
                                },
                                senior_citizen: isSeniorCitizenMember,
                            }

                            addResidenRecord(residenRecord, () => alert("success"));

                        }}>Submit</AddResidentFormSubmitButton>
                    </AddResidentFormControl>
                </Content>
            </Container>
        </>
    )
}

export default AddResident;