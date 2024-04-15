import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GridColDef, GridEventListener, GridValueGetterParams } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';

// import * as dayjs from 'dayjs';
import { LinkUnstyled } from '../../../components/LinkUnstyled';
import { useOrganizationMembersContext } from '../../../contexts/useOrganizationMembersContext';

const columns: GridColDef[] = [
  { field: 'userId', headerName: 'ID', width: 330 },
  {
    field: 'name',
    headerName: 'Name',
    width: 170,
    valueGetter: (params: GridValueGetterParams) => `${params.row.user.name}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 170,
    valueGetter: (params: GridValueGetterParams) => `${params.row.user.email}`,
  },
  // { field: 'lastName', headerName: 'Last name', width: 170 },
  { field: 'permission', headerName: 'Permission', width: 170 },
  {
    field: 'updatedAt',
    headerName: 'Updated',
    width: 90,
    // valueGetter: (params: GridValueGetterParams) =>
    //   dayjs().diff(dayjs(params.row.updatedAt), 'years').toString(),
  },
];

export const MembersTable = () => {
  const { organizationMembers, setSelectedOrganizationMemberId } = useOrganizationMembersContext();
  console.log({ organizationMembers });

  const handleEvent: GridEventListener<'rowClick'> = (params) => {
    console.log({ params });
  };

  return (
    <>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Patients</Typography>
        <LinkUnstyled to={'/portal/patients/create'}>
          <Button variant={'contained'}>
            <Add /> Add Patient
          </Button>
        </LinkUnstyled>
      </Stack>
      {organizationMembers && (
        <DataGrid
          rows={organizationMembers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 50 },
            },
          }}
          getRowId={(row) => {
            return row.userId;
          }}
          pageSizeOptions={[50]}
          disableRowSelectionOnClick
          sx={{ '& .MuiDataGrid-overlayWrapper': { minHeight: '50px' } }}
          onRowClick={handleEvent}
          // checkboxSelection
        />
      )}
    </>
  );
};
