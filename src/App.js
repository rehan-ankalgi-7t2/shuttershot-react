import {React, useEffect, useRef, useState } from 'react'
import './App.css';
import ImageCard from './components/ImageCard';
import SearchImage from './components/SearchImage';
import Header from './components/Header';

function App() {
  const [images, setImages] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const app = useRef()
  const scrollContainer = useRef()

  useEffect(() => {
    document.body.style.height = `${scrollContainer.current.getBoundingClientRect().height}px`
  },[window.innerHeight])

  useEffect(() => {
    requestAnimationFrame(() => skewScrolling())
  },[])

  const skewConfig = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0
  }

  const skewScrolling = () => {
    skewConfig.current = window.scrollY
    skewConfig.previous += (skewConfig.current - skewConfig.previous) * skewConfig.ease
    skewConfig.rounded = Math.round(skewConfig.previous * 100) / 100

    // variables for accelaration, difference and velocity
    const difference = skewConfig.current - skewConfig.rounded
    const accelaration = difference / window.innerHeight
    const velocity = +accelaration
    const skew = velocity * 9.5

    scrollContainer.current.style.transform = `translateY(-${skewConfig.rounded}px) skewY(${skew}deg)`

    requestAnimationFrame(() => skewScrolling())
  }


  fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchQuery}`)
  .then(res => res.json())
  .then(data => setImages(data.hits))

  return (
    <div ref={app} className="App">
      <div  ref={scrollContainer} className='scroll-container'>
        <Header/>
        <SearchImage setText={(text) => setSearchQuery(text)}/>
        <div className='container'>
          {images.map(image => (
            <ImageCard key={image.id} imageUrl={image.webformatURL} user={image.user} tags={image.tags} downloadUrl={image.largeImageURL}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;
