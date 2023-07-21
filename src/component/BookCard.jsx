import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { HandymanOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  console.log(book)
  const { imageData, title, author, description,id } = book;
  const  navigate=useNavigate();
  console.log(id)
  const handleNavigate=(id)=>{

    navigate(`books/${id}`)
}
  const { name, surname } = author;
  return (
    <Paper elevation={4}>
      <Card  onClick={()=>{handleNavigate(id)}}
        sx={{
          display: "flex",
          width: 345,
          height: 270,
          backgroundColor: "#f0ffff",
        }
      }
      >
        <CardActionArea sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 180, height: 270 }}
            src={imageData}
            alt={title}
          />
          <CardContent sx={{ flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
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
