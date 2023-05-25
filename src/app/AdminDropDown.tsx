import React from "react";
import { styled } from "@mui/material/styles";

import { IStyledFC } from "./IStyledFC";

import ThemeModeToggle from "./ThemeModeToggle";

//Mui Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
    Stack,
    Divider,
    Avatar
} from '@mui/material'

const FCAdminAvatar: React.FC<IStyledFC> = ({className}) => {
    return (
        <div className={className}>
            <Avatar src="assets/images/avatar/apple.png" alt="Apple" />
            <Stack spacing={0}>
                <p className="admin-name">Apple Jane De Guzman</p>
                <p className="role">Admin</p>
            </Stack>
            <i>
                <ArrowDropDownIcon />
            </i>
        </div>
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

