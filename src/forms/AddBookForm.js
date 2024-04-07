import React, { useState, useEffect ,useContext} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { BookCardContext } from './component/BookCardProvider';
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [authorOptions, setAuthorOptions] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [isLoadingAuthors, setIsLoadingAuthors] = useState(true);
  const [open, setOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState('success'); 
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { books, setBooks } = useContext(BookCardContext);
   const navigate = useNavigate();

   useEffect(() => {
    axios.get('http://localhost:8080/api/v1/authors')
      .then((response) => {
        setAuthorOptions(response.data);
        setIsLoadingAuthors(false);
      })
      .catch((error) => {
        console.error('Error fetching authors:', error);
        setIsLoadingAuthors(false);
      });
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBook = () => {
    const newBook = {
      title,
      description,
      image: imageBase64,
      authorId: selectedAuthor?.id || null,
    };

    axios.post('http://localhost:8080/api/v1/books/create', newBook)
      .then((response) => {
        console.log('Book created successfully:', response.data);
        setSnackbarStatus('success');
        setSnackbarMessage('Book created successfully!');
        setOpen(true);
        setBooks([response.data, ...books]);
      })
      .catch((error) => {
        console.error('Error creating book:', error);
        setSnackbarStatus('error');
        setSnackbarMessage('Failed to create the book!');
        setOpen(true);
      });
      navigate("/")
      
  };
  const AddBookFormContainer = styled("div")({
    width: "80%", 
    margin: "0 auto", 
  });

  const FormButtonsContainer = styled("div")({
    display: "flex",
    justifyContent: "space-between",

      marginLeft: "10px",
  });

  if (isLoadingAuthors) {
    return <>Loading...</>
  }

  return (
    <AddBookFormContainer sx={{marginTop:'30px'}}>
      
      <IconButton onClick={() => navigate('/')} aria-label="Go Back" size="small" style={{ marginTop: '20px' }}>
        <ArrowBackIcon />
        Go Back
      </IconButton>
       <h3 style={{textAlign:'center',margin:'20px'}}>Create a new book </h3>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        size="small" 
      />
      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        size="small"
      />

      <Autocomplete
        options={authorOptions}
        getOptionLabel={(option) => `${option.name} ${option.surname}`}
        value={selectedAuthor}
        onChange={(event, newValue) => {
          setSelectedAuthor(newValue.value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Author" fullWidth margin="normal" />
        )}
      />

     
      <FormButtonsContainer >
        <span><input type="file" onChange={handleImageChange} style={{textAlign:'left'}}/></span>
      
        <Button variant="contained" color="primary" onClick={handleAddBook}>
          Add Book
        </Button>
      </FormButtonsContainer>

      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <MuiAlert onClose={() => setOpen(false)} severity={snackbarStatus} sx={{ width: "100%" }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </AddBookFormContainer>
  );
};


export default AddBookForm;
