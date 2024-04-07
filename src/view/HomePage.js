import React, { useContext, useState } from "react";
import BookCard from "../component/BookCard";
import { BookCardContext } from "../component/BookCardProvider";
import axios from "axios";
import SideNav from "../component/SideNav";
function HomePage() {
  const { books, setBooks } = useContext(BookCardContext);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="container">
      <SideNav />
      <div className="book-card-list">
        {searchResults.length > 0
          ? searchResults.map((book) => <BookCard key={book.id} book={book} />)
          : books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
}

export default HomePage;
