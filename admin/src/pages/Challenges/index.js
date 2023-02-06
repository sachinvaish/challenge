import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CreateChallenge from './CreateChallenge';
import { deleteChallenge, getAllChallenges } from '../../redux/services/challengeSlice';
import Timer from '../../components/Timer';
import { Add } from '@mui/icons-material';
import EditChallenge from './EditChallenge';
import ConfirmDialogue from '../../components/ConfirmDialogue';
import { useNavigate } from 'react-router';

export default function Challenges() {

  const { allChallenges, loading, error } = useSelector((state) => ({ ...state.ChallengeReducer }));
  // console.log(allUsers);
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const navigate = useNavigate();

  const onCreateClose = () => {
    setCreateOpen(false);
  }

  const onDeleteClose = () => {
    setDeleteOpen(false);
  }

  const onEditClose = () => {
    setEditOpen(false);
  }

  const deleteChallengeMethod = (id) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      dispatch(deleteChallenge({ id, authToken }));
    } else {
      alert('Please Login');
    }

    setTimeout(() => {
      setTimeout(() => {
        dispatch(getAllChallenges());
      }, 500);
      onDeleteClose();
    }, 500);
  }

  const handleEditChallenge = (challengeInfo) => {
    setChallenge(challengeInfo);
    setEditOpen(true);
  }

  const handleDeleteChallenge = (challengeInfo) => {
    setChallenge(challengeInfo)
    setDeleteOpen(true);
  }

  const handleCreateChallenge = () => {
    if (localStorage.getItem('authToken'))
      setCreateOpen(true);
    else
      alert('please login');
  }
  // console.log(allUsers);

  useEffect(() => {
    dispatch(getAllChallenges());
  }, [])

  const columns = [
    { field: 'id', headerName: '#', width: 20, align: 'right', type: 'number' },
    {
      field: 'title', headerName: 'Title', width: 160, align: 'left',
      renderCell: ({ row }) => (<Typography variant='body2' color='primary' sx={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate(`/admin/challenge/${row.challenge._id}`)}>{row.title}</Typography>)
    },
    { field: 'description', headerName: 'Description', width: 300, align: 'left' },
    {
      field: 'due_date', headerName: 'Deadline', width: 200, align: 'center', type: 'date',
      renderCell: ({ row }) => (<Timer countDownDate={row.due_date} />)
    },
    {
      field: 'total_amount', headerName: 'Amount(₹)', width: 100, align: 'right', type: 'number'
      // renderCell: ({ row }) => (Number(row.first_prize + row.second_prize + row.feedback_prize))
    },
    {
      field: 'actions', headerName: 'Actions', flex: 1, align: 'center',
      renderCell: ({ row }) => (<>
        <IconButton sx={{ marginX: '3px' }} variant='contained' size='small' onClick={() => { handleEditChallenge(row.challenge) }}>
          <ModeEditIcon />
        </IconButton>
        <IconButton sx={{ marginX: '3px' }} variant='contained' size='small' onClick={() => { handleDeleteChallenge(row.challenge) }}>
          <DeleteIcon />
        </IconButton>
        <Button variant='contained' size='small' onClick={() => navigate(`/admin/challenge/${row.challenge._id}`)} >Announce Winners</Button>
      </>),
    }
  ];

  let rows;
  if (allChallenges) {
    let x = 1;
    rows = allChallenges.map((challenge) => ({
      id: x++,
      title: challenge.title,
      description: challenge.description,
      due_date: challenge.due_date,
      total_amount: (challenge.first_prize + challenge.second_prize + challenge.feedback_prize),
      challenge: challenge
    }))
  }

  return (
    <>
      <CreateChallenge open={createOpen} onClose={onCreateClose} />
      {editOpen && <EditChallenge open={editOpen} onClose={onEditClose} challenge={challenge} />}
      {deleteOpen && <ConfirmDialogue title='Delete Challenge' message='Do you really want to delete this challenge'
      open={deleteOpen} onClose={onDeleteClose} data={challenge._id} method={deleteChallengeMethod} />}

      <Box marginY={2} width='100%' sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h4'>Challenges</Typography>
        <Button variant='contained' size='small' onClick={handleCreateChallenge} startIcon={<Add />}>Create Challenge</Button>
      </Box>
      {rows && (
        <Box sx={{ height: '100vh', display: 'flex' }}>
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
                outline: "none !important"
              },
            }}

          />
        </Box>
      )}
    </>
  );
}
