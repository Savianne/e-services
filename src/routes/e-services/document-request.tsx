import { styled } from "@mui/material/styles";
import React, {useState, useEffect} from "react";
import { Container, Content } from "../../app/AppLayout";
import { Avatar, Button, CircularProgress, MenuItem, styled as materialStyles } from "@mui/material";
import doRequest from "../../API/doRequest";

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
    IconButton,
    Tooltip,
    Badge,
    Divider,
    TextField,
    Alert,
    Chip
} from "@mui/material";

import { 
    Paper,
    Box
} from "@mui/material";

const RouteContent = styled(Content)`
    flex-wrap: wrap;
`
const TableContainer = styled(Paper)`
    display: flex;
    flex: 0 1 1300px;
    height: fit-content;
    padding: 10px;
    justify-content: center;
    background-color: ${({theme}) => theme.customTheme.mainBackground};
`;

type TRequestItem = {
    from: {
        fullName: string,
        residentUID: string,
        picture: string,
    },
    documentType: string,
    status: string,
    purpose: string,
    id: number,
}

const DocumentRequest: React.FC = () => {
    const [requestList, setRequestList] = useState<TRequestItem[]>([]);
    //State for fetching Request list
    const [isFetchingList, setIsFetchingList] = useState(false);
    const [isFetchingListError, setIsFetchingListError] = useState(false);
    const [isFetchingSuccess, setIsFetchingListSuccess] = useState(false);


    useEffect(() => {
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
        })
    }, []);

    useEffect(() => {
        console.log(requestList)
    }, [requestList])
    return (
        <>
            <Container>
                <RouteContent>
                    <TableContainer>
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
                                    requestList.map(item => <ListItem item={item} onStatusUpdate={(s) => setRequestList([...requestList.map(i => i.id == item.id? {...i, status: s} : i)])} />)
                                }
                            </>
                        }
                        </PendingList>
                    </TableContainer>
                </RouteContent>
            </Container>
        </>
    )
}

const ListItem: React.FC<{
    item: TRequestItem, 
    onStatusUpdate: (newStatus: string) => void
}> = ({item, onStatusUpdate}) => {

    const handleUpdateToCreate = () => {
        doRequest({
            method: "PATCH",
            url: `/update-doc-req-as-created/${item.from.residentUID}/${item.id}`,
        })
        .then(res => {
            console.log(res)
        })
        .catch((err) => {

        })
    }

    return(
    <ListItemContainer>
        <div className="col">
            <Chip
            avatar={<Avatar alt={item.from.fullName} src={`/assets/images/avatar/${item.from.picture}`} />}
            label={item.from.fullName}
            variant="outlined"
            />
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
                item.status.toLowerCase() == "pending" && <Button size="small" onClick={handleUpdateToCreate}>Create</Button>
            }
            {
                item.status.toLowerCase() == "created" && <Button size="small">Singned</Button>
            }
            {
                item.status.toLowerCase() == "for-pickup" && <Button size="small">Recieved</Button>
            }
            {/* <IconButton aria-label="delete" size="small" color="error" disabled={item.status == "created" || item.status == "for-pickup"} 
            onClick={() => {}}>
                <DeleteIcon fontSize="inherit" />
            </IconButton> */}
        </div>
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
