import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/services/userSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router';
import Settings from './Settings';

export default function Users() {

  const { users, allUsers, loading, error } = useSelector((state) => ({ ...state.UserReducer }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [])


  const columns = [
    { field: 'id', headerName: '#', width: 20, align: 'right', type: 'number' },
    {
      field: 'photo', headerName: 'Photo', width: 80, align: 'left',
      renderCell: ({ row }) => (<>
        <Avatar sx={{ marginX: '10px', borderRadius: '10px' }} src={row.photo && `${process.env.REACT_APP_BACKEND_URL}/uploads/profile/${row.photo}`}> {(row.username).charAt(0).toUpperCase()}</Avatar>
      </>),
    },
    { field: 'username', headerName: 'Name', width: 150, align: 'left',
    renderCell:({row})=>(<Box sx={{display:'flex',flexDirection:'column'}}>
                        <Typography variant='body1' fontWeight='bold' color='primary' onClick={()=>navigate(`/admin/profile/${row.username}`)} sx={{cursor:'pointer'}}>{row.name}</Typography>
                        <Typography variant='caption' >@{row.username}</Typography>
    </Box>)
  },
    {
      field: 'designation',
      headerName: 'Designation',
      // type: 'number',
      width: 150,
      align: 'left'
    },
    {
      field: 'date', headerName: 'Joined', width: 120, align: 'left',
      renderCell : ({row})=>{return row.date.substr(0,10)}
    },
    {
      field: 'role', headerName: 'Role', width: 80, align: 'left',
      renderCell: ({ row }) => (row.role === 1 ? 'Admin' : 'User')
    },
    {
      field: 'actions', headerName: 'Actions', width: 200, align: 'center',
      renderCell: ({ row }) => (<>
        <Button startIcon={<ModeEditIcon />} sx={{ marginX: '5px' }} variant='contained' size='small' color='primary' onClick={() => alert(`Edit User ${row.username}`)}>
           Edit
        </Button>
        <Button startIcon={<DeleteIcon />} sx={{ marginX: '5px' }} variant='contained' size='small' color='error' onClick={() => alert(`Delete User ${row.username}`)}>
           Delete
        </Button>
      </>),
    }
  ];

  let rows;
  if (allUsers) {
    let x = 1;
    rows = allUsers.map((user) => ({
      id: x++,
      name : user.name,
      username: user.username,
      designation: user.designation,
      date: user.date,
      photo: user.photo_url,
      role: user.role
    }))
  }

  return (
    <>
    <Settings/>
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
                outline: "none !important",
              },
            }}

          />
        </Box>
      )}
    </>
  );
}
