import React, { useEffect, useState } from "react";
import { Avatar, Button, CircularProgress, MenuItem, styled as materialStyles } from "@mui/material";
import styled from "styled-components";

import LogoutIcon from '@mui/icons-material/Logout';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SendIcon from '@mui/icons-material/Send';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TaskAltIcon from '@mui/icons-material/TaskAlt'; 
import DrawIcon from '@mui/icons-material/Draw';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import RestoreIcon from '@mui/icons-material/Restore';
import {
    Box ,
    Paper,
    IconButton,
    Tooltip,
    Badge,
    Divider,
    TextField,
    Alert,
    Chip
} from "@mui/material";

import doRequest from "../../API/doRequest";

type TUser = {
    picture: string | null,
    name: string,
    residentUID: string
}

type TRequestItem = {
    documentType: string,
    status: string,
    purpose: string,
    id: number,
}

const FCResidentsRequestInteface: React.FC<{className?: string, user: TUser | null}> = ({className, user}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isRefetching, setIsRefetching] = useState(false);
    const [isError, setIsError] = useState(false);
    const [requestList, setRequestList] = useState<TRequestItem[]>([]);

    const [reqFor, setReqFor] = useState("");
    const [purpose, setPurpose] = useState("");

    const [isAddingRequestDoc, setIsAddingRequestDoc] = useState(false);
    const [isAddingRequestDocError, setIsAddingRequestDocError] = useState(false);
    const [isAddingRequestDocSuccess, setIsAddingRequestDocSuccess] = useState(false);

    useEffect(() => {
        if(user) {
            setIsLoading(true);
            doRequest<TRequestItem[]>({
                method: "POST",
                url: "/get-request-list",
                baseURL: "http://localhost:3005/resident",
                data: {residentUID: user.residentUID}
            })
            .then(res => {
                setIsLoading(false);
                if(res.data) {
                    setRequestList(res.data)
                }
                isError && setIsError(false);
            })
            .catch(err => {
                setIsLoading(false);
                setIsError(true);
            })
        }
    }, [user]);
    return (
        <div className={className}>
            <AppBar elevation={2}>
                <Avatar sx={{height: '60px', width: '60px'}} />
                <strong>Mark Nino Q. Baylon</strong>
                <div className="pending-badge">
                    <Badge color="secondary" badgeContent={requestList.length}>
                        <PendingActionsIcon />
                    </Badge>
                </div>
                <Divider orientation="vertical" variant="middle" sx={{margin: '0 20px'}} />
                <div className="log-out-btn">
                <Tooltip describeChild title="Logout">
                    <IconButton color="primary" aria-label="Logout" onClick={(e) => {
                        doRequest({
                            method: "POST",
                            url: "/logout",
                            baseURL: "http://localhost:3005/resident",
                        })
                        .then(() => {
                            window.location.reload();
                        })
                    }}>
                        <LogoutIcon />
                    </IconButton>
                </Tooltip>
                </div>
            </AppBar>
            <PendingList>
                {
                    isLoading && <h1 style={{color: '#9e9e9e4a', display: 'flex', alignItems: "center", justifyContent: "center"}}><CircularProgress sx={{color: 'inherit', marginRight: '10px', fontSize: "inherit"}} /> Loading List...</h1>
                }
                {
                    !isLoading && requestList.length == 0 && !isError && <h1 style={{color: '#9e9e9e4a', display: 'flex', alignItems: "center", justifyContent: "center"}}>No Pending Request</h1>
                }
                {
                    !isLoading && isError &&  <h1 style={{color: 'rgb(255 3 3 / 39%)', display: 'flex', alignItems: "center", justifyContent: "center"}}><ErrorOutlineIcon sx={{color: 'inherit', marginRight: '10px', fontSize: "inherit"}} /> Failed to load list</h1>
                }
                {
                    !isLoading && requestList.length > 0 && !isError && <>
                        {
                            requestList.map(item => <ListItem item={item} onDeleteSuccess={() => setRequestList([...requestList.filter(i => i.id !== item.id)])} onStatusUpdate={(s) => setRequestList([...requestList.map(i => i.id == item.id? {...i, status: s} : i)])} />)
                        }
                    </>
                }
                {
                    isRefetching && <p style={{width: '100%', display: "flex", alignItems: "center", padding: "10px 0"}}><CircularProgress color="inherit"  sx={{marginRight: '10px'}} size={20} /> Updating list...</p>
                }
            </PendingList>
            <div className="row">
                <Alert severity="info" sx={{flex: '0 1 800px'}}>Please note that at the moment, we do not provide door-to-door delivery service. 
                Kindly visit our Barangay Hall to personally pick up your requested documents. However, we have implemented 
                a convenient online system for you to check the status of your request. Simply log in using your resident 
                ID to access the information and updates regarding your application.</Alert>
            </div>
            {
                isAddingRequestDocError && <div className="row">
                <Alert severity="error" sx={{flex: '0 1 800px'}}>Failed to make Request! Try again</Alert>
            </div>
            }
            <div className="row">
                <ReaquestForm>
                    <div className="row">
                        <TextField disabled={isAddingRequestDoc} select label="Request for:" sx={{flex: '0 1 100%'}} value={reqFor} onChange={(e) => setReqFor(e.target.value)}>
                            <MenuItem value="">No selected</MenuItem>
                            <MenuItem value="1">Barangay Certificaate of Indigency</MenuItem>
                        </TextField>
                    </div>
                    <div className="row">
                        <TextField
                        disabled={isAddingRequestDoc}
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        sx={{width: '100%'}}
                        id="outlined-multiline-static"
                        label="Purpose"
                        multiline
                        rows={2}/>
                    </div>
                    <Button sx={{width: '100%'}}
                    endIcon={isAddingRequestDoc? <CircularProgress color="inherit"  sx={{marginLeft: '10px'}} size={20} /> : <SendIcon />}
                    disabled={!(reqFor && purpose.length > 6)}
                    onClick={() => {
                        setIsAddingRequestDoc(true);
                        doRequest({
                            method: "POST",
                            url: "/make-request",
                            baseURL: "http://localhost:3005/resident",
                            data: {
                                residentUID: user?.residentUID,
                                documentType: reqFor,
                                purpose: purpose
                            }
                        })
                        .then(res => {
                            setIsAddingRequestDoc(false);
                            if(res.success) {
                                setReqFor("");
                                setPurpose("")
                                setIsAddingRequestDoc(false);
                                setIsAddingRequestDocSuccess(true);
                                isAddingRequestDocError && setIsAddingRequestDocError(false);
                                //Refetch List
                                setIsRefetching(true);
                                doRequest<TRequestItem[]>({
                                    method: "POST",
                                    url: "/get-request-list",
                                    baseURL: "http://localhost:3005/resident",
                                    data: {residentUID: user?.residentUID}
                                })
                                .then(res => {
                                    setIsRefetching(false);
                                    if(res.data) {
                                        setRequestList(res.data)
                                    }
                                    isError && setIsError(false);
                                })
                                .catch(err => {
                                    setIsRefetching(false);
                                    setIsError(true);
                                })
                            }
                        })
                        .catch(err => {
                            setIsAddingRequestDoc(false);
                            isAddingRequestDocSuccess && setIsAddingRequestDocSuccess(false);
                            setIsAddingRequestDocError(true);
                        })
                    }}>
                        Send Request
                    </Button>
                </ReaquestForm>
            </div>
        </div>
    )
}

const ListItem: React.FC<{
    item: TRequestItem, 
    onDeleteSuccess: () => void,
    onStatusUpdate: (newStatus: string) => void
}> = ({item, onDeleteSuccess, onStatusUpdate}) => {

    const handleDelete = () => {
        doRequest({
            method: "DELETE",
            url: `/delete-request/${item.id}`,
            baseURL: 'http://localhost:3005/resident'
        })
        .then(res => {
            onDeleteSuccess()
        })
        .catch((err) => {

        })
    }

    const handleCancel = () => {
        doRequest({
            method: "DELETE",
            url: `/update-request-status/${item.id}/3`,
            baseURL: 'http://localhost:3005/resident'
        })
        .then(res => {
            onStatusUpdate("cancelled")
        })
        .catch((err) => {

        })
    }

    const handleGoBackToPending = () => {
        doRequest({
            method: "DELETE",
            url: `/update-request-status/${item.id}/1`,
            baseURL: 'http://localhost:3005/resident'
        })
        .then(res => {
            onStatusUpdate("pending")
        })
        .catch((err) => {

        })
    }

    return(
    <ListItemContainer>
        <div className="col">
            <Chip icon={<PictureAsPdfIcon />} label={item.documentType} />
        </div>
        {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
        <div className="col">
            <Chip label={item.purpose} color="primary" variant="outlined" />
        </div>
        <div className="col" style={{justifyContent: 'center'}}>
            {
                item.status.toLowerCase() == "pending"? <Chip
                    label="Pending"
                    onDelete={handleCancel}
                    deleteIcon={<CancelIcon />}
                /> :
                item.status.toLowerCase() == "for-pickup"? <Chip label="Ready for pickup" color="success" /> :
                item.status.toLowerCase() == "created"? <Chip label="For Signing of Punong Barangay" color="secondary" variant="outlined" icon={<DrawIcon />} /> :
                item.status.toLowerCase() == "recieved"? <Chip
                    icon={<TaskAltIcon />}
                    label="Recieved"
                    variant="outlined"
                    color="success"
                />:
                <Chip label="Cancelled" 
                color="error" 
                onDelete={handleGoBackToPending}
                deleteIcon={<RestoreIcon /> }
                />
            }
        </div>
        <div className="col" style={{flex: '0 0 50px',marginLeft: '20px', height: 'fit-content'}}>
            <IconButton aria-label="delete" size="small" color="error" disabled={item.status == "created" || item.status == "for-pickup"} 
            onClick={handleDelete}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </div>
    </ListItemContainer>
    )
}

const AppBar = materialStyles(Paper)`
    display: flex;
    flex: 0 1 800px;
    min-width: 0;
    align-items: center;
    padding: 10px;
    height: 70px;
    border-radius: 35px;

    strong {
        margin-left: 10px;
    }

    .log-out-btn {
        width: fit-content;
    }

    .pending-badge {
        margin-left: auto;
    }
`

const PendingList = materialStyles(Box)`
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    flex: 0 1 800px;
    min-width: 0;
    height: fit-content;
    gap: 5px;
    overflow-x: auto;
`

const ReaquestForm = materialStyles(Paper)`
    display: flex;
    gap: 8px;
    flex: 0 1 800px;
    min-width: 0;
    flex-wrap: wrap;
    padding: 5px;

    .row {
        flex: 0 1 100%;
        min-width: 0;
    }
`

const ListItemContainer = styled(Box)`
    display: flex;
    align-items: center;
    flex: 0 1 100%;
    min-width: 0;
    height: 50px;
    border-radius: 0;
    border-bottom: 1px solid #b0aeae4f;

    .col {
        display: flex;
        flex: 1;
        min-width: 0;
        height: fit-content;
    }
`

const ResidentsRequestInteface = styled(FCResidentsRequestInteface)`
    display: flex;
    flex: 0 1 1200px;
    min-width: 0;
    flex-wrap: wrap;
    justify-content: center;
    padding: 15px;
    height: fit-content;
    background-color: white;
    overflow-x: auto;

    .row {
        display: flex;
        flex: 0 1 100%;
        min-width: 0;
        justify-content: center;
    }
`;

export default ResidentsRequestInteface;