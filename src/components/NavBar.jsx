import {Link} from "react-router-dom";
import {isExpired, decodeToken} from "react-jwt";
import {useState} from 'react';
import './styles/NavBar.css'


function NavBar(props) {
  const [user, setUser] = useState(decodeToken(localStorage.getItem('token')));
  const [isLoggedIn, setLoggedIn] = useState(!isExpired(localStorage.getItem('token')));

  const logout = async () => {
    const data = {};
    data.userId = user.userId;
    try{
      await fetch("https://pr-movies.herokuapp.com/api/user/logout/"+data.userId, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      localStorage.setItem('token', '');
      setLoggedIn(false);
      setUser(null);
      window.location.replace('/');
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <div className='container'>
        <div className='title'>
          <img src="/favicon.png" alt=''/>
          <h2>Movies app</h2>
        </div>
        <div className='links'>
          <Link to="/">Home page</Link>
          {
            isLoggedIn?(
              <>
              <Link to="/add">Add</Link>
              <a onClick={() => logout()} >Log out</a>
              </>
            ):(
              <>
              <Link to="/signin">Log in</Link>
              <Link to="/signup">Register</Link>
              </>
            )
          }
        </div>
      </div>
      <div style={{height: '10vh'}}></div>
    </>
  );
}

export default NavBar;
