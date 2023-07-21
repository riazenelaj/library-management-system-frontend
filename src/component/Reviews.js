import React from 'react';
import { Box, Card, Container, Divider, Rating } from '@mui/material';

function Reviews({ review }) {
  
  return (
     <div class="card">
        <div class="card-header">
            <div className='header-title'><b>{review.title}</b><br/>{review.creationDate}</div>
            <div className='header-date'>{review.fullName} <br/><Rating name="read-only" sx={{ color: 'purple' ,fontSize: '18px' }} value={review.score} readOnly /></div>
        </div>
        <div class="card-body">
            <p>{review.comment}</p>
        </div>
     </div>
    );
}

export default Reviews;
