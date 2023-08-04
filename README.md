## Song Gaver song using API. Winc task

# Location in Mac:
/Users/carlosinfante/Desktop/coding-projects/winc-academy/frontend-course/MODULE9 - DEBUGGING and DOMAIN MODELING/REVIEW/react-hooks/useState nd useEffect/songsaver-useEffect

# Location in GitHub:
https://github.com/carloscfgos1980/React-useEffect-SongGaver-Winc

* I needed to make some changes in package.json because the app was outdated!

# Goals:
- UseEffect (explanation in NetNinja blog)
- custom hook(useFetch. explanation in NetNinja blog)
- NavBar (explanation in NetNinja blog)
- Use Router (old version @5. explanation in NetNinja blog)
- OnSubmit event
- Form (input field, select)
- Sort alphabetical
- Use Icons
- cool style by using hoover

# Start the app
npx json-server --watch data/db.json --port 8000
npm start

# Steps:
1. Create a custom hook (useFetch)
import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetch(url)
            .then(res => {
                if (!res.ok) { // error coming back from server
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                // auto catches network / connection error
                setIsPending(false);
                setError(err.message);
            })
    }, [url])

    return { data, isPending, error };
}

export default useFetch;

2. Input.js. Create the form and POST request
2.1 Input.js. Create React variable to catch the value in the form
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('select');
    const [rating, setRating] = useState('select');

2.2 Input.js. Create a function to send a POST request the submitted data. Use e.preventDefault() so it wont update itself
    const handleSubmit = (e) => {
        e.preventDefault();
        const favorite = { title, artist, genre, rating };

        setIsPending(true);

        fetch('http://localhost:8000/songs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(favorite)
        }).then(() => {
            console.log('new song-artist added');
            setIsPending(false);
            window.location.reload(true) // refresh the page and update the DOM
        });
* I was updating sucessfully the database but the DOM didn't update. I use this function inside <HandleSubmit> to fix this. This is not an issue with Redux Toolkit which is the framework I use:
window.location.reload(true).

2.3 Input.js. Implement the form. Attaching onSubmit on the form instead on the button
            <form onSubmit={handleSubmit}>
                <label>artist:</label>
                <input
                    type="text"
                    required
                    name="artist"
                    placeholder="artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                />
                <label>title:</label>
                <input
                    type="text"
                    required
                    name="title"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>genre:</label>
                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    name="genre"
                >   <option value="select">-select-</option>
                    <option value="Reggae">Reggae</option>
                    <option value="RockRoll">RockRoll</option>
                    <option value="jazz">Jazz</option>
                    <option value="Cuban alternative">Cuban alternative</option>
                </select>
                <label>rating:</label>
                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    name="rating"
                >   <option value="select">-select-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button>Add Song</button>
            </form>

3. Display the data on the DOM and delete 
3.1 Home.js. Import custom hook:
import useFetch from "./components/useFetch";

3.2 Home.js. Get the data by incoking the custom hook (useFetch)
    const { data: songs, isPending, error } = useFetch("http://localhost:8000/songs");

3.3 Home.js. Pass the data to SongList component:
            {songs && <SongList songs={songs} />}

3.4 SongList.js. Set the values as a parameter:
const SongList = ({ songs }) => {

3.5 SonList.js. Sort the array of songs alphabetical:
    songs.sort((a, b) => {
        let a1 = a.artist.toLowerCase(),
            a2 = b.artist.toLowerCase();

        if (a1 < a2) {
            return -1;
        }
        if (a1 > a2) {
            return 1;
        }
        return 0;
    });

3.6 SongList.js. Create a function(handleDelete) that will send a DELETE request
    const handleDelete = (id) => {
        console.log("id", id);
        fetch('http://localhost:8000/songs/' + id, {
            method: 'DELETE'
        })
            .then(() => {
                console.log('deleted');
                window.location.reload(true)
            });
    }
* Like i' did with POST request. I return a function that refresh the page and then I get all the data updateed shown in the DOM:
window.location.reload(true)

3.7 Display the data DOM. 
3.7.1 Create a Ul list and a list with the label of the data:
    return (
        <div className="song-list">
            <div className="up-line">
                <ul>
                    <li>Artist:</li>
                    <li>Title:</li>
                    <li>Genre:</li>
                    <li>Rating:</li>
                    <li></li>
                </ul>
            </div>
3.7.2. Loop thru the data (song) in order to display the data in <ul> and <li>
            {songs.map(song => (
                <div className="song-preview" key={song.id} >
                    <ul>
                        <li >{song.artist}</li>
                        <li>{song.title}</li>
                        <li >{song.genre}</li>
                        <li >{song.rating}</li>
                        <li><button className="button-list" onClick={() => handleDelete(song.id)} ><FaTrash /></button></li>
                    </ul>
                </div>
            ))}
        </div>
    );
3.7.3 Attach onClick event to the delete button. I use Icon which is explained bellow.
<li><button className="button-list" onClick={() => handleDelete(song.id)} ><FaTrash /

3. tutorial for icons:
https://www.youtube.com/watch?v=aor9hlcODUE&t=226s

3.1 Search in google:
https://react-icons.github.io/react-icons/

3.2 - Install the extention for icons In the terminal:
npm install react-icons --save

3.3 - import Icons to the file we are going to use(SongList.js). Ex:
import { FaTrash } from "react-icons/fa";

Type the name of the icon in the place where we would type the name of the button, like this:
button className="button-list" onClick={() => handleDelete(song.id)} ><FaTrash /></button

3.4 -Style the button in app.css

4. Cool css for hover over the list of element displayed
.song-preview:hover {
  margin: auto 0;
  box-shadow: 1px 3px 5px rgba(0,0,0,0.1);

  ## The end