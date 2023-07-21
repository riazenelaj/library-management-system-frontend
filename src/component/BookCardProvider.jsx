import React, { createContext, useState } from 'react';

export const BookCardContext = createContext();

export const BookCardProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  return (
    <BookCardContext.Provider value={{ books, setBooks }}>
      {children}
    </BookCardContext.Provider>
  );
};
