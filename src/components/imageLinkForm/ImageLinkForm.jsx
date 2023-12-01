import React, { useContext, useEffect, useState } from 'react'
import './imagelinkform.css'
import { Context } from '../ContextProvider'

const ImageWithBox = ({ imageUrl, coordinates }) => {

  return (
    <div className='center ma'>
    <div className='absolute mt2'>
      <img className='face-img' src={imageUrl} alt="Image with Box" />
      <div className='bounding-box' style={{
          top: coordinates.topRow, 
          left: coordinates.leftCol, 
          bottom: coordinates.bottomRow, 
          right: coordinates.rightCol
        }}></div>
    </div>
    </div>
  );
};

const ImageLinkForm = () => {

  const [image, setImage] = useState('')
  const [detectImg, setDetectImg] = useState(false)
  const [coordinates, setCoordinates] = useState({
    topRow: 0,
    leftCol: 0,
    bottomRow: 0,
    rightCol: 0
  })
  const [session , setSession] = useContext(Context)

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": session.USER_ID,
        "app_id": session.APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": image
                }
            }
        }
    ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + session.PAT
    },
    body: raw
};

  const updateImage = (e) => {
    setDetectImg(false)
    setImage(e.target.value)
  }

  const detect = () => {
    if(image === '') {
      return alert('Paste an image url to detect!')
    }
    fetch(`${session.API_URL}`, requestOptions)
    .then(response => response.json())
    .then(results => {
      setDetectImg(true)
      let boundingBox = results.outputs[0].data.regions[0].region_info.bounding_box
      setCoordinates({
        topRow: boundingBox.top_row * 400,
        leftCol: boundingBox.left_col * 550,
        bottomRow: 400 - (boundingBox.bottom_row * 400),
        rightCol: 550 - (boundingBox.right_col * 550)
      })
      fetch(`${session.SERVER_URL}/entry`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email
        })
      })
      .then(response => response.json())
      .then(results => {
        setSession({
          ...session,
          user: results.user
        })
      })
    })
  }

  useEffect(() => {
    console.log(coordinates)
  }, [coordinates])

  return (
    <div>
        <p className='f3'>
            This brain detects faces in pictures. Try it out!
        </p>
        <div className='center'>
            <div className='center form pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type="text" onChange={(e) => updateImage(e)}/>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={detect}>Detect</button>
            </div>
        </div>
        {
          detectImg ? (
            <ImageWithBox imageUrl={image} coordinates={coordinates} />
          ) : (null)
        }
        
    </div>
  )
}

export default ImageLinkForm