## Song Gaver song. Winc task

# Location in Mac:
/Users/carlosinfante/Desktop/coding-projects/winc-academy/frontend-course/MODULE9 - DEBUGGING and DOMAIN MODELING/REVIEW/react-hooks/useState/songsaver-useState

# Location in GitHub:
https://github.com/carloscfgos1980/React-useState-SongGaver-WincTask

# Goals:

- Use Icons
- Use Router (old version @5)
- OnSubmit event
- Form (input field, select)
- Sort alphabetical
- cool style by using hoover

# Start the app
npx json-server --watch data/db.json --port 8000
npm start

# Steps:


1.3 Input.js. Create React variable to catch the value in the form
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('select');
    const [rating, setRating] = useState('select');

1.4 Create a function to handle all the submitted data. Use e.preventDefault() so it wont update itself
    const handleSubmit = (e) => {
        e.preventDefault();
        addSongs(title, artist, genre, rating); // callback function and passing the data

        setTitle(''); //reset all the initial values
        setArtist('');
        setGenre('select');
        setRating('select');
    }

1.5 Implement the form. Attaching onSubmit on the form instead on the button
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

2. Display the data on the DOM and delete 


2.3 SonList.js. Sort the array of songs alphabetical:
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

2.4 Display the data DOM. 
2.4.1 Create a Ul list and a list with the label of the data:
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
2.4.2. Loop thru the data (song) in order to display the data in <ul> and <li>
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
2.4.3 Attach onClick event to the delete button. I use Icon which is explained bellow.
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