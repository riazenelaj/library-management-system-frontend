import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookCardContext } from '../component/BookCardProvider';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import Reviews from '../component/Reviews';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tooltip from '@mui/material/Tooltip';

function BookDetails() {
  const { id } = useParams();
  const { books, setBooks } = useContext(BookCardContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState(null);

  const navigate = useNavigate();

  const selectedBook = books?.find((book) => book.id === id);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/review/get/${id}`);
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/books/bookInfo/${id}`);
        setBookDetails(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchReviews();
    fetchBookDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/books/delete/${id}`);
      if (response.status === 200) {
    
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!selectedBook || !bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <IconButton onClick={() => navigate('/')} aria-label="Go Back" size="small" style={{ marginTop: '20px' }}>
        <ArrowBackIcon />
        Go Back
      </IconButton>
      <Tooltip title="Delete">
        <Button aria-label="delete" onClick={handleDelete} style={{ float: 'right', marginTop: '20px', marginRight: '20px' }}>
          <DeleteIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Edit">
        <Button aria-label="edit" onClick={handleEdit} style={{ float: 'right', marginTop: '20px' }}>
          <EditNoteIcon />
        </Button>
      </Tooltip>
      <Container className="book">
        <Box display="flex" alignItems="center" gap={5} margin="20px">
          <img
            src={selectedBook.imageData}
            alt={selectedBook.title}
            style={{ width: 240, height: 360 }}
          />

          <Box marginRight={20}>
           <div className='h2-r'> <h2>{selectedBook.title}</h2>  {bookDetails.rates !== 0 && <p>{bookDetails.rates}/5</p>}  </div> 
            <p> <i>{`${selectedBook.author.name} ${selectedBook.author.surname}`}  </i> </p>
            <hr />
            <p>{selectedBook.description}</p>
          </Box>
        </Box>
      </Container>

      <Container className="reviews">
        <h2>Reviews:</h2>
        {loading ? <div>Loading reviews...</div> : reviews.map((review) => <Reviews key={review.id} review={review} />)}
      </Container>
    </div>
  );
}

export default BookDetails;
