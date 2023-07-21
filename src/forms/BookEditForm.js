import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookCardContext } from '../component/BookCardProvider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function BookEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedBook = {
      title: title,
      description: description,
    };
    
    console.log(updatedBook);

    try {
      await axios.put(`http://localhost:8080/api/v1/books/update/${id}`, updatedBook);
      navigate(`/books/${id}`);
    } catch (error) {
      console.error('Error updating book details:', error);
    }
  };

  return (
    <Container>
      <h2>Edit Book Details</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Save
        </Button>
      </form>
    </Container>
  );
}

export default BookEditForm;
