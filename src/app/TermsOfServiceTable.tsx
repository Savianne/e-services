import React from "react";
import { styled } from "@mui/material";

import { IBrgyOrgChart } from "./OrganizationalChart";

import { 
    Box,
    Avatar,
    Button,
    IconButton,
    Divider,
    MenuItem,
    ListItemIcon,
 } from '@mui/material'


//MRT Imports
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

interface IBrgyOfficals extends IBrgyOrgChart {
    uid: string
}

const organizationOfBarangay:IBrgyOfficals[] = [{
    uid: '123',
    term: "2018-2021",
    punongBarangay: {
      name: 'Apple Jane De Guzman',
      role: 'Punong Barangay',
      avatar: "/assets/images/avatar/apple.png"
    },
    secretary: {
      name: 'Danielle R. Bacabitas',
      role: 'Brgy. Secretary',
      avatar: "/assets/images/avatar/apple.png"
    },
    treasurer: {
      name: 'Danica Santos-Esteban',
      role: 'Brgy. Treasurer',
      avatar: "/assets/images/avatar/apple.png"
    },
    kagawad: [{
      name: 'Greggy B. Leal',
      role: 'Brgy. 1st Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },{
      name: 'Greggy B. Leal',
      role: 'Brgy. Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },{
      name: 'Greggy B. Leal',
      role: 'Brgy. Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },{
      name: 'Greggy B. Leal',
      role: 'Brgy. Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },{
      name: 'Greggy B. Leal',
      role: 'Brgy. Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },{
      name: 'Greggy B. Leal',
      role: 'Brgy. Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },{
      name: 'Greggy B. Leal',
      role: 'Brgy. Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },],
    skChairPerson: {
        chairPerson: {
            name: 'Lizette Santos',
            role: 'SK Chairperson',
            avatar: "/assets/images/avatar/apple.png"
        },
        skSecretary: {
            name: 'Joylyn Obina',
            role: 'SK Secretary',
            avatar: "/assets/images/avatar/apple.png"
        },
        skTreasurer: {
            name: 'Joylyn Obina',
            role: 'SK Treasurer',
            avatar: "assets/images/avatar/apple.png"
        },
        skKagawad: [{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },],
    }
},
{
    uid: '123',
    term: "2018-2021",
    punongBarangay: {
      name: 'Apple Jane De Guzman',
      role: 'Punong Barangay',
      avatar: "/assets/images/avatar/apple.png"
    },
    secretary: {
      name: 'Danielle R. Bacabitas',
      role: 'Brgy. Secretary',
      avatar: "/assets/images/avatar/apple.png"
    },
    treasurer: {
      name: 'Danica Santos-Esteban',
      role: 'Brgy. Treasurer',
      avatar: "/assets/images/avatar/apple.png"
    },
    kagawad: [{
      name: 'Greggy B. Leal',
      role: 'Brgy. 1st Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },{
      name: 'Greggy B. Leal',
      role: 'Brgy. Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },{
      name: 'Greggy B. Leal',
      role: 'Brgy. Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },{
      name: 'Greggy B. Leal',
      role: 'Brgy. Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },{
      name: 'Greggy B. Leal',
      role: 'Brgy. Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },{
      name: 'Greggy B. Leal',
      role: 'Brgy. Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },{
      name: 'Greggy B. Leal',
      role: 'Brgy. Kagawad',
      avatar: "/assets/images/avatar/apple.png"
    },],
    skChairPerson: {
        chairPerson: {
            name: 'Lizette Santos',
            role: 'SK Chairperson',
            avatar: "/assets/images/avatar/apple.png"
        },
        skSecretary: {
            name: 'Joylyn Obina',
            role: 'SK Secretary',
            avatar: "/assets/images/avatar/apple.png"
        },
        skTreasurer: {
            name: 'Joylyn Obina',
            role: 'SK Treasurer',
            avatar: "assets/images/avatar/apple.png"
        },
        skKagawad: [{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },{
            name: 'Mark Niño Baylon',
            role: 'SK Kagawad',
            avatar: "/assets/images/avatar/apple.png"
        },],
    }
}]

const TermsOfServiceTable:React.FC = () => {
    const columns = React.useMemo<MRT_ColumnDef<IBrgyOfficals>[]>(
        () => [
            {
                id: 'term',
                header: 'Term',
                size: 20,
                accessorKey: "term"
            },
            {
                enableColumnActions: false,
                enableGlobalFilter: false,
                enableColumnFilter: false,
                enableSorting: false,
                accessorFn: (row) => `${row.punongBarangay.name}`, //access nested data with dot notation
                id: 'punong-barangay',
                header: 'Punong Barangay',
                Cell: ({ renderedCellValue, row, column }) => (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <Avatar src={row.original.punongBarangay.avatar? row.original.punongBarangay.avatar : undefined} alt={row.original.punongBarangay.name} />
                      <h5>{row.original.punongBarangay.name}</h5>
                      {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                    </Box>
                  ),
            },
        ], [])
    return(
        <MaterialReactTable 
        columns={columns} 
        data={organizationOfBarangay} 
        muiTableBodyRowProps={{
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              backgroundColor: (theme) => theme.customTheme.mainBackground,
            },
          }}
          muiTableHeadCellProps={{
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              backgroundColor: (theme) => theme.customTheme.mainBackground,
            },
          }}
          
          muiTopToolbarProps={{
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              backgroundColor: (theme) => theme.customTheme.mainBackground,
            },
          }}
          muiBottomToolbarProps={{
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              backgroundColor: (theme) => theme.customTheme.mainBackground,
            },
          }}
          muiToolbarAlertBannerProps={
            {
              color: 'error',
              children: 'Network Error. Could not fetch data.',
            }
          }
        
        // enableRowSelection
        enablePinning
        
        />
    )
}

export default TermsOfServiceTable;