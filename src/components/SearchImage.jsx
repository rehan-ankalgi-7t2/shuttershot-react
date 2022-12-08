import React, { useState } from 'react'
import './searchimage.css'

const SearchImage = ({ setText }) => {
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setText(query)
    }

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={query} placeholder='Search for images...'/>
        <input type="submit" value="Search"/>
    </form>
  )
}

export default SearchImage