import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseISO } from 'date-fns';
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { TAddress, TUpdateResidentAddressQuery } from "../../app/types/TUpdateResidentAddress";
import * as Yup from 'yup';
import { debounce } from 'lodash';
import { TResident } from "../../API/getResidentsRecord";
import { TResidentInfoWithAddress } from "../../API/getResidentRecord";
import useGetResidentRecord from "../../API/hooks/useGetResiden";
import useUpdateResidentAddress from "../../API/hooks/useUpdateResidentAddress";
import usePhilippinePlacesPickerSelect from "../../utils/hooks/usePhilippinePlacePickerSelect";
import { optionValue } from "../../utils/hooks/usePhilippinePlacePickerSelect";
import doRequest from "../../API/doRequest";
import useDeleteModal from "../../app/DeleteModal/useDeleteModal";
import DeleteModal from "../../app/DeleteModal/DeleteModal";
import PageNotFound from "../../app/PageNotFound";
//Helpers
import checkObjectValuesMatch from "../../utils/helpers/checkObjValueMatch";

//TYPES
import { TUpdateQuery } from "../../app/types/TUpdateRecordQuery";

import useUpdateResidentRecord from "../../API/hooks/useUpdateResidentRecord";

//Date Picker Component
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Mui Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

//MUI Component
import {
    CircularProgress,
    Avatar,
    Snackbar,
    Box, Divider, Paper, Button,TextField, Select, MenuItem, Chip, Alert
} from '@mui/material';


import { Container, Content } from "../../app/AppLayout";
import { formatToPHCPNumberValue } from "../../utils/hooks/usePHCPNumberFormat";
import { formatPhoneNumber } from "../../utils/hooks/usePHTelNumberFormat";

const TableContainer = styled(Paper)`
    display: flex;
    flex: 0 1 1000px;
    flex-wrap: wrap;
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
            .row {
                display: flex;
                flex: 0 1 100%;
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

    @media screen and (max-width: 650px) {
       .col-1 {
            flex: 0 1 100%;
            justify-content: center;
        }
    }
`;


const validatePHNumber: Yup.TestFunction<Yup.Maybe<string | undefined>, Yup.AnyObject> = function (
    value: Yup.Maybe<string | undefined>,
    context: Yup.TestContext<Yup.AnyObject>
  ) {
    const { path, createError } = context;
  
    // Your custom validation logic goes here
    if (!value) {
      return true; // Allow empty string or null
    }
  
    const cleanedPhoneNumber = value.replace(/-/g, "");
    const phoneNumberRegex = /^(09)\d{9}$/;

    const isValid = phoneNumberRegex.test(cleanedPhoneNumber);
    if (isValid) {
      return true;
    } else {
      return createError({ path, message: 'Validation failed.' });
    }
};

const isValidPHAreaCode = (areaCode: string): boolean => {
    const validAreaCodes = [
      "02", "032", "033", "034", "035", "036", "038", "042", "043", "044", 
      "045", "046", "047", "048", "049", "052", "053", "054", "055", "056", 
      "062", "063", "064", "072", "075", "076", "077", "078", "082", "083", 
      "084", "085", "086", "088", "089", "092", "094", "095", "096", "097", 
      "098", "099"
    ];
    return validAreaCodes.includes(areaCode);
};

const validatePHTelNumber: Yup.TestFunction<Yup.Maybe<string | undefined>, Yup.AnyObject> = function (
    value: Yup.Maybe<string | undefined>,
    context: Yup.TestContext<Yup.AnyObject>
) {
    const { path, createError } = context;

    // Your custom validation logic goes here
    if (!value) {
        return true; // Allow empty string or null
    }


    const cleanedTelephoneNumber = value.replace(/\D/g, "");
    const caption =
        "Telephone Number must be in a valid format e.g: XXXX-XXXX or (XX) XXXX-XXXX or (XXX) XXXX-XXXX";

    if (cleanedTelephoneNumber.length === 8) {
        return true;
    }

    if (cleanedTelephoneNumber.length === 10 || cleanedTelephoneNumber.length === 11) {
        const areaCodeLength = cleanedTelephoneNumber.length === 10 ? 2 : 3;
        const areaCode = cleanedTelephoneNumber.substring(0, areaCodeLength);
        const localExchangeCode = cleanedTelephoneNumber.substring(areaCodeLength, areaCodeLength + 4);

        const isValidAreaCode = isValidPHAreaCode(areaCode);
        const isValidLocalExchangeCode = /^[0-9]{4}$/.test(localExchangeCode);

        const isValid = isValidAreaCode && isValidLocalExchangeCode;
        if (isValid) {
            return true;
        } else {
            return createError({ path, message: isValidLocalExchangeCode? "Invalid Area Code. " : "Invalid Local Exchange Code. " });
        }
    }
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    middleName: Yup.string().required(),
    surname: Yup.string().required(),
    extName: Yup.string().nullable().notRequired(),
    dateOfBirth: Yup.date()
    .min(new Date('1903-01-01'), 'Date must be after or equal to 1903-01-01')
    .max(new Date(), 'Date must be before or equal to today'),
    gender: Yup.string().oneOf(["male", "female"]).required(),
    maritalStatus: Yup.string().oneOf([ "single", "married", "widowed", "divorced", "separated"]).required(),
    personalEmail: Yup.string().nullable().notRequired().email('Invalid email'),
    personalCPNumber: Yup.string().nullable().notRequired().test('personalPHCPNumber', 'Invalid Philippine phone number', validatePHNumber),
    personalTelNumber: Yup.string().nullable().notRequired().test('personalPHTelNumber', 'Invalid Philippine Tel number', validatePHTelNumber),
    homeEmail: Yup.string().nullable().notRequired().email('Invalid email'),
    homeCPNumber: Yup.string().nullable().notRequired().test('homePHCPNumber', 'Invalid Philippine phone number', validatePHNumber),
    homeTelNumber: Yup.string().nullable().notRequired().test('homePHTelNumber', 'Invalid Philippine Tel number', validatePHTelNumber),
});

const ResidentInformation: React.FC = () => {
    const navigate = useNavigate();
    const deleteRecordModal = useDeleteModal();
    const {updateResidentAddress, isLoading: isUpdatingAddress, isError: isErrorUpdatingAddress, isSuccess: isUpdateAddressSuccess } = useUpdateResidentAddress();
    const {updateResidentRecord, isLoading: isUpdatingRecord, isSuccess: updateSuccess, isError: isErrorUpdatingRecord, error: updateError} = useUpdateResidentRecord();
    const {action, residentUID} = useParams();
    const {data: residentRecord, refetch, isLoading, isError, isSuccess, error} = useGetResidentRecord(residentUID);
    const [mode, setMode] = useState(action as string);
    const [editData, setEditData] = useState<null | TResidentInfoWithAddress>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<null | TResidentInfoWithAddress>(null);
    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = useState({} as Record<string, string>);
    const [updateAddressSubmitReady, setUpdateAddressSubmitReady] = useState(false);

    const [is404, setIs404] = useState(false);

    const [permanentAddressForm, permanentAddressFormValueDispatcher] = React.useState({
        region: "",
        province: "",
        cityMun: "",
        barangay: "",
        zone: ""
    })

    const [currentAddressForm, currentAddressFormValueDispatcher] = React.useState({
        region: "",
        province: "",
        cityMun: "",
        barangay: "",
        zone: ""
    })

    const permanentAddress = usePhilippinePlacesPickerSelect(
        (region) => permanentAddressFormValueDispatcher({...permanentAddressForm, region: region? region : ""}),
        (province) => permanentAddressFormValueDispatcher({...permanentAddressForm, province: province? province : ""}),
        (cityMun) => permanentAddressFormValueDispatcher({...permanentAddressForm, cityMun: cityMun? cityMun : ""}),
        (barangay) => permanentAddressFormValueDispatcher({...permanentAddressForm, barangay: barangay? barangay : ""})
    );

    const currentAddress = usePhilippinePlacesPickerSelect(
        (region) => currentAddressFormValueDispatcher({...currentAddressForm, region: region? region : ""}),
        (province) => currentAddressFormValueDispatcher({...currentAddressForm, province: province? province : ""}),
        (cityMun) => currentAddressFormValueDispatcher({...currentAddressForm, cityMun: cityMun? cityMun : ""}),
        (barangay) => currentAddressFormValueDispatcher({...currentAddressForm, barangay: barangay? barangay : ""})
    );

    const checkReadyToSubmit = () => {
        const permanentAddressValues = Object.values(permanentAddressForm);
        const currentAddressValues = Object.values(currentAddressForm);

        // Check if all fields are not null or empty in both permanentAddressForm and currentAddressForm
        const isAllFieldsValid =
            permanentAddressValues.every((value) => value !== null && value !== "") &&
            currentAddressValues.every((value) => value !== null && value !== "");

        // Check if one form has all values that are not null or empty, and the other form is all null or empty
        const isOneFormReady =
            ((permanentAddressValues.every((value) => value !== null && value !== "") &&
            currentAddressValues.every((value) => value === null || value === ""))) ||
            ((currentAddressValues.every((value) => value !== null && value !== "") &&
            permanentAddressValues.every((value) => value === null || value === "")));

        // Update isReadyToSubmit based on the conditions
        setUpdateAddressSubmitReady(isAllFieldsValid || isOneFormReady);
    };


    const validateForm = debounce(async () => {
        try {
            await validationSchema.validate(editData, { abortEarly: false });
            setErrors({});
        } catch (error: any) {
            if (error instanceof Yup.ValidationError) {
                const validationErrors: { [key: string]: string } = {}; // Define the type of validationErrors
                error.inner.forEach((err) => {
                    if (err.path) {
                        validationErrors[err.path] = err.message;
                    }
                });

                setErrors(validationErrors);
            }
        }
    }, 300);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    }
    ;
    React.useEffect(() => {
        if(currentRecord) setEditData(currentRecord);
    }, [currentRecord])

    React.useEffect(() => {
        editData && currentRecord && setHasChanges(!checkObjectValuesMatch(editData, currentRecord));
    }, [editData]);

    React.useEffect(() => {
        validateForm();
    }, [editData]);

    React.useEffect(() => {
        setCurrentRecord(residentRecord);
        console.log(residentRecord)
    }, [residentRecord]);

    React.useEffect(() => {
       checkReadyToSubmit();
    }, [currentAddressForm, permanentAddressForm]);

    return (
        <> 
        {
            isError? <PageNotFound /> : <>
            {
                !isLoading && <>
                <Container>
                    <DeleteModal onDeleteSuccess={() => navigate('/admin/information/residents')}/>
                    <TableContainer elevation={5}>
                        <div className="col-1">
                            <div className="row center-content dp-container">
                                <Avatar sx={{height: '140px', width: '140px'}} src={`/assets/images/avatar/${currentRecord?.picture}`} alt="Danielle" />
                            </div>
                            <div className="row center-content">
                                <h2>{`${currentRecord?.firstName} ${currentRecord?.middleName[0]}. ${currentRecord?.surname} ${currentRecord?.extName? currentRecord.extName : ''}`.toUpperCase()}</h2>
                            </div>
                            <div className="row center-content">
                                <h4 className="resident-uid">{currentRecord?.residentUID}</h4>
                            </div>
                            <Divider sx={{flex: "0 1 100%", padding: '10px 0'}} variant="middle" orientation="horizontal" flexItem/>
                            {
                                !(mode == "edit") && <div className="row center-content action-btn">
                                    <Button startIcon={<EditIcon />} sx={{width: "90%"}} size="large" color="secondary" onClick={(e) => setMode("edit")}>Edit Information</Button>
                                </div>
                            }
                            {
                                !(mode == "update-address") &&  <div className="row center-content action-btn">
                                    <Button startIcon={<EditLocationAltIcon />} sx={{width: "90%"}} size="large" color="success" onClick={(e) => setMode("update-address")}>Update Address</Button>
                                </div>
                            }
                            <div className="row center-content action-btn">
                                <Button startIcon={<DeleteIcon />} sx={{width: "90%"}} size="large" color="error"
                                onClick={() => {
                                    deleteRecordModal(`Records of ${currentRecord?.firstName.toLocaleUpperCase()} ${currentRecord?.middleName.toLocaleUpperCase()}. ${currentRecord?.surname.toLocaleUpperCase()}`, () => {
                                        return new Promise<{success: boolean}>((res, rej) => {
                                        doRequest({
                                            method: "DELETE",
                                            url: "/delete-resident-record",
                                            data: { residentUID:  residentUID}
                                        })
                                            .then(response => {
                                                response.success? res(response) : rej(response);
                                            })
                                            .catch(err => rej({success: false}))
                                        })
                                    })
                                }}>Delete Record</Button>
                            </div>
                            <div className="row center-content action-btn">
                                <Button startIcon={<PrintIcon />} sx={{width: "90%"}} size="large" onClick={(e) => navigate(`/admin/e-services/print-document/${residentUID}`)}>Print Document</Button>
                            </div>
                        </div>
                        <Divider orientation="vertical" sx={{height: "100%"}}/>
                        <div className="col-2">
                            {
                                mode == "edit" && <h2>Edit Resident Information</h2>
                            }
                            {
                                mode == "update-address" && <h2>Update Resident Address</h2>
                            }
                            {
                                mode == "view" && <h2>Resident Information</h2>
                            }
                            <Divider sx={{flex: "0 1 100%"}} orientation="horizontal" flexItem />
                            {
                                currentRecord && mode == "update-address" && <>
                                <div className="data-group">
                                    <h4>Permanent Address</h4>
                                    <div className="row">
                                        <Chip sx={{
                                        height: 'auto',
                                        '& .MuiChip-label': {
                                            display: 'block',
                                            whiteSpace: 'normal',
                                        },
                                        }} icon={<PersonPinCircleIcon />} label={currentRecord.permanentAddress} />
                                    </div>
                                    <div className="row">
                                        <Alert severity="info">Please fill out the form to update the resident's permanent address. If there are no changes, kindly leave the corresponding field blank.</Alert>
                                    </div>
                                    <TextField
                                    disabled={isUpdatingAddress}
                                    select
                                    sx={{flex: "1 0 230px"}}
                                    label="Region"
                                    id="outlined-size-small"
                                    value={permanentAddress.values.region}
                                    onChange={(e) => permanentAddress.setRegion(e.target.value)}
                                    size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                        {
                                            permanentAddress.regions?.map(item => (
                                                <MenuItem value={optionValue(item.reg_code, item.name)}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                    disabled={isUpdatingAddress}
                                    select
                                    sx={{flex: "1 0 230px"}}
                                    label="Province"
                                    id="outlined-size-small"
                                    value={permanentAddress.values.province}
                                    onChange={(e) => permanentAddress.setProvince(e.target.value)}
                                    size="small"
                                    >
                                        <MenuItem value=''>No Value</MenuItem>
                                        {
                                            permanentAddress.provinces?.map(item => (
                                                <MenuItem value={optionValue(item.prov_code, item.name)}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                    disabled={isUpdatingAddress}
                                    select
                                    sx={{flex: "1 0 230px"}}
                                    label="City/Municipality"
                                    id="outlined-size-small"
                                    value={permanentAddress.values.cityMun}
                                    onChange={(e) => permanentAddress.setCityMun(e.target.value)}
                                    size="small"
                                    >
                                        <MenuItem value=''>No Value</MenuItem>
                                        {
                                            permanentAddress.cityMun?.map(item => (
                                                <MenuItem value={optionValue(item.mun_code, item.name)}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                    disabled={isUpdatingAddress}
                                    select
                                    sx={{flex: "1 0 230px"}}
                                    label="Barangay"
                                    id="outlined-size-small"
                                    value={permanentAddress.values.barangay}
                                    onChange={(e) => permanentAddress.setBarangay(e.target.value)}
                                    size="small"
                                    >
                                        <MenuItem value=''>No Value</MenuItem>
                                        {
                                            permanentAddress.barangay?.map(item => (
                                                <MenuItem value={item.name}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                    disabled={isUpdatingAddress}
                                    select
                                    sx={{flex: "1 0 230px"}}
                                    label="Zone/Purok"
                                    id="outlined-size-small"
                                    value={permanentAddressForm.zone}
                                    onChange={(e) => permanentAddressFormValueDispatcher({...permanentAddressForm, zone: e.target.value})}
                                    size="small"
                                    >
                                        <MenuItem value=''>No Value</MenuItem>
                                        <MenuItem value='1'>1</MenuItem>
                                        <MenuItem value='2'>2</MenuItem>
                                        <MenuItem value='3'>3</MenuItem>
                                        <MenuItem value='4'>4</MenuItem>
                                        <MenuItem value='5'>5</MenuItem>
                                        <MenuItem value='6'>6</MenuItem>
                                    </TextField>
                                </div>
                                <div className="data-group">
                                    <h4>Current Address</h4>
                                    <div className="row">
                                        <Chip sx={{
                                        height: 'auto',
                                        '& .MuiChip-label': {
                                            display: 'block',
                                            whiteSpace: 'normal',
                                        },
                                        }} icon={<PersonPinCircleIcon />} label={currentRecord.currentAddress}  />
                                    </div>
                                    <div className="row">
                                        <Alert severity="info">Please fill out the form to update the resident's current address. If there are no changes, kindly leave the corresponding field blank.</Alert>
                                    </div>
                                    <TextField
                                    disabled={isUpdatingAddress}
                                    select
                                    sx={{flex: "1 0 230px"}}
                                    label="Region"
                                    id="outlined-size-small"
                                    value={currentAddress.values.region}
                                    onChange={(e) => currentAddress.setRegion(e.target.value)}
                                    size="small">
                                    <MenuItem value=''>No Value</MenuItem>
                                        {
                                            currentAddress.regions?.map(item => (
                                                <MenuItem value={optionValue(item.reg_code, item.name)}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                    disabled={isUpdatingAddress}
                                    select
                                    sx={{flex: "1 0 230px"}}
                                    label="Province"
                                    id="outlined-size-small"
                                    value={currentAddress.values.province}
                                    onChange={(e) => currentAddress.setProvince(e.target.value)}
                                    size="small"
                                    >
                                        <MenuItem value=''>No Value</MenuItem>
                                        {
                                            currentAddress.provinces?.map(item => (
                                                <MenuItem value={optionValue(item.prov_code, item.name)}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                    disabled={isUpdatingAddress}
                                    select
                                    sx={{flex: "1 0 230px"}}
                                    label="City/Municipality"
                                    id="outlined-size-small"
                                    value={currentAddress.values.cityMun}
                                    onChange={(e) => currentAddress.setCityMun(e.target.value)}
                                    size="small"
                                    >
                                        <MenuItem value=''>No Value</MenuItem>
                                        {
                                            currentAddress.cityMun?.map(item => (
                                                <MenuItem value={optionValue(item.mun_code, item.name)}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                    disabled={isUpdatingAddress}
                                    select
                                    sx={{flex: "1 0 230px"}}
                                    label="Barangay"
                                    id="outlined-size-small"
                                    value={currentAddress.values.barangay}
                                    onChange={(e) => currentAddress.setBarangay(e.target.value)}
                                    size="small"
                                    >
                                        <MenuItem value=''>No Value</MenuItem>
                                        {
                                            currentAddress.barangay?.map(item => (
                                                <MenuItem value={item.name}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                    disabled={isUpdatingAddress}
                                    select
                                    sx={{flex: "1 0 230px"}}
                                    label="Zone/Purok"
                                    id="outlined-size-small"
                                    value={currentAddressForm.zone}
                                    onChange={(e) => currentAddressFormValueDispatcher({...currentAddressForm, zone: e.target.value})}
                                    size="small"
                                    >
                                            <MenuItem value=''>No Value</MenuItem>
                                        <MenuItem value='1'>1</MenuItem>
                                        <MenuItem value='2'>2</MenuItem>
                                        <MenuItem value='3'>3</MenuItem>
                                        <MenuItem value='4'>4</MenuItem>
                                        <MenuItem value='5'>5</MenuItem>
                                        <MenuItem value='6'>6</MenuItem>
                                    </TextField>
                                </div>
                                {
                                    isErrorUpdatingAddress && <div className="data-group">
                                        <Alert severity="error">Failed to update record. Possible reasons include lack of internet connection, authentication failure, or duplicate entries in personal contact information.</Alert>
                                    </div>
                                }
                                <div className="data-group">
                                    <Button sx={{marginLeft: "auto"}} color="secondary" variant="contained" onClick={() => {
                                        setMode("view");
                                        setEditData(currentRecord);
                                    }}>Cancel</Button>
                                    <Button disabled={!updateAddressSubmitReady} sx={{marginLeft: "10px"}} color="primary"
                                    onClick={() => {
                                        const permanentAddressValues: TAddress | null = Object.values(permanentAddressForm).every((value) => value !== null && value !== "")? {...permanentAddressForm} : null
                                        const currentAddressValues: TAddress | null = Object.values(currentAddressForm).every((value) => value !== null && value !== "")? {...currentAddressForm} : null
                                        const updateData: TUpdateResidentAddressQuery = {
                                            permanentAddress: permanentAddressValues,
                                            currentAddress: currentAddressValues
                                        }
                                        updateResidentAddress(residentUID as string, updateData, () => {
                                            currentAddressFormValueDispatcher({
                                                region: "",
                                                province: "",
                                                cityMun: "",
                                                barangay: "",
                                                zone: ""
                                            });
                                            permanentAddressFormValueDispatcher({
                                                region: "",
                                                province: "",
                                                cityMun: "",
                                                barangay: "",
                                                zone: ""
                                            });

                                            const permanentAddressUpdated = permanentAddressValues? `${permanentAddressValues.region}, Province of ${permanentAddressValues.province}, City/Municipality of ${permanentAddressValues.cityMun}, Brgy. ${permanentAddressValues.barangay}, Zone ${permanentAddressValues.zone}` : currentRecord.permanentAddress;
                                            const currentAddressUpdated = currentAddressValues? `${currentAddressValues.region}, Province of ${currentAddressValues.province}, City/Municipality of ${currentAddressValues.cityMun}, Brgy. ${currentAddressValues.barangay}, Zone ${currentAddressValues.zone}` : currentRecord.currentAddress;
                                            setCurrentRecord({
                                                ...currentRecord,
                                                currentAddress: currentAddressUpdated,
                                                permanentAddress: permanentAddressUpdated,
                                                currentRegion: currentAddressValues? currentAddressValues.region : currentRecord.currentRegion,
                                                currentProvince: currentAddressValues? currentAddressValues.province : currentRecord.currentProvince,
                                                currentCityMun: currentAddressValues? currentAddressValues.cityMun : currentRecord.currentCityMun,
                                                currentBarangay: currentAddressValues? currentAddressValues.barangay : currentRecord.currentBarangay,
                                                currentZone: currentAddressValues? currentAddressValues.zone : currentRecord.currentZone,
                                                permanentRegion: permanentAddressValues? permanentAddressValues.region : currentRecord.permanentRegion,
                                                permanentProvince: permanentAddressValues? permanentAddressValues.province : currentRecord.permanentProvince,
                                                permanentCityMun: permanentAddressValues? permanentAddressValues.cityMun : currentRecord.permanentCityMun,
                                                permanentBarangay: permanentAddressValues? permanentAddressValues.barangay : currentRecord.permanentBarangay,
                                                permanentZone: permanentAddressValues? permanentAddressValues.zone : currentRecord.permanentZone
                                            })
                                            setMode("view");
                                            setOpen(true);
                                        }, () => alert("failed"))
                                    }}>Update changes</Button>
                                </div>
                                </>
                            }
                            {
                                editData && mode == "edit" && <>
                                <div className="data-group">
                                    <h4>basic Information</h4>
                                    <TextField
                                    disabled={isUpdatingRecord}
                                    error={!!errors['firstName']}
                                    helperText={errors['firstName']}
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
                                    disabled={isUpdatingRecord}
                                    error={!!errors['middleName']}
                                    helperText={errors['middleName']}
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
                                    disabled={isUpdatingRecord}
                                    error={!!errors['surname']}
                                    helperText={errors['surname']}
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
                                    select
                                    disabled={isUpdatingRecord}
                                    error={!!errors['extName']}
                                    helperText={errors['extName']}
                                    sx={{flex: "1 0 230px"}}
                                    value={editData.extName?.toLowerCase() || ""}
                                    onChange={(e) => {
                                        setEditData({...editData, extName: e.target.value});
                                    }}
                                    label="Ext. name"
                                    size="small"
                                    >
                                        <MenuItem value="">
                                            <em>N/A</em>
                                        </MenuItem>
                                        <MenuItem value="jr">JR.</MenuItem>
                                        <MenuItem value="sr">SR.</MenuItem>    
                                    </TextField>
                                    <DatePicker
                                    disabled={isUpdatingRecord}
                                    value={parseISO(editData.dateOfBirth)}
                                    onChange={(e) => {
                                        setEditData({...editData, dateOfBirth: e? new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1).toISOString().slice(0, 10) : ""});
                                    }}
                                    label="Date of Birth"
                                    renderInput={(params) => <TextField {...params} error={!!errors['dateOfBirth']} helperText={errors['dateOfBirth']} sx={{flex: "1 0 230px"}} size="small" />}
                                    />
                                    <TextField
                                    error={!!errors['gender']}
                                    helperText={errors['gender']}
                                    select
                                    disabled={isUpdatingRecord}
                                    sx={{flex: "1 0 230px"}}
                                    value={editData.gender.toLowerCase()}
                                    onChange={(e) => {
                                        setEditData({...editData, gender: e.target.value});
                                    }}
                                    label="Gender"
                                    size="small"
                                    >
                                        <MenuItem value="">
                                            <em>N/A</em>
                                        </MenuItem>
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                    </TextField>
                                    <TextField
                                    select
                                    error={!!errors['maritalStatus']}
                                    helperText={errors['maritalStatus']}
                                    disabled={isUpdatingRecord}
                                    sx={{flex: "1 0 230px"}}
                                    defaultValue={editData.maritalStatus || ""}
                                    onChange={(e) => {
                                        setEditData({...editData, maritalStatus: e.target.value});
                                    }}
                                    label="Marital Status"
                                    size="small"
                                    >
                                        <MenuItem value="">
                                            <em>N/A</em>
                                        </MenuItem>
                                        <MenuItem value="single">Single</MenuItem>
                                        <MenuItem value="married">Married</MenuItem>
                                        <MenuItem value="widowed">Widowed</MenuItem>
                                        <MenuItem value="divorced">Divorced</MenuItem>
                                        <MenuItem value="separated">Separated</MenuItem>
                                    </TextField>
                                </div>
                                <div className="data-group">
                                    <h4>Contact Information (Personal)</h4>
                                    <TextField
                                    disabled={isUpdatingRecord}
                                    error={!!errors['personalEmail']}
                                    helperText={errors['personalEmail']}
                                    sx={{flex: "1 0 230px"}}
                                    label="Email"
                                    id="outlined-size-small"
                                    value={editData.personalEmail}
                                    onChange={(e) => {
                                        setEditData({...editData, personalEmail: e.target.value});
                                    }}
                                    size="small"
                                    />
                                    <TextField
                                    disabled={isUpdatingRecord}
                                    error={!!errors['personalCPNumber']}
                                    helperText={errors['personalCPNumber']}
                                    sx={{flex: "1 0 230px"}}
                                    label="CP Number"
                                    id="outlined-size-small"
                                    value={editData.personalCPNumber}
                                    onChange={(e) => {
                                        setEditData({...editData, personalCPNumber: formatToPHCPNumberValue(e.target.value)});
                                    }}
                                    size="small"
                                    />
                                    <TextField
                                    disabled={isUpdatingRecord}
                                    error={!!errors['personalTelNumber']}
                                    helperText={errors['personalTelNumber']}
                                    sx={{flex: "1 0 230px"}}
                                    label="Tel Number"
                                    id="outlined-size-small"
                                    value={editData.personalTelNumber}
                                    onChange={(e) => {
                                        setEditData({...editData, personalTelNumber: formatPhoneNumber(e.target.value)});
                                    }}
                                    size="small"
                                    />
                                </div>
                                <div className="data-group">
                                    <h4>Contact Information (Home)</h4>
                                    <TextField
                                    disabled={isUpdatingRecord}
                                    error={!!errors['homeEmail']}
                                    helperText={errors['homeEmail']}
                                    sx={{flex: "1 0 230px"}}
                                    label="Email"
                                    id="outlined-size-small"
                                    value={editData.homeEmail || ""}
                                    onChange={(e) => {
                                        setEditData({...editData, homeEmail: e.target.value});
                                    }}
                                    size="small"
                                    />
                                    <TextField
                                    disabled={isUpdatingRecord}
                                    error={!!errors['homeCPNumber']}
                                    helperText={errors['homeCPNumber']}
                                    sx={{flex: "1 0 230px"}}
                                    label="CP Number"
                                    id="outlined-size-small"
                                    value={editData.homeCPNumber || ""}
                                    onChange={(e) => {
                                        setEditData({...editData, homeCPNumber: formatToPHCPNumberValue(e.target.value)});
                                    }}
                                    size="small"
                                    />
                                    <TextField
                                    disabled={isUpdatingRecord}
                                    error={!!errors['homeTelNumber']}
                                    helperText={errors['homeTelNumber']}
                                    sx={{flex: "1 0 230px"}}
                                    label="Tel Number"
                                    id="outlined-size-small"
                                    value={editData.homeTelNumber || ""}
                                    onChange={(e) => {
                                        setEditData({...editData, homeTelNumber: formatPhoneNumber(e.target.value)});
                                    }}
                                    size="small"
                                    />
                                </div>
                                {
                                    updateError && <div className="data-group">
                                        <Alert severity="error">Failed to update record. Possible reasons include lack of internet connection, authentication failure, or duplicate entries in personal contact information.</Alert>
                                    </div>
                                }
                                <div className="data-group">
                                    <Button sx={{marginLeft: "auto"}} color="secondary" variant="contained" onClick={() => {
                                        setMode("view");
                                        setEditData(currentRecord);
                                    }}>Cancel</Button>
                                    <Button disabled={!hasChanges} sx={{marginLeft: "10px"}} color="primary" 
                                    endIcon={isUpdatingRecord? <CircularProgress size={20} color="inherit" /> : null}
                                    onClick={() => {
                                        const fullNameStateUpdate = checkObjectValuesMatch({
                                            firstName: currentRecord?.firstName,
                                            middleName: currentRecord?.middleName,
                                            surName: currentRecord?.surname,
                                            extName: currentRecord?.extName
                                        }, {
                                            firstName: editData?.firstName,
                                            middleName: editData?.middleName,
                                            surName: editData?.surname,
                                            extName: editData?.extName
                                        })? "CURRENT_STATE" : "MODIFIED";

                                        const personalInfoStateUpdate = checkObjectValuesMatch({
                                            dateOfBirth: currentRecord?.dateOfBirth,
                                            gender: currentRecord?.gender,
                                            maritalStatus: currentRecord?.maritalStatus
                                        }, {
                                            dateOfBirth: editData?.dateOfBirth,
                                            gender: editData?.gender,
                                            maritalStatus: editData?.maritalStatus
                                        })? "CURRENT_STATE" : "MODIFIED";

                                        const personalContactInfoStateUpdate = 
                                            (currentRecord?.personalEmail == null && currentRecord?.personalCPNumber == null && currentRecord?.personalTelNumber == null)?
                                                (editData?.personalEmail || editData?.personalCPNumber || editData?.personalTelNumber)? "CREATED" : "CURRENT_STATE" : 
                                            ((editData?.personalEmail == "" || editData?.personalEmail == null) && (editData?.personalCPNumber == "" || editData?.personalCPNumber == null) && (editData?.personalTelNumber == "" || editData?.personalTelNumber == null))? "REMOVED" : 
                                                (currentRecord?.personalEmail == editData.personalEmail && currentRecord?.personalCPNumber == editData.personalCPNumber && currentRecord?.personalTelNumber == editData.personalTelNumber)? "CURRENT_STATE" : "MODIFIED"

                                        const homeContactInfoStateUpdate = 
                                            (currentRecord?.homeEmail == null && currentRecord?.homeCPNumber == null && currentRecord?.homeTelNumber == null)?
                                                (editData?.homeEmail || editData?.homeCPNumber || editData?.homeTelNumber)? "CREATED" : "CURRENT_STATE" : 
                                            ((editData?.homeEmail == "" || editData?.homeEmail == null) && (editData?.homeCPNumber == "" || editData?.homeCPNumber == null) && (editData?.homeTelNumber == "" || editData?.homeTelNumber == null))? "REMOVED" : 
                                                (currentRecord?.homeEmail == editData.homeEmail && currentRecord?.homeCPNumber == editData.homeCPNumber && currentRecord?.homeTelNumber == editData.homeTelNumber)? "CURRENT_STATE" : "MODIFIED";

                                        const updateQuery: TUpdateQuery = {
                                            values: {
                                                personalInformation: {
                                                    firstName: editData.firstName,
                                                    surName: editData.surname,
                                                    middleName: editData.middleName,
                                                    extName: editData.extName,
                                                    gender: editData.gender,
                                                    dateOfBirth: ((d: string) => {
                                                        const dob = new Date(d);
                                                        const dobToUc = new Date(Date.UTC(dob.getFullYear(), dob.getMonth(), dob.getDate()));
                                                        return `${dobToUc.getFullYear()}-${dobToUc.getMonth() + 1}-${dobToUc.getDate()}`;
                                                    })(editData.dateOfBirth),
                                                    maritalStatus: editData.maritalStatus,
                                                },
                                                personalContactInfo: {
                                                    email: editData.personalEmail || null,
                                                    cpNumber: editData.personalCPNumber || null,
                                                    telNumber: editData.personalTelNumber || null,
                                                },
                                                homeContactInfo: {
                                                    email: editData.homeEmail || null,
                                                    cpNumber: editData.homeCPNumber || null,
                                                    telNumber: editData.homeTelNumber || null,
                                                }
                                            },
                                            tableStateUpdates: {
                                                full_name: fullNameStateUpdate,
                                                personal_information: personalInfoStateUpdate,
                                                home_contact_info: homeContactInfoStateUpdate,
                                                personal_contact_info: personalContactInfoStateUpdate
                                            }
                                        }

                                        updateResidentRecord(residentUID as string, updateQuery, () => {
                                            setCurrentRecord({...editData});
                                            setMode("view");
                                            setOpen(true);
                                        })
                                    }}>Update Changes</Button>
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
                                    defaultValue={currentRecord.permanentRegion}
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
                                    defaultValue={currentRecord.currentRegion}
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
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Update record successfully
                        </Alert>
                    </Snackbar>
                </Container>
                </>
            }
            </>
            }
        </>
    )
}

export default ResidentInformation;