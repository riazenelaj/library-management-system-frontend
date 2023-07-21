import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './view/HomePage';
import BookDetails from './view/BookDetails';
import BookEditForm from './forms/BookEditForm';
import { BookCardProvider } from './component/BookCardProvider';
import { ReviewsProvider } from './component/ReviewsProvider';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthorsList from './view/AuthorsList';
import AddAuthor from './component/AddAuthor';
import AddBook from './component/AddBook';

function App() {
  return (
    <BookCardProvider>
      <ReviewsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/edit/:id" element={<BookEditForm />} />
            <Route path="/authors" element={<AuthorsList />} />
            <Route path="/authors/create" element={<AddAuthor />} />
            <Route path="/books/create" element={<AddBook />} />
          </Routes>
        </Router>
      </ReviewsProvider>
    </BookCardProvider>
  );
}

export default App;
