import {useState, useEffect} from 'react';
import MovieItem from './MovieItem'
import './styles/MainPage.css'
import { isExpired } from "react-jwt";

function MainPage(props) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const isLoggedIn = !isExpired(localStorage.getItem('token'));

  useEffect( () => {
    const fetchMovies = async () => {
           const res = await fetch("https://pr-movies.herokuapp.com/api/movies");
           const data = await res.json();
           const sortedData = data.filter((value, index, self) =>
             index === self.findIndex((t) => (
               t.image === value.image
               && t.title === value.title
               && t.content === value.content
             ))
           )
           sortedData.sort((a,b) => (a.title<b.title)?-1:1);
           setMovies(sortedData);
       }
       if(isLoggedIn)
        fetchMovies();
       else
        document.getElementsByClassName("movieBox")[0].style.justifyContent = 'center';
  }, [isLoggedIn])





  return (
    <div className="movieBox">
    {
      isLoggedIn?(
        <>
        <input placeholder="Search for a specific movie"
        value={search}
        onChange={(event) =>{
          setSearch(event.target.value);
        }} />
        <div className='MovieContainer'>
          {
            search===''?(
              movies.map((movie, key) => {
                if(movie.title)
                  return <MovieItem key={key} data={movie}/>
                return null;
              })
            )
            :
            (
              movies
              .filter((movie) => {
                if(movie.title)
                  return movie.title.toLowerCase().startsWith(search.toLowerCase())
                return false;
                })
              .map((movie, key) => {
                if(movie.title )
                  return <MovieItem key={key} data={movie}/>
                return null;
              })
            )
          }
        </div>
        </>
      )
      :
      (
        <div className="unLoggedContainer">
          <h2>Welcome to the Movies App</h2>
          <div className='unloggedOptions'>
            <div className='unloggedregister'>
              <h3>First time here?</h3>
              <p>In a few short steps you can create an account, which gives you access to hundreds of movie titles.</p>
              <p>To do that, please click 'Register' in the right top corner of the screen.</p>
            </div>
            <div className='unloggedlogin'>
              <h3>You already have an account?</h3>
              <p>Log in to obtain full access to hundreds of movie titles with an ability to add new ones.</p>
              <p>To do that, please click 'Log in' in the right top corner of the screen.</p>
            </div>
          </div>
        </div>
      )
    }
    </div>
  );
}

export default MainPage;
