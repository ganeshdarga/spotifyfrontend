import React, { useEffect, useRef, useContext } from 'react'
import {   Route, Router, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
// import { albumsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Display = () => {

  const {albumsData} = useContext(PlayerContext)
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album")
  const albumId = isAlbum ? location.pathname.split('/').pop(): ""

  const bgColor = isAlbum? albumsData.find((x)=>(x.id == albumId)).bgColor: ""


  useEffect(()=>{
    if(isAlbum){
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
    }else{
      displayRef.current.style.background = `#121212`
    }
  })
  

return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 py-3 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Routes>
            <Route path='/spotifyfrontend' element={<DisplayHome></DisplayHome>}></Route>
            <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((x)=>(x.id == albumId))}></DisplayAlbum>}></Route>
        </Routes>
    </div>
  )
}

export default Display