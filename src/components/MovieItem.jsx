import './styles/MovieItem.css';


import {Link} from "react-router-dom";
function imgError(img){
  img.src = "notFound.png";
  return true;
}

function MovieItem(props) {

  const data = props.data;
  return (

    <div className='MovieItem'>
    <Link to={data.id?"/Details/"+data.id:"#"}>
        <div className='iconDiv'>
        {data.image && data.image.includes("http")?
          <img src={data.image} alt="" onError={({ currentTarget }) => imgError(currentTarget)} />
          :
          <img src='notFound.png' alt=""/>}
        </div>
        <p>
        {data.title}
        </p>
    </Link>
    </div>

  );
}

export default MovieItem;
