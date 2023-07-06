import React, { useContext } from "react";
import { AdminAccountContextProvider } from "../context/adminAccountContext";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { IStyledFC } from "./IStyledFC";

import ThemeModeToggle from "./ThemeModeToggle";

//Mui Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
    Stack,
    Divider,
    Avatar
} from '@mui/material'

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import doRequest from "../API/doRequest";

const FCAdminAvatar: React.FC<IStyledFC> = ({className}) => {
    const navigat = useNavigate();
    const admin = useContext(AdminAccountContextProvider);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
        <>
            <div className={className} onClick={handleClick}>
                <Avatar src={`/assets/images/avatar/${admin?.avatar}`} alt={admin?.name} />
                <Stack spacing={0}>
                    <p className="admin-name">{admin?.name}</p>
                    <p className="role">{admin?.role}</p>
                </Stack>
                <i style={{marginLeft: 'auto'}}>
                    <ArrowDropDownIcon />
                </i>
            </div>
            <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={() => {
                navigat('/admin/my-account')
                setAnchorEl(null);
            }}>
                <Avatar /> My account
            </MenuItem>
            <Divider />
            {/* {
                admin?.role.toLowerCase() == "main admin" && <MenuItem  onClick={() => {
                    window.location.href = '/admin/manage-admin';
                    setAnchorEl(null);
                }}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Manage Admin
                </MenuItem>
            } */}
            
            <MenuItem onClick={() => {
                
                doRequest({
                    method: "DELETE",
                    url: "/logout",
                    baseURL: "http://localhost:3005/admin"
                })
                .then(res => {
                    res.success && window.location.reload();
                })
            }}>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            Logout
            </MenuItem>
        </Menu>
        </>
    )
}

const AdminAvatar = styled(FCAdminAvatar)`
    display: flex;
    height: 100%;
    width: fit-content;
    min-width: 242px;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 300ms linear;

    & i {
        width: fit-content;
        height: fit-content;
        margin-left: 10px;
    }

    :hover {
        background-color: #007c9f26;
    }

    & p {
        margin: 0;
        margin-left: 10px;
        font-size: 11px;
    }

    & p.admin-name {
        font-size: 13px;
    }

    @media screen and (max-width: 655px) {
        & {
            min-width: 0;
        }
        
        & p {
            display: none;
        }
    }
`
const DropdownContainer = styled(Stack)`
    display: flex;
    height: fit-content;
    align-items: center;
`;

const FCAdminDropDown: React.FC<IStyledFC> = ({className}) => {

    return (
        <div className={className}>
            <DropdownContainer
            direction="row"
            divider={<Divider orientation="vertical" variant="middle" flexItem />}
            spacing={2}>
                <ThemeModeToggle />
                <AdminAvatar />
            </DropdownContainer>
        </div>
    )
}


const AdminDropDown = styled(FCAdminDropDown)`
    display: flex;
    margin-left: auto;
    height: 100%;
    align-items: center;

`

export default AdminDropDown;

