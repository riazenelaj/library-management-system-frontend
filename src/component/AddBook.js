import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
  const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBook = {
      title: title,
      description: description,
      imageData: imageBase64,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/books/create', newBook);
      console.log('Book created:', response.data);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <button type="submit" onClick={handleSubmit}>Create Book</button>
    </form>
  );
}

export default AddBook;
