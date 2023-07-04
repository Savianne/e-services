import React from "react";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IBrgyOrgChart } from "./OrganizationalChart";
import { IBarangayOfficials } from "./types/IbarangayOfficials";
import useGetTerms from "../API/hooks/useGetTerms";
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

const TermsOfServiceTable:React.FC = () => {
  const navigate = useNavigate();
  const {data} = useGetTerms();
  const columns = React.useMemo<MRT_ColumnDef<IBarangayOfficials>[]>(
    () => [
        {
            id: 'term',
            header: 'Term',
            size: 20,
            accessorFn: (row) => `${row.start}-${row.end}`
        },
        {
            enableColumnActions: false,
            enableGlobalFilter: false,
            enableColumnFilter: false,
            enableSorting: false,
            accessorFn: (row) => `${row.barangayChairperson.firstName} ${row.barangayChairperson.middleName} ${row.barangayChairperson.surname} ${row.barangayChairperson.extName}`, //access nested data with dot notation
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
                  <Avatar src={row.original.barangayChairperson.picture || undefined} alt={row.original.barangayChairperson.firstName} />
                  <h5>{row.original.barangayChairperson.firstName.toUpperCase()} {row.original.barangayChairperson.middleName[0].toUpperCase()}. {row.original.barangayChairperson.surname.toUpperCase()} {row.original.barangayChairperson.extName? row.original.barangayChairperson.extName?.toUpperCase() : ""}</h5>
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
                <Avatar src={row.original.barangayChairperson.picture? `/assets/images/avatar/${row.original.barangayChairperson.picture}` : undefined} alt={row.original.barangayChairperson.firstName} sx={{width: '200px', height: '200px'}} />
              </Box>
              <h1 style={{marginBottom: 0, display: 'flex', flex: '0 1 100%', justifyContent: "center"}}>Hon. {row.original.barangayChairperson.firstName} {row.original.barangayChairperson.middleName[0]}. {row.original.barangayChairperson.surname} {row.original.barangayChairperson.extName || ""}</h1>
              <Typography sx={{marginBottom: 0, display: 'flex', flex: '0 1 100%', justifyContent: "center"}}>Barangay Chairperson</Typography>
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
                    ...row.original.barangaySecretary,
                    position: "Brgy. Secretary",
                    fullName: `${row.original.barangaySecretary.firstName} ${row.original.barangaySecretary.middleName[0]}. ${row.original.barangaySecretary.surname} ${row.original.barangaySecretary.extName? row.original.barangaySecretary.extName : ""}`
                  },
                  {
                    ...row.original.barangayTreasurer,
                    position: "Brgy. Treasurer",
                    fullName: `${row.original.barangayTreasurer.firstName} ${row.original.barangayTreasurer.middleName[0]}. ${row.original.barangayTreasurer.surname} ${row.original.barangayTreasurer.extName? row.original.barangayTreasurer.extName : ""}`
                  }
                 ]} />
              </Box>
            </Box>
            <PersonList personList={row.original.barangayCouncilors.map(i => ({
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
                navigate('new/barangay');
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

export default TermsOfServiceTable;