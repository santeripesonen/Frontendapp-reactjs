import './App.css';
import { useState, useEffect } from 'react';
import Song from './components/Song';

function App() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("")
  const [songInfo, setSongInfo] = useState({
    title: "", artist: "", songLength: 0
  })

  const saveNewSong = async () => {
    const response = await fetch(`https://music-api-z6d5.onrender.com/api/add/`, {
      headers: { "Content-Type": "application/json" },
      method: "POST", body: JSON.stringify({
        title: songInfo.title,
        artist: songInfo.artist,
        songLength: Number(songInfo.songLength)
      })
    })
    getFilteredSongs()
  }

  const getFilteredSongs = async (filter) => {
    let url = `https://music-api-z6d5.onrender.com/api/getall`
    if (filter) {
      url = `https://music-api-z6d5.onrender.com/api/filtered/${filter.toLowerCase()}`
    }
    const response = await fetch(url)
    const json = await response.json()
    setSongs(json)
  }

  useEffect(() => {
    getFilteredSongs(search)
  }, [search])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSongInfo = (value, field) => {
    setSongInfo({
      ...songInfo, [field]: value
    })
  }


  return (
    <div className="App">
      <div className="layout-container">
        <h1>Music Api</h1>
        <div>
          <h2> Add song</h2>
          <input value={songInfo.title} onChange={(e) => handleSongInfo(e.target.value, "title")}
            placeholder='title' />
          <input value={songInfo.artist} onChange={(e) => handleSongInfo(e.target.value, "artist")}
            placeholder='artist' />
          <input value={songInfo.songLength} onChange={(e) => handleSongInfo(e.target.value, "songLength")} type='number' placeholder='length' />
          <button className='btn edit' onClick={() => { saveNewSong() }}>Save</button>
        </div>
        <input className="search-bar" placeholder='Search songs by title or artist' onChange={handleSearch} value={search} />
        {songs.length > 0 && (
          <div className='songs-container'>{
            songs.map(song => {
              return <Song song={song} updateList={getFilteredSongs} />
            })
          }</div>
        )}
      </div>
    </div>
  );
}

export default App;


// https://music-api-z6d5.onrender.com

// title, artist, songLength