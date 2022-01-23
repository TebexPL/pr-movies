import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import "./styles/DetailsPage.css";


function DetailsPage(props) {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  useEffect( () => {
    const fetchMovie = async () => {
           const res = await fetch("https://pr-movies.herokuapp.com/api/movies/"+id);
           const data = await res.json();
           setMovie(data);
           if(data.image)
            document.getElementById('detailsbox').style.backgroundImage = "url("+data.image+")";
       }
       fetchMovie();

  }, [id])

  return (
    <div id="detailsbox" className='DetailsContainer'>
      <div className="detailsBox">
        <div className="detailsContent">
        <h1>{movie.title?movie.title:"404"}</h1>
        <h3>{movie.content?movie.content:"This movie doesn't exist"}</h3>
        </div>
      </div>
    </div>

  );
}

export default DetailsPage;
