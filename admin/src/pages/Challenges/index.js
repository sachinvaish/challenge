import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/services/userSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CreateChallenge from './CreateChallenge';

export default function Challenges() {

  const { users, allUsers, loading, error } = useSelector((state) => ({ ...state.UserReducer }));
  // console.log(allUsers);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  }

  const handleClick = () => {
    if (localStorage.getItem('authToken'))
      setOpen(true);
    else
      alert('please login');
  }
  // console.log(allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [])

  const columns = [
    { field: 'id', headerName: '#', width: 20, align: 'right', type: 'number' },
    { field: 'title', headerName: 'Title', width: 200, align: 'left' },
    { field: 'description', headerName: 'Description', width: 300, align: 'left' },
    { field: 'submissions', headerName: 'Submissions', width: 150, align: 'left' },
    { field: 'winner', headerName: 'Winner', width: 150, align: 'left' },
    {
      field: 'actions', headerName: 'Actions', width: 120, align: 'center',
      renderCell: ({ row }) => (<>
        <IconButton sx={{ marginX: '5px' }} variant='contained' size='small' color='primary' onClick={() => alert(`Edit User ${row.username}`)}>
          <ModeEditIcon />
        </IconButton>
        <IconButton sx={{ marginX: '5px' }} variant='contained' size='small' color='error' onClick={() => alert(`Delete User ${row.username}`)}>
          <DeleteIcon />
        </IconButton>
      </>),
    }
  ];

  let rows;
  if (allUsers) {
    let x = 1;
    rows = allUsers.map((user) => ({
      id: x++,
      username: user.username,
      designation: user.designation,
      date: user.date,
      role: user.role
    }))
  }

  return (
    <>
      <CreateChallenge open={open} onClose={onClose} />
      <Box marginY={2} width='100%' >
        <Button variant='contained' onClick={handleClick}>Submit Design</Button>
      </Box>
      {rows && (
        <Box sx={{ height: '50%', display: 'flex' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pdesignationSize={12}
            rowsPerPdesignationOptions={[12]}
            disableSelectionOnClick
            sx={{
              color: '#011111', backgroundColor: 'white',
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important"
              },
            }}

          />
        </Box>
      )}
    </>
  );
}
