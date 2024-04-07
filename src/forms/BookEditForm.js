import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { BookCardContext } from "./../component/BookCardProvider";

function BookEditForm() {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { fetchBooks } = useContext(BookCardContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBook = {
      title: title,
      description: description,
    };

    try {
      await axios.put(`http://localhost:8080/api/v1/books/update/${id}`, updatedBook);
      fetchBooks();
      setOpen(false)
    } catch (error) {
      console.error('Error updating book details:', error);
    }
  };

  return (
    <Container>
      <form  style={{margin:"10px"}}>
       <div> <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin='5px'
        /></div>
      <div style={{marginTop:'10px'}}>
         <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="10px 0" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /></div>
        <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" style={{ margin: '10px' ,fontSize:'12px',marginLeft:'30px',float:'right'}}>
          Save
        </Button>
      </form>
    </Container>
  );
}

export default BookEditForm;
