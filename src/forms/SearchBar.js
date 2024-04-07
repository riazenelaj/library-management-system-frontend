import React, { useEffect, useState, useContext, memo } from "react";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import {BookCardContext} from "./../component/BookCardProvider";

const SearchBar = memo(() => {
  const { books, setBooks } = useContext(BookCardContext);

  console.log(books)

  const handleSearchInputChange = async (event) => {
    const searchQuery = event.target.value.toLowerCase();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/books/search?query=${searchQuery}`
      );
      const filteredBooks = response.data;
      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error searching books:", error);
      setBooks([]);
    }
  };

  return (
    <>
         <InputBase
      style={{
        color: '#fff',
        border: '0.5px solid gray',
        height: '35px',
        padding: '5px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
      }}
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
      startAdornment={ 
        <SearchIcon style={{ color: 'gray', marginRight: '5px' }} />
      }
      onChange={handleSearchInputChange}
    />
    </>
  );
});
export default SearchBar;
