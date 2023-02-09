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
import Mail from '../Users/Mail';
import ConfirmDialogue from '../../components/ConfirmDialogue';
import { toast } from 'react-toastify';
import { deleteSubmissionByID, getAllSubmissions } from '../../redux/services/submissionSlice';

export default function Submissions() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [submissionID, setSubmissionID] = useState(null);
  const { submissions } = useSelector((state) => ({ ...state.SubmissionReducer }));
  const [mailOpen, setMailOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteClose = () => {
    setDeleteOpen(false);
  }

  const onMailClose = () => {
    setMailOpen(false);
  }

  const deleteSubmissionMethod = (id) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      dispatch(deleteSubmissionByID({ id, authToken }));
    } else {
      toast('Please Login');
    }
    setTimeout(() => {
      setTimeout(() => {
        dispatch(getAllSubmissions());
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

  const handleDeleteSubmission = (id) => {
    setSubmissionID(id)
    setDeleteOpen(true);
  }

  useEffect(() => {
    dispatch(getAllSubmissions());
  }, [])


  const columns = [
    { field: 'id', headerName: '#', width: 20, align: 'right', type: 'number' },
    {
      field: 'photo', headerName: 'Photo', width: 200, align: 'left',
      renderCell: ({ row }) => (<>
        <Box component='img' sx={{ margin: '10px', width:'170px', height:'auto', borderRadius: '10px' }} src={row.photo && `${process.env.REACT_APP_BACKEND_URL}/uploads/submissions/${row.photo}`}/>
      </>),
    },
    { field: 'description', headerName: 'Description', width: 150, align: 'left' },
    { field: 'user_id', headerName: 'User', width: 150, align: 'left' },
    { field: 'challenge_id', headerName: 'Challenge', width: 150, align: 'left' },
    {
      field: 'actions', headerName: 'Actions', width: 300, align: 'center',
      renderCell: ({ row }) => (<>
        <Button startIcon={<EmailIcon />} sx={{ marginX: '5px' }} variant='contained' size='small' color='info' onClick={() => { handleMail(row.user) }}>
          Mail
        </Button>
        <Button disabled startIcon={<BlockIcon />} sx={{ marginX: '5px' }} variant='outlined' size='small' color='error' onClick={() => alert(`Block User ${row.username}`)}>
          Block
        </Button>
        <Button startIcon={<DeleteIcon />} sx={{ marginX: '5px' }} variant='contained' size='small' color='error' onClick={() => { handleDeleteSubmission(row.submission_id) }}>
          Delete
        </Button>
      </>),
    }
  ];

  let rows;
  if (submissions) {
    let x = 1;
    rows = submissions.map((submissions) => ({
      id: x++,
      submission_id : submissions._id,
      photo : submissions.photo_url,
      description : submissions.description,
      user_id : submissions.user_id,
      challenge_id : submissions.challenge_id
    }))
  }

  return (
    <>
    {mailOpen && <Mail open={mailOpen} onClose={onMailClose} user={userInfo} method={sendMailMethod} />}
    {deleteOpen && <ConfirmDialogue title='Delete Submission' message='Do you really want to delete this Submission'
      open={deleteOpen} onClose={onDeleteClose} data={submissionID} method={deleteSubmissionMethod} />}
    {rows && (
      <Box sx={{ height: '90vh', display: 'flex' }}>
        <DataGrid
        getRowHeight={() => { return 'auto' }}
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
