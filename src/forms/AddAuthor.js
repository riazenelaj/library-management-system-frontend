import React, { useState } from "react";
import { TextField,Box } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function AddAuthor(){
   const navigate=useNavigate();
   const [open, setOpen] = useState(false);
   const [snackbarStatus, setSnackbarStatus] = useState('success'); 
   const [snackbarMessage, setSnackbarMessage] = useState('');
    const [authors,setAuthors]=useState('');
    const [name,setName]=useState('');
    const [surname,setSurname]=useState('');

   const handleAddAuthor=()=>{
    const newAuthor={
      name,
      surname,
    }

    axios.post('http://localhost:8080/api/v1/authors/create',newAuthor)
    .then((response)=>{
      setSnackbarStatus('success');
      setSnackbarMessage('Author created successfully!');
      setOpen(true);
      setAuthors([response.data,...authors]);
    })
    .catch((error)=>{
      setSnackbarStatus('error');
      setSnackbarMessage('Failed to create the author!');
      setOpen(true);
    })
   }
    return(
        <div>
            <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'row', 
          justifyContent: 'space-between',
          alignItems: 'center', 
          margin: '20px',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic-name"
          label="Name"
          variant="outlined"
          className="name_input"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          sx={{ width: '25ch', mr: 1 }} 
        />
        <TextField
          id="outlined-basic-surname"
          label="Surname"
          variant="outlined"
          value={surname}
          required
          onChange={(e) => setSurname(e.target.value)}
          sx={{ width: '25ch', mr: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddAuthor} sx={{ minWidth: '100px' }}>
          Submit
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MuiAlert
          onClose={() => setOpen(false)}
          severity={snackbarStatus}
          sx={{ width: '100%'  }}
         
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      </div>
    )
}
export default AddAuthor;