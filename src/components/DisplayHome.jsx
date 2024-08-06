import React,{useContext} from 'react'
import Navbar from './Navbar'
// import { albumsData, songsData } from '../assets/assets'
import Albums from './Albums'
import SongItem from './SongItem'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {
  const {songsData,albumsData} = useContext(PlayerContext)
  return (
    <>
    <Navbar></Navbar>
    <div className='mb-4'>
      <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
      <div className='flex overflow-auto'>
        {albumsData.map((item,index)=>(<Albums key={index} name={item.name} desc={item.desc} image={item.image} id={item.id}></Albums>))}
      </div>
    </div>

    <div className='mb-4'>
      <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
      <div className='flex overflow-auto'>
        {songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}></SongItem>))}
      </div>
    </div>
    </>
  )
}

export default DisplayHome