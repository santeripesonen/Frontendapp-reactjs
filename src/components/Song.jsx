import { useState, useEffect } from 'react';

const Song = ({ song, updateList }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editState, setEditState] = useState({
    ...song
  })

  const handleEditState = (value, state) => {
    setEditState({ ...editState, [state]: value })
  }

  // https://music-api-z6d5.onrender.com/api/delete/644e9c6a2b64903c294be757

  const deleteSong = async () => {
    const response = await fetch(`https://music-api-z6d5.onrender.com/api/delete/${song._id}`, { method: "DELETE" })
    updateList()
  }

  const saveChanges = async () => {
    console.log("saving changes")
    const response = await fetch(`https://music-api-z6d5.onrender.com/api/update/${song._id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT", body: JSON.stringify({
        title: editState.title,
        artist: editState.artist,
        songLength: Number(editState.songLength)
      })
    })

    const json = await response.json()
    updateList()
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className='song-container-edit'>
        <input className="title" value={editState.title} onChange={(e) => {
          handleEditState(e.target.value, "title")
        }} />
        <input className='artist' value={editState.artist} onChange={(e) => {
          handleEditState(e.target.value, "artist")
        }} />
        <input className="songLength" type="number" value={editState.songLength} onChange={(e) => {
          handleEditState(e.target.value, "songLength")
        }} />
        <button className='btn edit' onClick={() => { saveChanges() }}>save</button>
        <button className='btn delete' onClick={() => { setIsEditing(false) }}>cancel</button>
        <button className='btn clear' onClick={() => {
          setEditState({
            title: "",
            artist: "",
            songLength: 0
          })
        }}>clear</button>
      </div>
    )
  }
  return (
    <div className='song-container'>
      <p className='title'>{song.title}</p>
      <p className='artist'>{song.artist}</p>
      <p className='songLength'>{song.songLength}</p>
      <button className='btn edit' onClick={() => { setIsEditing(true) }}>edit</button>
      <button className='btn delete' onClick={() => { deleteSong() }}>delete</button>
    </div>
  )
}

export default Song