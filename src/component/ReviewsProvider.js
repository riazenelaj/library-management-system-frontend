import React, { createContext, useState, useEffect } from 'react';

export const ReviewContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews,setReviews]=useState(null)

  return (
    <ReviewContext.Provider value={{ reviews }}>
      {children}
    </ReviewContext.Provider>
  );
};
