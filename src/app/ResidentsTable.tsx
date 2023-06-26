import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import TResidentRecord from './types/TResidentRecord';

//Mui Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AccountCircle, Send } from '@mui/icons-material';
import SmsIcon from '@mui/icons-material/Sms';
import PrintIcon from '@mui/icons-material/Print';

import { 
    Box,
    Avatar,
    Button,
    IconButton,
    Divider,
    MenuItem,
    ListItemIcon,
 } from '@mui/material'



//nested data is ok, see accessorKeys in ColumnDef below
// const data: TResidentRecord[] = [
//   {
//     residentUID: '1234',
//     gender: 'male',
//     maritalStatus: 'single',
//     dateOfBirth: "1998-03-08",
//     picture: '/assets/images/avatar/apple.png',
//     name: {
//       firstName: 'John',
//       lastName: 'Doe',
//       middleName: 'Duggong',
//       extName: 'jr',
//     },
//     currentAddress: "dfksdfsdoifjksdopkfposdf",
//     permanentAddress: "sdfgetergtoekr dfgdfgg",
//     homeContactInfo: {
//       homeCPNumber: "093238877320",
//       homeEmail: "www.homesds@gkdfg",
//       homeTelNumber: "0988-49933"
//     },
//     personalContactInfo: {
//       personalCPNumber: "091279er345",
//       personalEmail: "www.mosdifsd",
//       personalTelNumber: "09764=3234"
//     }
//   },
//   {
//     residentUID: '1234',
//     gender: 'male',
//     maritalStatus: 'single',
//     dateOfBirth: "1998-03-08",
//     picture: '/assets/images/avatar/apple.png',
//     name: {
//       firstName: 'John',
//       lastName: 'Doe',
//       middleName: 'Duggong',
//       extName: 'jr',
//     },
//     currentAddress: "dfksdfsdoifjksdopkfposdf",
//     permanentAddress: "sdfgetergtoekr dfgdfgg",
//     homeContactInfo: {
//       homeCPNumber: "093238877320",
//       homeEmail: "www.homesds@gkdfg",
//       homeTelNumber: "0988-49933"
//     },
//     personalContactInfo: {
//       personalCPNumber: "091279er345",
//       personalEmail: "www.mosdifsd",
//       personalTelNumber: "09764=3234"
//     }
//   },
//   {
//     residentUID: '1234',
//     gender: 'male',
//     maritalStatus: 'single',
//     dateOfBirth: "1998-03-08",
//     picture: '/assets/images/avatar/apple.png',
//     name: {
//       firstName: 'John',
//       lastName: 'Doe',
//       middleName: 'Duggong',
//       extName: 'jr',
//     },
//     currentAddress: "dfksdfsdoifjksdopkfposdf",
//     permanentAddress: "sdfgetergtoekr dfgdfgg",
//     homeContactInfo: {
//       homeCPNumber: "093238877320",
//       homeEmail: "www.homesds@gkdfg",
//       homeTelNumber: "0988-49933"
//     },
//     personalContactInfo: {
//       personalCPNumber: "091279er345",
//       personalEmail: "www.mosdifsd",
//       personalTelNumber: "09764=3234"
//     }
//   },
//   {
//     residentUID: '1234',
//     gender: 'male',
//     maritalStatus: 'single',
//     dateOfBirth: "1998-03-08",
//     picture: '/assets/images/avatar/apple.png',
//     name: {
//       firstName: 'John',
//       lastName: 'Doe',
//       middleName: 'Duggong',
//       extName: 'jr',
//     },
//     currentAddress: "dfksdfsdoifjksdopkfposdf",
//     permanentAddress: "sdfgetergtoekr dfgdfgg",
//     homeContactInfo: {
//       homeCPNumber: "093238877320",
//       homeEmail: "www.homesds@gkdfg",
//       homeTelNumber: "0988-49933"
//     },
//     personalContactInfo: {
//       personalCPNumber: "091279er345",
//       personalEmail: "www.mosdifsd",
//       personalTelNumber: "09764=3234"
//     }
//   }
// ];

const ResidentsTable: FC<{residents: TResidentRecord[]}> = ({residents}) => {
  const navigation = useNavigate();
  const [rowSelection, setRowSelection] = React.useState({});
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<TResidentRecord>[]>(
    () => [
      {
        enableColumnActions: false,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        enableSorting: false,
        accessorFn: (row) => `${row.picture}`, //access nested data with dot notation
        id: 'picture',
        header: 'Picture',
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <Avatar src={row.original.picture? row.original.picture : undefined} alt={row.original.name.firstName} />
              {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            </Box>
          ),
      }, 
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
      },
      {
        accessorKey: 'name.middleName', //normal accessorKey
        header: 'Middle Name',
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'name.extName',
        header: 'Ext. Name',
      },
      {
        accessorKey: 'dateOfBirth',
        header: 'Date of Birth',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
      },
      {
        accessorKey: 'maritalStatus',
        header: 'Marital Status',
      },
      {
        accessorKey: 'personalContactInfo.personalEmail',
        header: 'Personal Email'
      },
      {
        accessorKey: 'personalContactInfo.personalCPNumber',
        header: 'Personal CP Number'
      },
      {
        accessorKey: 'personalContactInfo.personalTelNumber',
        header: 'Personal Tel Number'
      },
      {
        accessorKey: 'homeContactInfo.homeEmail',
        header: 'Home Email'
      },
      {
        accessorKey: 'homeContactInfo.homeCPNumber',
        header: 'Home CP Number'
      },
      {
        accessorKey: 'homeContactInfo.homeTelNumber',
        header: 'Home Tel Number'
      },
      {
        accessorKey: 'permanentAddress',
        header: 'Permanent Address'
      },
      {
        accessorKey: 'currentAddress',
        header: 'Current Address'
      },
    ],
    [],
  );

  React.useEffect(() => {
    console.log(rowSelection);
  }, [rowSelection]);
  return (
    <MaterialReactTable 
    columns={columns} 
    data={residents} 
    // enableRowSelection
    getRowId={(row) => row.residentUID}
    onRowSelectionChange={setRowSelection}
    state={{ rowSelection }}
    positionToolbarAlertBanner="bottom"
    //add custom action buttons to top-left of top toolbar
    renderTopToolbarCustomActions={({ table }) => (

      <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
        <Button
          color="primary"
          onClick={() => {
            navigation('add-resident');
          }}
          variant="contained"
        >
          Add Recident
        </Button>
        {/* <Divider orientation='vertical' variant='middle' flexItem />
        <IconButton 
        size="small"
        aria-label="delete" 
        color='error'
        disabled={Object.entries(rowSelection).length == 0}
        onClick={() => {
          alert('Delete Selected Accounts');
        }}
        sx={{width: '35px', height: '35px'}}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        <Divider orientation='vertical' variant='middle' flexItem />
        <IconButton 
        size="small"
        aria-label="edit" 
        color='success'
        disabled={!(Object.entries(rowSelection).length == 1)}
        onClick={() => {
          alert('Edit Selected Accounts');
        }}
        sx={{width: '35px', height: '35px'}}>
          <EditIcon fontSize="small" />
        </IconButton> */}
      </Box>
    )}

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
      // state={{
      //   showAlertBanner: true,
      //   showProgressBars: false,
      // }}
      enableRowActions
      renderRowActionMenuItems={({ closeMenu, table, row }) => [
        <MenuItem
          key={0}
          onClick={() => {
            navigation(`view/${row.original.residentUID}`)
            // View profile logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          View Profile
        </MenuItem>,
        <MenuItem
        key={1}
        onClick={() => {
          navigation(`edit/${row.original.residentUID}`)
          // View profile logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit Profile
        </MenuItem>,
        <MenuItem
        key={2}
        onClick={() => {
          // View profile logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>,
        <MenuItem
          key={3}
          onClick={() => {
            // Send email logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
          disabled={!(row.original.personalContactInfo.personalEmail || row.original.homeContactInfo.homeEmail)}
        >
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          Send Email
        </MenuItem>,
        <MenuItem
        key={4}
        onClick={() => {
          // Send email logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <PrintIcon />
        </ListItemIcon>
        Print Document
      </MenuItem>,
      ]}
    />
  )
};

export default ResidentsTable;
