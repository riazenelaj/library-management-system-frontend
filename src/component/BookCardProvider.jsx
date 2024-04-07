import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const BookCardContext = createContext();

export const BookCardProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookCardContext.Provider value={{ books, setBooks, fetchBooks }}>
      {children}
    </BookCardContext.Provider>
  );
};
