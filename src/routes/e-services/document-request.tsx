import { styled } from "@mui/material/styles";
import React, {useState, useEffect} from "react";
import { Container, Content } from "../../app/AppLayout";
import { Avatar, Button, CircularProgress, MenuItem, styled as materialStyles } from "@mui/material";
import doRequest from "../../API/doRequest";
import { io } from 'socket.io-client';
import useConfirmModal from "../../app/ConfirmModal/useConfirmModal";
import ConfirmModal from "../../app/ConfirmModal/ConfirmModal";

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; 
import DrawIcon from '@mui/icons-material/Draw';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import {
    IconButton,
    Tooltip,
    Badge,
    Divider,
    TextField,
    Alert,
    Chip,
    Snackbar
} from "@mui/material";

import { 
    Paper,
    Box
} from "@mui/material";

const RouteContainer = styled(Container)`
    flex: 0 1 100%;
    justify-content: center;
`
const RouteContent = styled(Content)`
    flex-wrap: wrap;
    flex: 0 1 1300px;
    justify-content: center;
`
const TableContainer = styled(Paper)`
    display: flex;
    flex: 0 1 100%;
    height: fit-content;
    padding: 10px;
    justify-content: center;
    flex-wrap: wrap;
    background-color: ${({theme}) => theme.customTheme.mainBackground};

    .table-head {
        display: flex;
        flex: 0 1 100%;
        height: 40px;
        align-items: center;
        flex: 0 1 100%;

        h4 {
            margin: 0;
        }
    }
`;

type TRequestItem = {
    from: {
        fullName: string,
        residentUID: string,
        picture: string,
    },
    date: string,
    documentType: string,
    status: string,
    purpose: string,
    id: number,
}

const DocumentRequest: React.FC = () => {
    const [requestList, setRequestList] = useState<TRequestItem[]>([]);
    //State for fetching Request list
    const [isFetchingList, setIsFetchingList] = useState(true);
    const [isReFetchingList, setIsReFetchingList] = useState(false);
    const [isFetchingListError, setIsFetchingListError] = useState(false);
    const [isFetchingSuccess, setIsFetchingListSuccess] = useState(false);

    const fetchList = () => {
        setIsFetchingList(true);
        doRequest<TRequestItem[]>({
            method: "POST",
            url: "/get-doc-request"
        })
        .then(response => {
            if(response.success) {
                setIsFetchingList(false);
                setRequestList(response.data as TRequestItem[])
                isFetchingListError && setIsFetchingListError(false);
                setIsFetchingListSuccess(true);
            } else throw response
        })
        .catch(err => {
            setIsFetchingList(false);
            isFetchingSuccess && setIsFetchingListSuccess(false);
            setIsFetchingListError(true);
        });
    }

    const reFetchList = () => {
        setIsReFetchingList(true);
        doRequest<TRequestItem[]>({
            method: "POST",
            url: "/get-doc-request"
        })
        .then(response => {
            if(response.success) {
                setIsReFetchingList(false);
                setRequestList(response.data as TRequestItem[])
                isFetchingListError && setIsFetchingListError(false);
                setIsFetchingListSuccess(true);
            } else throw response
        })
        .catch(err => {
            setIsReFetchingList(false);
            isFetchingSuccess && setIsFetchingListSuccess(false);
            setIsFetchingListError(true);
        });
    }

    useEffect(() => {
        const socket = io('http://localhost:3008');

        socket.on('REFRESH_REQUEST_LIST', (data) => {
            reFetchList();
        });

        return function() {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        fetchList();
    }, [])

    useEffect(() => {
        console.log(requestList)
    }, [requestList])
    return (
        <>
            <RouteContainer>
                <RouteContent>
                    <TableContainer>
                        <div className="table-head">
                            <h4>Document Request List</h4>
                            {
                                isReFetchingList? <CircularProgress sx={{color: 'inherit', marginLeft: 'auto', marginRight: '10px', fontSize: "inherit"}} size={20} /> :
                                <Badge sx={{marginLeft: 'auto', marginRight: '10px'}} color="secondary" badgeContent={requestList.length}>
                                    <PendingActionsIcon />
                                </Badge> 

                            }
                            
                        </div>
                        <Divider orientation="horizontal" sx={{flex: '0 1 100%'}} />
                        <PendingList>
                        {
                            isFetchingList && <h1 style={{color: '#9e9e9e4a', display: 'flex', flex: '0 1 100%', alignItems: "center", justifyContent: "center"}}><CircularProgress sx={{color: 'inherit', marginRight: '10px', fontSize: "inherit"}} /> Loading List...</h1>
                        }
                        {
                            !isFetchingList && requestList.length == 0 && !isFetchingListError && <h1 style={{color: '#9e9e9e4a', display: 'flex', flex: '0 1 100%', alignItems: "center", justifyContent: "center"}}>No Pending Request</h1>
                        }
                        {
                            !isFetchingList && isFetchingListError && <h1 style={{color: 'rgb(255 3 3 / 39%)', display: 'flex', flex: '0 1 100%', alignItems: "center", justifyContent: "center"}}><ErrorOutlineIcon sx={{color: 'inherit', marginRight: '10px', fontSize: "inherit"}} /> Failed to load list</h1>
                        }
                        {
                            !isFetchingList && requestList.length > 0 && !isFetchingListError && <>
                                {
                                    requestList.map(item => <ListItem key={item.id} item={item} onStatusUpdate={(s) => {
                                        s == 'recieved'? setRequestList(requestList.filter(i => i.id !== item.id)) : setRequestList([...requestList.map(i => i.id == item.id? {...i, status: s} : i)]);
                                    }} />)
                                }
                            </>
                        }
                        </PendingList>
                    </TableContainer>
                </RouteContent>
            </RouteContainer>
        </>
    )
}

const ListItem: React.FC<{
    item: TRequestItem, 
    onStatusUpdate: (newStatus: string) => void
}> = ({item, onStatusUpdate}) => {
    const {modal, confirm} = useConfirmModal();

    const [isUpdatingToReady, setIsUpdatingToReady] = useState(false);
    const [isUpdatingToReadyError, setIsUpdatingToReadyError] = useState(false);
    const [isUpdatingToReadySuccess, setIsUpdatingToReadySuccess] = useState(false);

    const [isUpdatingForPickup, setIsUpdatingForPickup] = useState(false);
    const [isUpdatingForPickupError, setIsUpdatingForPickupError] = useState(false);
    const [isUpdatingForPickupSuccess, setIsUpdatingForPickupSuccess] = useState(false);

    const [isUpdatingForRecieved, setIsUpdatingForRecieved] = useState(false);
    const [isUpdatingForRecievedError, setIsUpdatingForRecievedError] = useState(false);
    const [isUpdatingForRecievedSuccess, setIsUpdatingForRecievedSuccess] = useState(false);



    const handleUpdateToCreate = () => {
        setIsUpdatingToReady(true);
        doRequest<string>({
            method: "PATCH",
            url: `/update-doc-req-as-created/${item.from.residentUID}/${item.id}`,
        })
        .then(res => {
            if(res.success && res.data) {
                window.open(res.data, "_blank");
                isUpdatingToReadyError && setIsUpdatingToReadyError(false);
                setIsUpdatingToReadySuccess(true);
                setIsUpdatingToReady(false);
                onStatusUpdate('created')
            }
        })
        .catch((err) => {
            isUpdatingToReadySuccess && setIsUpdatingToReadySuccess(false);
            setIsUpdatingToReadyError(true);
            setIsUpdatingToReady(false);
        })
    }

    const handleUpdateStatusForPickup = () => {
        setIsUpdatingForPickup(true);
        doRequest<string>({
            method: "PATCH",
            url: `/update-request-status/${item.id}/4/${item.from.residentUID}`,
        })
        .then(res => {
            if(res.success) {
                isUpdatingForPickupError && setIsUpdatingForPickupError(false);
                setIsUpdatingForPickupSuccess(true);
                setIsUpdatingForPickup(false);
                onStatusUpdate('for-pickup')
            }
        })
        .catch((err) => {
            isUpdatingForPickupSuccess && setIsUpdatingForPickupSuccess(false);
            setIsUpdatingForPickupError(true);
            setIsUpdatingForPickup(false);
        })
    }

    const handleStatusUpdateRecieved = () => {
        confirm("Recieved request will no longer apear on the list", () => {
            setIsUpdatingForRecieved(true);
            doRequest<string>({
                method: "PATCH",
                url: `/update-request-status/${item.id}/5/${item.from.residentUID}`,
            })
            .then(res => {
                if(res.success) {
                    isUpdatingForRecievedError && setIsUpdatingForRecievedError(false);
                    setIsUpdatingForRecievedSuccess(true);
                    setIsUpdatingForRecieved(false);
                    onStatusUpdate('recieved')
                }
            })
            .catch((err) => {
                isUpdatingForRecievedSuccess && setIsUpdatingForRecievedSuccess(false);
                setIsUpdatingForRecievedError(true);
                setIsUpdatingForRecieved(false);
            })
        })
    }

    return(
    <ListItemContainer>
        <ConfirmModal context={modal} />
        <div className="col">
            <Chip
            avatar={<Avatar alt={item.from.fullName} src={`/assets/images/avatar/${item.from.picture}`} />}
            label={item.from.fullName}
            variant="outlined"
            />
        </div>
        <div className="col" style={{flex: 1, display: "flex", justifyContent: "center", height: 'fit-content'}}>
            <Chip label={new Date(item.date).toDateString()} color="primary" variant="outlined" />
        </div>
        <Divider orientation="vertical" variant="middle" sx={{margin: '0 20px'}} />
        <div className="col">
            <Chip icon={<PictureAsPdfIcon />} label={item.documentType} />
        </div>
        <div className="col" style={{flex: 1, display: "flex", justifyContent: "center", height: 'fit-content'}}>
            <Chip label={item.purpose} color="primary" variant="outlined" />
        </div>
        <div className="col" style={{justifyContent: 'center'}}>
            { item.status.toLowerCase() == "pending" && <Chip label="Pending" /> }
            { item.status.toLowerCase() == "for-pickup" && <Chip label="Ready for pickup" color="success" /> }
            { item.status.toLowerCase() == "created" && <Chip label="For Signing of Punong Barangay" color="secondary" variant="outlined" icon={<DrawIcon />} /> }

        </div>
        <Divider orientation="vertical" variant="middle" sx={{margin: '0 20px'}} />
        <div className="col" style={{flex: '0 0 150px', display: "flex", justifyContent: "center", height: 'fit-content'}}>
            {
                item.status.toLowerCase() == "pending" && <Button size="small" disabled={isUpdatingToReady} onClick={handleUpdateToCreate} endIcon={isUpdatingToReady? <CircularProgress sx={{color: 'inherit'}} size={15} /> : null}>Create</Button>
            }
            {
                item.status.toLowerCase() == "created" && <Button size="small" disabled={isUpdatingForPickup} onClick={handleUpdateStatusForPickup} endIcon={isUpdatingForPickup? <CircularProgress sx={{color: 'inherit'}} size={15} /> : null}>Signed</Button>
            }
            {
                item.status.toLowerCase() == "for-pickup" && <Button size="small" disabled={isUpdatingForRecieved} onClick={handleStatusUpdateRecieved} endIcon={isUpdatingForRecieved? <CircularProgress sx={{color: 'inherit'}} size={15} /> : null}>Recieved</Button>
            }
        </div>
        {
            <Snackbar open={
                isUpdatingToReadyError || isUpdatingForPickupError
            } autoHideDuration={6000} onClose={() => {
                setIsUpdatingToReadyError(false);
                setIsUpdatingForPickupError(false);
            }}>
                <Alert onClose={() => {
                    setIsUpdatingToReadyError(false);
                    setIsUpdatingForPickupError(false);
                }} severity="error" sx={{ width: '100%' }}>
                    Failed to update status
                </Alert>
            </Snackbar>
        }
        {
            <Snackbar open={
                isUpdatingToReadySuccess || isUpdatingForPickupSuccess
            } autoHideDuration={6000} onClose={() => {
                setIsUpdatingToReadySuccess(false);
                setIsUpdatingForPickupSuccess(false);
            }}>
                <Alert onClose={() => {
                    setIsUpdatingToReadySuccess(false);
                    setIsUpdatingForPickupSuccess(false);
                }} severity="success" sx={{ width: '100%' }}>
                    Update status success
                </Alert>
            </Snackbar>
        }
    </ListItemContainer>
    )
}

const PendingList = materialStyles(Box)`
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    flex: 0 1 100%;
    min-width: 0;
    height: fit-content;
    gap: 5px;
    overflow-x: auto;
`;

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

export default DocumentRequest;
