import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';


//Mui Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AccountCircle, Send } from '@mui/icons-material';
import SmsIcon from '@mui/icons-material/Sms';

import { 
    Box,
    Avatar,
    Button,
    IconButton,
    Divider,
    MenuItem,
    ListItemIcon,
 } from '@mui/material'

type Person = {
  uid: string,
  name: {
    firstName: string;
    lastName: string;
    middleName: string;
    extName: string | null;
  };
  gender: string;
  maritalStatus: string,
  avatar: string | null,
  email: string | null,
  cpNumber: string | null,
  telNumber: string | null
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    uid: '1234',
    name: {
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'Duggong',
      extName: 'jr',
    },
    gender: 'male',
    maritalStatus: 'single',
    avatar: '/assets/images/avatar/apple.png',
    email: 'www.apple@gmail',
    cpNumber: null,
    telNumber: '123',
  },
  {
    uid: '12345',
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
      middleName: 'Muryot',
      extName: null,
    },
    gender: 'female',
    maritalStatus: 'single',
    avatar: null,
    email: null,
    cpNumber: '09128486021',
    telNumber: '12455'
  },
  {
    uid: '12346',
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
      middleName: 'Anglit',
      extName: null,
    },
    gender: 'male',
    maritalStatus: 'single',
    avatar: null,
    email: null,
    cpNumber: '09125666988',
    telNumber: null
  },
  {
    uid: '1237',
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
      middleName: 'Pingol',
      extName: "sr",
    },
    gender: 'male',
    maritalStatus: 'married',
    avatar: '/assets/images/avatar/apple.png',
    email: 'mark@gmail.com',
    cpNumber: '09125666988',
    telNumber: null
  },
  {
    uid: '123469',
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
      middleName: 'Ampyong',
      extName: null,
    },
    gender: 'male',
    maritalStatus: 'married',
    avatar: '/assets/images/avatar/apple.png',
    email: 'www.savrela@gmail',
    cpNumber: null,
    telNumber: null
  },
];

const ResidentsTable: FC = () => {
  const navigation = useNavigate();
  const [rowSelection, setRowSelection] = React.useState({});
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        enableColumnActions: false,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        enableSorting: false,
        accessorFn: (row) => `${row.avatar}`, //access nested data with dot notation
        id: 'avatar',
        header: 'Avatar',
        size: 20,
        Cell: ({ renderedCellValue, row }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <Avatar src={row.original.avatar? row.original.avatar : undefined} alt={row.original.name.firstName} />
              {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            </Box>
          ),
      }, 
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'name.middleName', //normal accessorKey
        header: 'Middle Name',
      },
      {
        accessorKey: 'name.extName',
        header: 'Ext. Name',
      },
      {
        accessorKey: 'email',
        header: 'Email'
      },
      {
        accessorKey: 'cpNumber',
        header: 'CP Number'
      },
      {
        accessorKey: 'telNumber',
        header: 'Tel Number'
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
      },
      {
        accessorKey: 'maritalStatus',
        header: 'Marital Status',
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
    data={data} 
    enableRowSelection
    getRowId={(row) => row.uid}
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
        <Divider orientation='vertical' variant='middle' flexItem />
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
        </IconButton>
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
          disabled={!row.original.email}
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
        disabled={!row.original.cpNumber}
      >
        <ListItemIcon>
          <SmsIcon />
        </ListItemIcon>
        Send SMS
      </MenuItem>,
      ]}
    />
  )
};

export default ResidentsTable;
