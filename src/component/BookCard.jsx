import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BookCard({ book }) {
  const { imageData, title, author, description, id } = book;
  const { name, surname } = author || {};
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`books/${id}`);
  };
  const imageSrc = imageData || 'https://bookcart.azurewebsites.net/Upload/Default_image.jpg';


  return (
    <Paper elevation={5}>
      <Card
        onClick={handleNavigate}
        sx={{
          display: 'flex',
          width: 345,
          height: 270,
          backgroundColor: '#f0ffff',
        }}
      >
        <CardActionArea sx={{ display: 'flex',justifyContent:'space-between' }}>
          <CardMedia component="img" sx={{ width: 180, height: 270 }} src={imageSrc} alt={title} />
          <CardContent sx={{ flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column',justifyContent:'space-between' }}>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${name} ${surname}`}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Paper>
  );
}

export default BookCard;
