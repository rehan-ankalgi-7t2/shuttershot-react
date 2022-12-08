import React from 'react'
import './imagecard.css'

const ImageCard = ({ imageUrl, user, tags, downloadUrl }) => {

    const tagsArray = tags.split(',')

  return (
    <div className='image-card'>
        <img src={imageUrl} alt="" />
        <div className="image-card--info">
                <p>Photo by {user}</p>
                <div className="image-tags">
                    {tagsArray.map((tag, index) => (
                        <span key={index}>{`#${tag}`}</span>
                    ))}    
                </div>
            <button><a href={downloadUrl}  download={`${user}-${tagsArray[1]}`}>download</a></button>
        </div>
    </div>
  )
}

export default ImageCard