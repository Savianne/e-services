import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Container, Content } from "../../app/AppLayout";
import axios from "axios";
import useGetResidentsRecord from "../../API/hooks/useGetResidentsRecord";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { 
    Paper,
    Box,
    Chip,
    TextField,
    Divider,
    ToggleButton,
    ToggleButtonGroup,
    Avatar,
    IconButton,
    CircularProgress
} from "@mui/material";

import doRequest from "../../API/doRequest";
import { isError } from "lodash";

const RouteContent = styled(Content)`
    flex: 0 1 1300px;
    flex-wrap: wrap;
`
const TableContainer = styled(Paper)`
    display: flex;
    flex: 0 1 100%;
    padding: 10px;
    flex-wrap: wrap;
    align-content: flex-start;
    background-color: ${({theme}) => theme.customTheme.mainBackground};

    h1,h2,h3,h4,h5,h6 {
        margin: 0;
    }

    .table-head {
        display: flex;
        flex: 0 1 100%;
        padding: 5px;
        align-items: center;
        height: fit-content;
        /* .title {
            flex: 1;
        } */
    }

    .tab-toggle {
        display: flex;
        flex: 0 1 100%;
        margin: 20px 0;
        justify-content: center;
    }
    .table-body {
        display: flex;
        flex: 0 1 100%;
        /* flex-wrap: wrap; */
        overflow-x: hidden;

        .numbers-list {
            display: flex;
            flex: 0 1 100%;
            flex-wrap: wrap;
            gap: 5px;
            
            .item {
                display: flex;
                flex: 0 1 100%;
                background-color: ${({theme}) => theme.palette.mode == 'dark'? theme.customTheme.mainBackground : 'whitesmoke'};
                height: fit-content;
                padding: 5px 10px;
                align-items: center;
                
                .item-col {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    flex: 1;
                    gap: 5px;
                    height: fit-content;
                }
            }
        }
    }
`;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.5),
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }));

type TNumberListItem = Record<string, {
    label: string,
    cpNumber: string,
    type: "home" | "personal",
    people: ({name: string, avatar: string | null})[]
}>

type TInboxItem = {
    created_at: string,
    message: string,
    network: string,
    recipient: string,
    status: string,
    updated_at: string
}

const SmsSender: React.FC = () => {
    const {data} = useGetResidentsRecord();
    const [numbersList, setNumbersList] = useState<null | TNumberListItem>(null);
    const [tab, setTab] = useState("sms");
    const [creditBalance, setCreditBalance] = useState<null | number>(null);
    const [textValue, setTextValue] = useState('');
  
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (newValue.length <= 160) {
        setTextValue(newValue);
      }
    };

    const getAccountInfo = async () => {
        try {
            const accountInfo = await doRequest<any>({
                method: "GET",
                url: "/get-semaphore-credit-bal",
                baseURL: "https://localhost:3002"
            });
         
            setCreditBalance(accountInfo.data.credit_balance);
        }   
        catch(err) {
            console.log(err)
        }
    }
    
    const handleTab = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
      ) => {
        setTab(newAlignment);
      };

    useEffect(() => {
        if(creditBalance == null) getAccountInfo();
    }, []);

    useEffect(() => {
        if(data) {
            const numberList: TNumberListItem = {};

            for(let x = 0; x < data.length; x++) {
                const person = data[x];
                if(person.personalContactInfo.personalCPNumber) {
                    numberList[`${person.personalContactInfo.personalCPNumber}`] = {
                        cpNumber: `${person.personalContactInfo.personalCPNumber}`.replace(/-/g, ""),
                        label: `${person.personalContactInfo.personalCPNumber}`,
                        type: "personal",
                        people: [{name: `${person.name.firstName} ${person.name.middleName}. ${person.name.lastName} ${person.name.extName? person.name.extName : ""}`, avatar: person.picture}]
                    }
                }
    
                if(person.homeContactInfo.homeCPNumber) {
                    if(numberList.hasOwnProperty(`${person.homeContactInfo.homeCPNumber}`)) {
                        numberList[`${person.homeContactInfo.homeCPNumber}`].people.push({name: `${person.name.firstName} ${person.name.middleName}. ${person.name.lastName} ${person.name.extName? person.name.extName : ""}`, avatar: person.picture})
                    } else {
                        numberList[`${person.homeContactInfo.homeCPNumber}`] = {
                            label: `${person.homeContactInfo.homeCPNumber}`,
                            cpNumber: `${person.homeContactInfo.homeCPNumber}`.replace(/-/g, ""),
                            type: "home",
                            people: [{name: `${person.name.firstName} ${person.name.middleName}. ${person.name.lastName} ${person.name.extName? person.name.extName : ""}`, avatar: person.picture}]
                        }
                    }
                }
            }
            setNumbersList(numberList);
        }

    }, [data]);

    useEffect(() => {
        console.log(numbersList);
    }, [numbersList]);

    return (
        <>
            <Container>
                <RouteContent>
                    <TableContainer>
                        <div className="table-head">
                            <h3 className="title">Send SMS</h3>
                            <Chip sx={{marginLeft: 'auto'}} icon={<MonetizationOnIcon />} label={creditBalance} variant="outlined" />
                        </div>
                        <Divider orientation="horizontal" sx={{width: '100%', marginTop: '10px'}}/>
                        <div className="tab-toggle">
                            <Paper
                                elevation={0}
                                sx={{
                                display: 'flex',
                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                flexWrap: 'wrap',
                                }}
                            >
                                <StyledToggleButtonGroup
                                value={tab}
                                size="small"
                                exclusive
                                aria-label="text alignment"
                                onChange={handleTab}
                                >
                                <ToggleButton value="sms" aria-label="sms">
                                    <SendIcon />
                                </ToggleButton>
                                {/* <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} /> */}
                                <ToggleButton value="inbox" aria-label="inbox">
                                    <InboxIcon />
                                </ToggleButton>
                                </StyledToggleButtonGroup>
                            </Paper>
                        </div>
                        <div className="table-body">
                            <SMSTabContainer active={tab == "sms"}>
                                <div>
                                    <TextField
                                    id="outlined-multiline-static"
                                    label="Message Content"
                                    multiline
                                    rows={4}
                                    onChange={handleTextChange}
                                    sx={{width: '550px', minWidth: '300px'}}
                                    variant="filled"
                                    />
                                    <p style={{marginLeft: 'auto', width: "fit-content", marginTop: '5px'}}>{textValue.length}/160</p>
                                </div>
                                <div className="numbers-list">
                                    {
                                        numbersList && Object.values(numbersList).map(item => {
                                            return (
                                                <NumberListItem item={item} message={textValue} />
                                            )
                                        })
                                    }
                                </div>
                            </SMSTabContainer>
                            <InboxContainer active={tab == "inbox"}>
                                <Inbox />
                            </InboxContainer>
                        </div>
                    </TableContainer>
                </RouteContent>
            </Container>
        </>
    )
}

const SMSTabContainer = styled(Box)<{active: boolean}>`
    display: flex;
    flex: 0 0 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: ${(props) => props.active? 0 : '-100%'};
    transition: margin-left 400ms;
`;

const InboxContainer = styled(Box)<{active: boolean}>`
    flex: 0 0 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-right: ${(props) => props.active? '-100%' : 0};
    transition: margin-right 400ms;
`;

const NumberListItem: React.FC<{item: {
    label: string,
    cpNumber: string,
    type: "home" | "personal",
    people: ({name: string, avatar: string | null})[]
}, message: string}> = ({item, message}) => {
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);

    const sendSms = () => {
        setIsSending(true);
        doRequest<any>({
            method: "POST",
            url: "/send-sms",
            data: {
                message: message,
                cpNumber: item.cpNumber
            },
            baseURL: "https://localhost:3002"
        })
        .then(res => {
            if(res.success) {
                console.log(res.data)
                setIsSending(false);
                sendError && setSendError(false);
                setSendSuccess(true);
            } else throw res
        })
        .catch(err => {
            console.log(err)
            setIsSending(false);
            setSendError(true);
            sendSuccess && setSendSuccess(false);
        })
    }
    return(
        <div className="item">
            <Chip icon={item.type == "home"? <HomeIcon /> : <AccountCircleIcon />} label={item.label} />
            <Divider orientation="vertical" sx={{height: '100%'}} />
            <div className="item-col">
                {
                    item.people.map(person => {
                        return <Chip label={person.name} avatar={<Avatar src={`/assets/images/avatar/${person.avatar}`} alt={person.name} />} />
                    })
                }
            </div>
            <div style={{display: 'flex', width: '50px', alignItems: 'center', justifyContent: "center"}}>
                <IconButton disabled={isSending || message.length < 5 || sendError || sendSuccess} color="primary" aria-label="add to shopping cart" onClick={sendSms}>
                    {
                        isSending &&  <CircularProgress size={25}/>
                    }
                    {
                        sendError && <ErrorOutlineIcon sx={{fontSize: '25px'}} color="error"/>
                    }
                     {
                        sendSuccess && <CheckCircleOutlineIcon sx={{fontSize: '25px'}} color="success"/>
                    }
                    {
                       !(isSending || sendError || sendSuccess) &&  <SendIcon />
                    }
                </IconButton>
            </div>
        </div>
    )
}

const Inbox: React.FC = () => {
    const [inboxItems, setInbox] = useState<TInboxItem[] | null>(null);

    useEffect(() => {
        doRequest<TInboxItem[]>({
            method: "POST",
            url: "/get-inbox",
            baseURL: "https://localhost:3002"
        })
        .then(res => {
            if(res.success && res.data) {
                setInbox(res.data);
            } else throw res
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    return(
        <InboxList>
            {
                inboxItems && inboxItems.map(i => {
                    return(
                        <div className="inbox-item">
                            <div className="col">
                                {
                                    i.network.toLowerCase() == "smart" || i.network.toLowerCase() == "smart"?  <Chip avatar={i.network.toLowerCase() == "smart"? <Avatar src="/assets/images/Smart-logo-2016.png" /> : <Avatar src="/assets/images/globe.png" /> } label={i.recipient} /> : 
                                    <Chip icon={<AccountCircleIcon />} label={i.recipient} />
                                }
                            </div>
                            <div className="col">
                                <Chip label={i.message} variant="outlined" />
                            </div>
                            <div className="col">
                                <Chip label={i.created_at} variant="outlined" />
                            </div>
                            <div className="col">
                                <Chip label={i.status.toUpperCase()} variant="outlined" color={
                                    i.status.toLowerCase() == "sent"? "success" :
                                    i.status.toLowerCase() == "error"? "error" : "default"
                                } />
                            </div>
                        </div>
                    )
                })
            }
        </InboxList>
    )
};

const InboxList = styled(Box)`
    display: flex;
    flex: 0 1 100%;
    flex-wrap: wrap;

    .inbox-item {
        display: flex;
        flex: 0 1 100%;
        background-color: ${({theme}) => theme.palette.mode == 'dark'? theme.customTheme.mainBackground : 'whitesmoke'};
        height: fit-content;
        padding: 5px 10px;
        align-items: center;

        .col {
            display: flex;
            flex: 1;
        }
    }
`;

export default SmsSender;
