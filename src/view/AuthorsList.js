import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, IconButton, Dialog,
  DialogTitle,
  DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddAuthor from '../forms/AddAuthor';
import AuthorEditForm from '../forms/AuthorEditForm';
import { useParams } from 'react-router-dom';

const AuthorsList = () => {
  const { id } = useParams();
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState('success'); 
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editAuthorId, setEditAuthorId] = useState(null);
  
  useEffect(() => {
    const fetchAuthorsData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/authors');
        setAuthors(response.data);
        setFilteredAuthors(response.data); 
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };
    fetchAuthorsData();
  }, []);

  const handleDelete = async (authorId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/authors/delete/${authorId}`);
      setSnackbarStatus('success');
      setSnackbarMessage('Author deleted successfully!');
      setOpen(true);
      setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== authorId));
    } catch (error) {
      console.error('Error deleting author:', error);
      setSnackbarStatus('error');
      setSnackbarMessage('Failed to delete the author!');
      setOpen(true);
    }
  };

  const handleEdit = (authorId) => {
    setEditAuthorId(authorId);
    setOpenDialog(true);
  };
  const handleCreate = () => {
    setOpenDialog(true); 
  };
 
  const handleCloseDialog = (newAuthor) => {
    setOpenDialog(false); 
    setAuthors([newAuthor, ...authors]);
  };

  const handleSearchInputChange = async (event) => {
    const searchValue = event.target.value.toLowerCase();
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/authors/search?query=${searchValue}`);
      const filteredAuthors = response.data;
      console.log(filteredAuthors);
      setFilteredAuthors(filteredAuthors);
    } catch (error) {
      console.error('Error searching authors:', error);
      setFilteredAuthors([]);
    }
  };
  

  return (
    <div readOnly>
      <div style={{display:'flex',justifyContent:'space-between',margin:'10px'}}>
      <IconButton onClick={() => navigate('/')} aria-label="Go Back" size="small" style={{ marginTop: '20px' }}>
        <ArrowBackIcon />
        Go Back
      </IconButton>
      <InputBase
      style={{
        color: 'black',
        border: '0.5px solid gray',
        height: '27px',
        padding: '5px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        marginTop:'25px'
      }}
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
      startAdornment={ 
        <SearchIcon style={{ color: 'gray', marginRight: '5px',paddingRigt:'40px' }} />
      }
      handleSearchInputChange
      onChange={handleSearchInputChange}
    />
        </div>
     
      <div className='authors-list'style={{fontFamily:'fantasy',marginRight:'50px',color:'#126fc7'}}>
          <h3>List Of Authors</h3> 
      </div>
  
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
        {editAuthorId ? (
          <>
            <DialogTitle>Edit Author</DialogTitle>
            <DialogContent>
              <AuthorEditForm
                author={authors.find((author) => author.id === editAuthorId)}
                onClose={(editedAuthor) => {
                  setAuthors((prevAuthors) =>
                    prevAuthors.map((author) =>
                      author.id === editAuthorId ? { ...editedAuthor, id: author.id } : author
                    )
                  );
                  setOpenDialog(false);
                }}
              />
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle>Create Author</DialogTitle>
            <DialogContent>
              <AddAuthor onClose={handleCloseDialog} />
            </DialogContent>
          </>
        )}
      </Dialog>
      <TableContainer style={{ maxHeight: '500px', width: '90%', margin: '0 auto', marginRight: '50px', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='author-name' style={{paddingLeft:'50px',textAlign:'left',fontFamily:'cursive'}}><h6><b>Name</b></h6></TableCell>
              <TableCell className='author-surname'style={{paddingRight:'90px',textAlign:'center',fontFamily:'cursive'}}><h6><b>Surname</b></h6></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAuthors.map((author) => (
              <TableRow key={author.id} >
                <TableCell className='author-name' style={{textAlign:'left',fontFamily:'cursive',paddingLeft:'50px',fontSize:'15px'}}>{author.name}</TableCell>
                <TableCell className='author-surname' style={{paddingRight:'90px',textAlign:'center',fontFamily:'cursive',fontSize:'15px'}}>{author.surname}</TableCell>
                <TableCell className='btn' style={{textAlign:'right'}}>
                  <p>
                  <Tooltip title="Delete">
                    <IconButton aria-label="delete" color="primary" onClick={() => handleDelete(author.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>

                    <span style={{ marginRight: '15px' }} />
                    <Tooltip title="Edit">
                    <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(author.id)}>
                      <EditNoteIcon />
                    </IconButton>
                  </Tooltip>

                  </p>
                </TableCell>
            
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
          <Fab color="primary" aria-label="add" onClick={handleCreate}  style={{ position: 'absolute', bottom: '20px', right: '20px', paddingRigt:'40px',zIndex: 1 }}>
            <AddIcon fontSize='small' />
          </Fab>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert onClose={() => setOpen(false)} severity={snackbarStatus} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AuthorsList;
