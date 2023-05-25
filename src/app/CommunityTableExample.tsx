import React, { FC, useReducer, useRef, useState } from 'react';

import MaterialReactTable, {
  DensityState,
  MRT_ColumnDef,
  MRT_FullScreenToggleButton,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_TableInstance,
  MRT_TablePagination,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToolbarAlertBanner,
} from 'material-react-table';

import type {
  PaginationState,
  RowSelectionState,
  VisibilityState,
} from '@tanstack/react-table';

import {
  alpha,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Avatar
} from '@mui/material';

import PrintIcon from '@mui/icons-material/Print';


//column definitions...
type Person = {
  name: {
    firstName: string;
    lastName: string;
    middleName: string;
    extName: string | null;
  };
  gender: string;
  maritalStatus: string,
  avatar: string | null,
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'Duggong',
      extName: 'jr',
    },
    gender: 'male',
    maritalStatus: 'single',
    avatar: '/assets/images/avatar/apple.png',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
      middleName: 'Muryot',
      extName: null,
    },
    gender: 'female',
    maritalStatus: 'single',
    avatar: null,
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
      middleName: 'Anglit',
      extName: null,
    },
    gender: 'male',
    maritalStatus: 'single',
    avatar: null,
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
      middleName: 'Pingol',
      extName: "sr",
    },
    gender: 'male',
    maritalStatus: 'married',
    avatar: '/assets/images/avatar/apple.png',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
      middleName: 'Ampyong',
      extName: null,
    },
    gender: 'male',
    maritalStatus: 'married',
    avatar: '/assets/images/avatar/apple.png',
  },
];
//end

const Example: FC = () => {
  const columns = React.useMemo<MRT_ColumnDef<Person>[]>(
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
  //we need a table instance ref to pass as a prop to the MRT Toolbar buttons
  const tableInstanceRef = useRef<MRT_TableInstance<Person>>(null);

  //we will also need some weird re-render hacks to force the MRT_ components to re-render since ref changes do not trigger a re-render
  const rerender = useReducer(() => ({}), {})[1];

  //we need to manage the state that should trigger the MRT_ components in our custom toolbar to re-render
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [density, setDensity] = useState<DensityState>('comfortable');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [showColumnFilters, setShowColumnFilters] = useState(false);

  return (
    <Box sx={{ border: 'gray 2px dashed', p: '1rem' }}>
      {/* Our Custom External Top Toolbar */}
      {tableInstanceRef.current && (
        <Toolbar
          sx={(theme) => ({
            backgroundColor: alpha(theme.palette.secondary.light, 0.2),
            borderRadius: '4px',
            display: 'flex',
            flexDirection: {
              xs: 'column',
              lg: 'row',
            },
            gap: '1rem',
            justifyContent: 'space-between',
            p: '1.5rem 0',
          })}
        >
          <Box>
            <Button
              color="primary"
              onClick={() => {
                alert('Add User');
              }}
              variant="contained"
            >
              Crete New Account
            </Button>
          </Box>
          <MRT_GlobalFilterTextField table={tableInstanceRef.current} />
          <Box>
            <MRT_ToggleFiltersButton table={tableInstanceRef.current} />
            <MRT_ShowHideColumnsButton table={tableInstanceRef.current} />
            <MRT_ToggleDensePaddingButton table={tableInstanceRef.current} />
            <Tooltip arrow title="Print">
              <IconButton onClick={() => window.print()}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <MRT_FullScreenToggleButton table={tableInstanceRef.current} />
          </Box>
        </Toolbar>
      )}
      <Typography padding="1rem 4px">
        {
          "Hey I'm some page content. I'm just one of your normal components between your custom toolbar and the MRT Table below"
        }
      </Typography>
      {/* The MRT Table */}
      <MaterialReactTable
        columns={columns}
        data={data}
        enableBottomToolbar={false}
        enableRowSelection
        enableTopToolbar={false}
        initialState={{ showGlobalFilter: true }}
        // See the Table State Management docs for why we need to use the updater function like this
        onColumnVisibilityChange={(updater) => {
          setColumnVisibility((prev) =>
            updater instanceof Function ? updater(prev) : updater,
          );
          queueMicrotask(rerender); //hack to rerender after state update
        }}
        onDensityChange={(updater) => {
          setDensity((prev) =>
            updater instanceof Function ? updater(prev) : updater,
          );
          queueMicrotask(rerender); //hack to rerender after state update
        }}
        onRowSelectionChange={(updater) => {
          setRowSelection((prev) =>
            updater instanceof Function ? updater(prev) : updater,
          );
          queueMicrotask(rerender); //hack to rerender after state update
        }}
        onPaginationChange={(updater) => {
          setPagination((prev) =>
            updater instanceof Function ? updater(prev) : updater,
          );
          queueMicrotask(rerender); //hack to rerender after state update
        }}
        onShowFiltersChange={(updater) => {
          setShowColumnFilters((prev) =>
            updater instanceof Function ? updater(prev) : updater,
          );
          queueMicrotask(rerender); //hack to rerender after state update
        }}
        muiToolbarAlertBannerProps={
          {
            color: 'error',
            children: 'Network Error. Could not fetch data.',
          }
        }
        state={{
          columnVisibility,
          density,
          rowSelection,
          pagination,
          showColumnFilters,
          showAlertBanner: true,
          showProgressBars: true,
        }}
        tableInstanceRef={tableInstanceRef} //get access to the underlying table instance ref
      />
      {/* Our Custom Bottom Toolbar */}
      {tableInstanceRef.current && (
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <MRT_TablePagination table={tableInstanceRef.current} />
          <Box sx={{ display: 'grid', width: '100%' }}>
            <MRT_ToolbarAlertBanner
              stackAlertBanner
              table={tableInstanceRef.current}
            />
          </Box>
        </Toolbar>
      )}
    </Box>
  );
};

export default Example;
