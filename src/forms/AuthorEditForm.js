import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Snackbar, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const AuthorEditForm = ({ author,onClose }) => {
  const [open, setOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const [editedAuthor, setEditedAuthor] = useState({
    name: author.name,
    surname: author.surname,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await axios.put(`http://localhost:8080/api/v1/authors/update/${author.id}`, editedAuthor);
      onClose(editedAuthor); 
      setSnackbarStatus('success');
      setSnackbarMessage('Author updated successfully!');
      setOpen(true);
    } catch (error) {
      console.error('Error updating author:', error);
        setSnackbarStatus('error');
          setSnackbarMessage('Failed to update the author!');
          setOpen(true);
    }
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column', 
        gap: '20px', 
        alignItems: 'flex-end', 
        marginTop:'20px'
      }}
    >
      <TextField
        name="name"
        label="Name"
        value={editedAuthor.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="surname"
        label="Surname"
        value={editedAuthor.surname}
        onChange={handleChange}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" style={{ alignSelf: 'flex-end' }}>
        Save Changes
      </Button>
    </form>
    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <MuiAlert onClose={() => setOpen(false)} severity={snackbarStatus} sx={{ width: "100%" }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default AuthorEditForm;
