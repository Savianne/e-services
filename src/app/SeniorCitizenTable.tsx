import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import doRequest from '../API/doRequest';
import useDeleteResidentRecord from '../API/hooks/useDeleteResidentRecord';
import TResidentRecord from './types/TResidentRecord';
import useDeleteModal from './DeleteModal/useDeleteModal';
import DeleteModal from './DeleteModal/DeleteModal';
import useGetSeniorCitizenResidentsRecord from '../API/hooks/useGetSenioCitizen';

//Mui Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AccountCircle, Send } from '@mui/icons-material';
import SmsIcon from '@mui/icons-material/Sms';
import PrintIcon from '@mui/icons-material/Print';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { 
    Box,
    Avatar,
    Button,
    MenuItem,
    ListItemIcon,
    Snackbar,
    Alert,
    Badge
 } from '@mui/material'

const SeniorCitizenTable: FC = () => {
  const { deleteResident, isLoading: isDeleting, isError: isDeletionError, isSuccess: isDeletionSuccess} = useDeleteResidentRecord();
  const {data: seniorCitizens, isLoading, isError, isSuccess} = useGetSeniorCitizenResidentsRecord();
  const deleteRecordModal = useDeleteModal();
  const navigation = useNavigate();
  const [rowSelection, setRowSelection] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const [data, setData] = useState<TResidentRecord[]>([]);

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

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if(seniorCitizens) setData(seniorCitizens);
  }, [seniorCitizens])
  return (
    <>
    <DeleteModal onDeleteSuccess={() => setOpen(true)} />
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Delete Resident record successfully!
      </Alert>
    </Snackbar>
    <MaterialReactTable 
    columns={columns} 
    data={data} 
    // enableRowSelection
    getRowId={(row) => row.residentUID}
    onRowSelectionChange={setRowSelection}
    // state={{ rowSelection }}
    positionToolbarAlertBanner="bottom"
    //add custom action buttons to top-left of top toolbar
    renderTopToolbarCustomActions={({ table }) => (

      <Box sx={{ display: 'flex', gap: '1rem', p: '4px', alignItems: 'center' }}>
        <Button
          color="primary"
          onClick={() => {
            navigation('../residents/add-resident');
          }}
          variant="contained"
        >
          Add Resident
        </Button>
        <Badge sx={{marginLeft: 'auto', marginRight: '10px'}} color="secondary" badgeContent={data.length}>
          <AccountCircleIcon />
        </Badge> 
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
      state={{
        showAlertBanner: isError,
        showProgressBars: isLoading,
      }}
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
          deleteRecordModal(`Records of ${row.original.name.firstName.toLocaleUpperCase()} ${row.original.name.middleName.toLocaleUpperCase()}. ${row.original.name.lastName.toLocaleUpperCase()}`, () => {
            return new Promise<{success: boolean}>((res, rej) => {
              doRequest({
                method: "DELETE",
                url: "/delete-resident-record",
                data: { residentUID:  row.original.residentUID}
              })
                .then(response => {
                    data.splice(row.index, 1); //assuming simple data table
                    setData([...data]);
                    response.success? res(response) : rej(response);
                })
                .catch(err => rej({success: false}))
            })
          })
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
          navigation(`/admin/e-services/print-document/${row.original.residentUID}`)
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
    </>
  )
};

export default SeniorCitizenTable;
