import React from "react";
import { TextField,Box, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";

function AddAuthor(){
   const navigate=useNavigate();
    return(
        <div>
            <IconButton onClick={() => navigate('/')} aria-label="Go Back" size="small" style={{ marginTop: '20px' }}>
        <ArrowBackIcon />
        Go Back
      </IconButton>
            <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <h3>Create Author</h3>
        <TextField id="outlined-basic" label="Name" variant="outlined"  className="name_input" />
        <TextField id="outlined-basic" label="Surname" variant="outlined" />
        <Button  variant="contained" color="success"> Submit</Button>
      </Box>
      </div>
    )
}
export default AddAuthor;