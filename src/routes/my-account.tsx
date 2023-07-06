import { styled } from "@mui/material/styles";
import React, {useState, useEffect} from "react";
import { Container, Content } from "../app/AppLayout";
import { useContext } from "react";
import { AdminAccountContextProvider } from "../context/adminAccountContext";
import * as Yup from 'yup';

import { 
    Paper,
    Box,
    Avatar,
    TextField,
    IconButton,
    Button
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import doRequest from "../API/doRequest";

const RouteContent = styled(Content)`
    flex-wrap: wrap;
`
const TableContainer = styled(Paper)`
    display: flex;
    flex: 0 1 1000px;
    height: fit-content;
    padding: 20px;
    flex-wrap: wrap;
    background-color: ${({theme}) => theme.customTheme.mainBackground};

    .row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        flex: 0 1 100%;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }

    .input-category-group {
        display: flex;
        flex: 0 1 100%;
        padding: 30px;
        align-items: center;
    }
`;

const schemaForname = Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces');

const schemaForEmail = Yup.string()
    .email('Invalid email address')
    .required('Email is required');
      
const schemaForPass = Yup.string()
    .nullable()
    .min(8, 'Password must be at least 8 characters')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    ).notRequired()

const MyAccount: React.FC = () => {
    const admin = useContext(AdminAccountContextProvider);

    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    const [editNameValue, setEditNameValue] = useState(admin?.name);
    const [editEmailValue, setEditEmailValue] = useState(admin?.email);

    const [currentPasswordValue, setCurrentPasswordVal] = useState("");
    const [newPassVal, setNewPassVal] = useState("");
    const [confirmPassVal, setConfirmPassVal] = useState("");

    const [editNameErr, setEditNameErr] = useState<boolean | string>(false);
    const [editEmailErr, setEditEmailErr] = useState<boolean | string>(false);
    const [passwordErr, setPasswordErr] = useState<boolean | string>(false);

    const [editNameOnSubmit, setEdtNameOnSubmit] = useState(false);
    const [editEmailOnSubmit, setEditEmailOnSubmit] = useState(false);
    const [newPassOnSubmit, setNewPassOnSUbmit] = useState(false);

    const validateName = async () => {
        try {
          await schemaForname.validate(editNameValue);
          setEditNameErr(false);
        } catch (error: any) {
            setEditNameErr(error.message);
        }
    };
    const validateEmail = async () => {
        try {
          await schemaForEmail.validate(editEmailValue);
          setEditEmailErr(false);
        } catch (error: any) {
            setEditEmailErr(error.message);
        }
    };
    const validateNewPass = async () => {
        try {
          await schemaForPass.validate(newPassVal);
          setPasswordErr(false);
        } catch (error: any) {
            setPasswordErr(error.message);
        }
    };
    
    useEffect(() => {
        validateName()
    }, [editNameValue]);

    useEffect(() => {
        validateEmail()
    }, [editEmailValue])

    useEffect(() => {
        validateNewPass()
    }, [newPassVal])


    return (
        <>
            <Container>
                <RouteContent>
                    <TableContainer>
                        <div className="row">
                            <Avatar src={`/assets/images/avatar/${admin?.avatar}`} sx={{width: '150px', height: '150px', marginRight: '20px'}}/>
                            <div className="col">
                                <div className="row">
                                    <h1>{admin?.name}</h1>
                                </div>
                                <div className="row">
                                    <h3>{admin?.email}</h3>
                                </div>
                                <div className="row">
                                    <h4>{admin?.role}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="input-category-group" >
                            <h4>Name: </h4>
                            <TextField disabled sx={{marginLeft: '20px'}}  value={admin?.name} fullWidth/>
                            {/* <IconButton aria-label="delete" color="primary" onClick={(e) => setEditName(true)}>
                                <EditIcon />
                            </IconButton> */}
                            
                            {
                                // editName && <>
                                //     <TextField error={!!editNameErr} sx={{marginLeft: '20px'}}  value={editNameValue} onChange={(e) => setEditNameValue(e.target.value)} fullWidth />
                                //     <IconButton disabled={!!editNameErr || editNameOnSubmit} aria-label="delete" color="primary" onClick={(e) => {
                                //         if(admin?.name == editNameValue) {
                                //             setEditName(false);
                                //         } else {
                                //             setEdtNameOnSubmit(true);
                                //             doRequest({
                                //                 method: "PATCH",
                                //                 url: "/edit-name",
                                //                 data: {name: editNameValue},
                                //                 baseURL: 'http://localhost:3005/admin',
                                //             })
                                //             .then(res => {
                                //                 window.location.reload();
                                //             })
                                //             .catch(err => alert("Failed to edit name"))
                                //         }
                                //     }}>
                                //         <CheckIcon />
                                //     </IconButton>
                                // </>
                            }
                            
                        </div>
                        <div className="input-category-group">
                            <h4>Email: </h4>
                            <TextField disabled sx={{marginLeft: '20px'}} value={admin?.email} fullWidth/>
                            {/* <IconButton aria-label="delete" color="primary" onClick={() => setEditEmail(true)}>
                                <EditIcon />
                            </IconButton>  */}
                            {/* {
                            editEmail && <>
                                <TextField error={!!editEmailErr} sx={{marginLeft: '20px'}}  value={editEmailValue} onChange={(e) => setEditEmailValue(e.target.value)} fullWidth />
                                    <IconButton disabled={!!editEmailErr || editEmailOnSubmit} aria-label="delete" color="primary" onClick={(e) => {
                                        if(admin?.name == editNameValue) {
                                            setEditEmail(false);
                                        } else {
                                            setEdtNameOnSubmit(true);
                                            doRequest({
                                                method: "PATCH",
                                                url: "/edit-email",
                                                data: {email: editEmailValue},
                                                baseURL: 'http://localhost:3005/admin',
                                            })
                                            .then(res => {
                                                window.location.reload();
                                            })
                                            .catch(err => alert("Failed to edit email"))
                                        }
                                    }}>
                                        <CheckIcon />
                                    </IconButton>
                            </>
                            } */}
                        </div>
                        {/* <div className="row">
                            <h1>Change Password</h1>
                        </div>
                        <div className="row">
                            <TextField sx={{margin: '10px 0' }} label="Current Password" value={currentPasswordValue} onChange={(e) => setCurrentPasswordVal(e.target.value)} fullWidth/>
                            <TextField sx={{margin: '10px 0' }} label="New Password" value={newPassVal} onChange={(e) => setNewPassVal(e.target.value)} fullWidth
                            error={!!passwordErr} helperText={passwordErr} />
                        </div>
                        <div className="row">
                            <Button sx={{marginLeft: 'auto'}} disabled={!(passwordErr == false && currentPasswordValue.length > 0) || newPassOnSubmit} onClick={() => {
                                setNewPassOnSUbmit(true);
                                doRequest({
                                    method: "DELETE",
                                    url: "/change-pass",
                                    data: {new: newPassVal, old: currentPasswordValue},
                                    baseURL: 'http://localhost:3005/admin',
                                })
                                .then(res => {
                                    window.location.reload();
                                })
                                .catch(err => alert("Failed to update password!"))
                            }} >Submit</Button>
                        </div> */}
                    </TableContainer>
                </RouteContent>
            </Container>
        </>
    )
}

export default MyAccount;
