import { useState } from "react";
import "./index.css";

import getSpotifyToken from './getSpotifyTolken';
import Card from './components/Card';

const baseURL = (pesquisa) => `https://api.spotify.com/v1/search?q=${pesquisa}&type=track&limit=10`;

function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [tracks, setTracks] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!pesquisa) return;

    const token = await getSpotifyToken();

    const response = await fetch(baseURL(pesquisa), {
      headers: {
        'Authorization': token
      }
    });

    const {tracks} = await response.json();

    setTracks(tracks.items);

  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </form>
      {tracks.map((track) => (
        <Card track={track}/>
      ))}
    </div>
  );
}

export default App;
