
import React, { useContext,useEffect } from "react";
import SideNav from "../component/SideNav";
import BookCard from "../component/BookCard";
import { BookCardContext } from '../component/BookCardProvider';
import axios from 'axios';
import AddBook from "../component/AddBook";

function HomePage() {
  const { books, setBooks } = useContext(BookCardContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);
  
  return (
    <div className="container">
      <SideNav />
      <div className="book-card-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
        {/* <AddBook/> */}
      </div>
    </div>
  );
}

export default HomePage;
