import React from "react";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ISKOfficials } from "./types/ISKOfficials";
import useGetSKTerms from "../API/hooks/useGetSKTerms";
import PersonList from "./PersonList";

import { 
    Box,
    Avatar,
    Button,
    IconButton,
    Typography,
    Divider,
    MenuItem,
    ListItemIcon,
 } from '@mui/material'

 import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

//MRT Imports
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

const BarangayOrg:ISKOfficials[] = []

const SKTermsOfServiceTable:React.FC = () => {
  const navigate = useNavigate();
  const {data} = useGetSKTerms();
  const columns = React.useMemo<MRT_ColumnDef<ISKOfficials>[]>(
    () => [
        {
            id: 'term',
            header: 'Term',
            size: 20,
            accessorFn: (row) => `${row.start}-${row.end}`
        },
        {
            enableColumnActions: false,
            enableGlobalFilter: true,
            enableColumnFilter: true,
            enableSorting: true,
            accessorFn: (row) => `${row.skChairperson.firstName} ${row.skChairperson.middleName} ${row.skChairperson.surname} ${row.skChairperson.extName}`, //access nested data with dot notation
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
                  <Avatar src={row.original.skChairperson.picture? `/assets/images/avatar/${row.original.skChairperson.picture}` : undefined} alt={row.original.skChairperson.firstName} />
                  <h5>{row.original.skChairperson.firstName.toUpperCase()} {row.original.skChairperson.middleName[0].toUpperCase()}. {row.original.skChairperson.surname.toUpperCase()} {row.original.skChairperson.extName? row.original.skChairperson.extName?.toUpperCase() : ""}</h5>
                  {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                </Box>
              ),
        },
    ], []);

    React.useEffect(() => {
      console.log(data)
    }, [data])
    return(
        <MaterialReactTable 
        columns={columns} 
        data={data? data : []} 
        // enableRowActions
        // renderRowActions={({ row, table }) => (
        //   <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        //     {/* <IconButton
        //       color="secondary"
        //       onClick={() => {
        //         // table.setEditingRow(row);
        //       }}
        //     >
        //       <EditIcon />
        //     </IconButton> */}
        //     <IconButton
        //       color="error"
        //       onClick={() => {
        //         // data.splice(row.index, 1); //assuming simple data table
        //         // setData([...data]);
        //       }}
        //     >
        //       <DeleteIcon />
        //     </IconButton>
        //   </Box>
        // )}
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: 'grid',
              margin: 'auto',
              gridTemplateColumns: '1fr 1fr',
              width: '100%',
            }}
          >
            <Box
            sx={{
              display: 'flex',
              flex: "1",
              flexWrap: "wrap",
              alignContent: "flex-start",
              justifyContent: "center"
            }}
            >
              <Box
              sx={{
                display: 'flex',
                flex: "0 1 100%",
                marginTop: "15px",
                height: 'fit-content',
                justifyContent: "center"
              }}
              >
                <Avatar src={row.original.skChairperson.picture? `/assets/images/avatar/${row.original.skChairperson.picture}` : undefined} alt={row.original.skChairperson.firstName} sx={{width: '200px', height: '200px'}} />
              </Box>
              <h1 style={{marginBottom: 0, display: 'flex', flex: '0 1 100%', justifyContent: "center"}}>Hon. {row.original.skChairperson.firstName} {row.original.skChairperson.middleName[0]}. {row.original.skChairperson.surname} {row.original.skChairperson.extName || ""}</h1>
              <Typography style={{marginBottom: 0, display: 'flex', flex: '0 1 100%', justifyContent: "center"}}>Barangay Chairperson</Typography>
              <Box
              sx={{
                display: 'flex',
                flex: "0 1 100%",
                marginTop: "15px",
                height: 'fit-content',
                justifyContent: "center"
              }}
              >
                 <PersonList personList={[
                  {
                    ...row.original.skSecretary,
                    position: "Brgy. Secretary",
                    fullName: `${row.original.skSecretary.firstName} ${row.original.skSecretary.middleName[0]}. ${row.original.skSecretary.surname} ${row.original.skSecretary.extName? row.original.skSecretary.extName : ""}`
                  },
                  {
                    ...row.original.skTreasurer,
                    position: "Brgy. Treasurer",
                    fullName: `${row.original.skTreasurer.firstName} ${row.original.skTreasurer.middleName[0]}. ${row.original.skTreasurer.surname} ${row.original.skTreasurer.extName? row.original.skTreasurer.extName : ""}`
                  }
                 ]} />
              </Box>
            </Box>
            <PersonList personList={row.original.skCouncilors.map(i => ({
              ...i,
              position: "Brgy. Councilor",
              fullName: `${i.firstName} ${i.middleName[0]}. ${i.surname} ${i.extName? i.extName : ""}`
            }))} />
          </Box>
        )}
        renderTopToolbarCustomActions={({ table }) => (

          <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
            <Button
              color="primary"
              onClick={() => {
                navigate('new/sk');
              }}
              variant="contained"
            >
              Update Term
            </Button>
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
        
        // enableRowSelection
        enablePinning
        enableGlobalFilter={false} 
        enableColumnFilters={false}
        enableSorting={false}
        />
    )
}

export default SKTermsOfServiceTable;