import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookCardContext ,} from '../component/BookCardProvider';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import Reviews from '../component/Reviews';
import axios from 'axios';
import { Box, Button,Dialog,
  DialogTitle,
  DialogContent ,Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import BookEditForm from '../forms/BookEditForm';



function BookDetails() {
  const { id } = useParams();
  const { books, setBooks } = useContext(BookCardContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState(null);
  const [fullName, setFullName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [comment, setComment] = useState('');
  const [score, setScore] = useState(null);
  const navigate = useNavigate();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const selectedBook = books?.find((book) => book.id === id);
  const noReviewsAvailable = reviews.length === 0;
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarStatus, setSnackbarStatus] = useState('success'); 
  
  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/books/bookInfo/${id}`);
      setBookDetails(response.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/review/get/${id}`);
      if(response.status===200)
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchBookDetails();
      fetchReviews();
  }, [id]);
 

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/books/delete/${id}`);
      if (response.status === 200) {
        console.log("Book Deleted")
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
  
  const handleEdit = () => {
    setOpenEditDialog(true);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };
  
  const handleSubmitReview = async () => {
    try {
      const reviewData = {
        fullName,
        title: reviewTitle,
        comment,
        score: score,
        bookId: id,
      };
  
      const response = await axios.post('http://localhost:8080/api/v1/review/create', reviewData);
      if(response.status===201){
      fetchReviews();
      }
        // setReviews((prevReviews) => [response.data, ...prevReviews]);
        setIsSnackbarOpen(true);
        setSnackbarMessage('Review added successfully!');
        setSnackbarStatus("success");
        setFullName('');
        setReviewTitle('');
        setComment('');
        setScore(null);
    } catch (error) {
      console.error('Error adding review:', error);
    }
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

          <Box marginRight={20}  style={{width:'670px'}}>
           <div className='h2-r'> <h2>{selectedBook.title}</h2>  {bookDetails.rates !== 0 && <p>{bookDetails.rates}/5</p>}  </div> 
            <p> <i>{`${selectedBook.author.name} ${selectedBook.author.surname}`}  </i> </p>
            <hr />
            <p>{selectedBook.description}</p>
          </Box>
        </Box>
      </Container>

      <Container className="reviews" style={{display:'flex',justifyContent:'space-between'}}>
      <div style={{ width: '70%' }}>
        <h4>Reviews:</h4>
        {loading ? (
          <div>Loading reviews...</div>
        ) : noReviewsAvailable ? (
          <div> The book has no reviews ....</div>
        ) : (
          reviews.map((review) => <Reviews key={review.id} review={review} />)
        )}
      </div>
      <Container className="add-review" style={{textAlign:'left',width:'30%'}}>
        <h4>Add a Review:</h4>
        <FormControl component="fieldset">
          <FormLabel component="legend">Your Full Name:</FormLabel>
          <TextField
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <FormLabel component="legend">Review Title:</FormLabel>
          <TextField
            required
            rows={1}
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />

          <FormLabel component="legend">Your Comment:</FormLabel>
          <TextField
            required
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <FormLabel component="legend">Your Rating:</FormLabel>
           <Rating
          name="simple-controlled"
          value={score}
          onChange={(event, newValue) => {
            setScore(newValue);
          }}
        />


          <Button variant="contained" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </FormControl>
      </Container>
           
      </Container>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Book Details</DialogTitle>
        <DialogContent>
          <BookEditForm onClose={() => setOpenEditDialog(false)} />
        </DialogContent>
      </Dialog>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000} 
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  );
}

export default BookDetails;
