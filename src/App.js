import {React, useState } from 'react'
import './App.css';
import ImageCard from './components/ImageCard';
import SearchImage from './components/SearchImage';

function App() {
  const [images, setImages] = useState([])
  const [searchQuery, setSearchQuery] = useState('')


  fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchQuery}`)
  .then(res => res.json())
  .then(data => setImages(data.hits))

  return (
    <div className="App">
      <SearchImage setText={(text) => setSearchQuery(text)}/>
      <div className='container'>
        {images.map(image => (
          <ImageCard key={image.id} imageUrl={image.webformatURL} user={image.user} tags={image.tags} downloadUrl={image.largeImageURL}/>
        ))}
      </div>
    </div>
  )
}

export default App;
