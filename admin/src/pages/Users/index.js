import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, sendMail } from '../../redux/services/userSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router';
import EmailIcon from '@mui/icons-material/Email';
import BlockIcon from '@mui/icons-material/Block';
import Mail from './Mail';
import ConfirmDialogue from '../../components/ConfirmDialogue';
import { toast } from 'react-toastify';

export default function Users() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [userID, setUserID] = useState(null);
  const { users, allUsers, loading, error } = useSelector((state) => ({ ...state.UserReducer }));
  const [mailOpen, setMailOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(allUsers);

  const onDeleteClose = () => {
    setDeleteOpen(false);
  }

  const onMailClose = () => {
    setMailOpen(false);
  }

  const deleteUserMethod = (id) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      dispatch(deleteUser({ id, authToken }));
    } else {
      toast('Please Login');
    }
    setTimeout(() => {
      setTimeout(() => {
        dispatch(getAllUsers());
      }, 500);
      onDeleteClose();
    }, 500);
  }

  const sendMailMethod = (mailData) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      dispatch(sendMail({ mailData, authToken }));
      onMailClose();
    } else {
      toast('Please Login');
    }
  }

  const handleMail = (user) => {
    setUserInfo(user);
    setMailOpen(true);
  }

  const handleDeleteUser = (user_id) => {
    setUserID(user_id)
    setDeleteOpen(true);
  }

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
    {
      field: 'username', headerName: 'Name', width: 150, align: 'left',
      renderCell: ({ row }) => (<Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='body1' fontWeight='bold' color='primary' onClick={() => navigate(`/admin/profile/${row.username}`)} sx={{ cursor: 'pointer' }}>{row.name}</Typography>
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
      renderCell: ({ row }) => { return row.date.substr(0, 10) }
    },
    {
      field: 'role', headerName: 'Role', width: 80, align: 'left',
      renderCell: ({ row }) => (row.role === 1 ? 'Admin' : 'User')
    },
    {
      field: 'actions', headerName: 'Actions', width: 300, align: 'center',
      renderCell: ({ row }) => (<>
        <Button startIcon={<EmailIcon />} sx={{ marginX: '5px' }} variant='contained' size='small' color='info' onClick={() => { handleMail(row.user) }}>
          Mail
        </Button>
        <Button disabled startIcon={<BlockIcon />} sx={{ marginX: '5px' }} variant='outlined' size='small' color='error' onClick={() => alert(`Block User ${row.username}`)}>
          Block
        </Button>
        <Button startIcon={<DeleteIcon />} sx={{ marginX: '5px' }} variant='contained' size='small' color='error' onClick={() => { handleDeleteUser(row.user_id) }}>
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
      name: user.name,
      username: user.username,
      designation: user.designation,
      date: user.date,
      photo: user.photo_url,
      role: user.role,
      user_id: user._id,
      user: user
    }))
  }

  return (
    <>
      {mailOpen && <Mail open={mailOpen} onClose={onMailClose} user={userInfo} method={sendMailMethod} />}
      {deleteOpen && <ConfirmDialogue title='Delete User' message='Do you really want to delete this user'
        open={deleteOpen} onClose={onDeleteClose} data={userID} method={deleteUserMethod} />}
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
