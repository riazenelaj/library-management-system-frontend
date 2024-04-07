import React, { useState, useEffect, useContext } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

const CreateBookForm = () => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [author, setAuthor] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState('success'); 
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
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
      authorId: author?.id,
    };

    axios
      .post("http://localhost:8080/api/v1/books/create", newBook)
      .then((response) => {
        console.log("Book created successfully:", response.data);
        setSnackbarStatus("success");
        setSnackbarMessage("Book created successfully!");
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error creating book:", error);
        setSnackbarStatus("error");
        setSnackbarMessage("Failed to create the book!");
        setOpen(true);
      });
  };

  return (
    <>
    <IconButton onClick={() => navigate('/')} aria-label="Go Back" size="small" style={{ marginTop: '20px' }}>
        <ArrowBackIcon />
        Go Back
      </IconButton>
    <Box sx={{ margin: '30px', display: 'grid', gap: '20px' }}>
    <h3 style={{ textAlign: 'center', margin: '20px' }}>Create a new book</h3>
    <div style={{display:'grid',textAlign:'center'}}><Box display="flex" alignItems="center"> 
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="small"
        sx={{ width: '200px' }} 
      />
      <input
        type="file"
        onChange={handleImageChange}
        style={{ textAlign: 'left', marginLeft: '20px' }}
      />
    </Box>
    <TextField
      id="outlined-multiline-static"
      label="Description"
      multiline
      rows={5}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      sx={{ width: '60vw' }}
      margin="normal"
      size="small"
    />
    <Autocomplete
      options={authors}
      getOptionLabel={(option) => `${option.name} ${option.surname}`}
      value={author}
      required
      style={{ width: '60vw' }}
      onChange={(event, newValue) => {
        setAuthor(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Author" fullWidth margin="normal" />
      )}
    />
</div>
      <Box sx={{ ml: '10px'}}>
        <Button variant="contained" color="primary" onClick={handleAddBook}>
          Add Book
        </Button>
      </Box>
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
  </>
  );
};

export default CreateBookForm;
