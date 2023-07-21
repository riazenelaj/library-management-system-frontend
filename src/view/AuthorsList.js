import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Tooltip, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddAuthor from '../component/AddAuthor';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AuthorTable = () => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorsData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/authors');
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };
    fetchAuthorsData();
  }, []);

  const handleDelete = async (authorId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/authors/delete/${authorId}`);
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const handleEdit = () => {
 
  };

  const handleCreate=()=>{
    navigate('/authors/create')
  }

  return (
    <div readOnly>
         <IconButton onClick={() => navigate('/')} aria-label="Go Back" size="small" style={{ marginTop: '20px' }}>
        <ArrowBackIcon />
        Go Back
      </IconButton>
      <div className='authors-list'>
        <div className='list-title'>
          <h3>Authors</h3>
        </div>
        <div className='add-author'>
          <Fab color="primary" aria-label="add" onClick={handleCreate}>
            <AddIcon fontSize='small' />
          </Fab>
        </div>
      </div>
      <TableContainer style={{ width: '100%', maxHeight: '700px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='author-name'>Name</TableCell>
              <TableCell className='author-surname'>Surname</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.id}>
                <TableCell className='author-name'>{author.name}</TableCell>
                <TableCell className='author-surname'>{author.surname}</TableCell>
                <td className='btn'>
                
                  <p><Tooltip title="Delete">
                    <IconButton aria-label="delete" color="primary" onClick={() => handleDelete(author.id)}>
                      <DeleteIcon  />
                    </IconButton>
                  </Tooltip>
    
                  <span style={{ marginRight: '15px' }} />
                  <Tooltip title="Edit">
                    <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(author.id)}>
                      <EditNoteIcon />
                    </IconButton>
                  </Tooltip>
                  </p>
                </td>
                <Divider/>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AuthorTable;
