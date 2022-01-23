import {useState} from 'react';

import './styles/AddPage.css';
import MovieItem from './MovieItem'


function AddPage(props) {
  const [data, setData] = useState({
    title: '',
    img: '',
    content: ''
  });

  const add = async () => {
    const messageBox = document.getElementById('addTitle');
     messageBox.innerText = "Adding...";
    if(data.title.trim() === '' ||
       data.content.trim() === ''){

       messageBox.innerText = "Name and Description has to be filled";
       return;
       }

       try{
         await fetch("https://pr-movies.herokuapp.com/api/movies", {
           method: "POST",
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify(data)
         })
         messageBox.innerText = "Added succesfully";
       }
       catch(error){
         messageBox.innerText = "Server error";
         console.log(error);
       }

  }


  return (
    <div className='addContainer'>
      <div className="addBox">
          <div className="addForm">
            <h3 id='addTitle'>Add a new movie</h3>
            <input
              value={data.title}
              id='inputTitle'
              placeholder="Name"
              onChange={(event) =>{
                setData({title:event.target.value,
                         image: data.image,
                         content: data.content});
              }} />
              <input
                value={data.image}
                id='inputImage'
                placeholder="Image link"
                onChange={(event) =>{
                  setData({title: data.title,
                           image: event.target.value,
                           content: data.content});
                }} />
              <textarea
                  id='inputContent'
                  value={data.content}
                  placeholder="Description"
                  onChange={(event) =>{
                   setData({title: data.title,
                            image: data.image,
                            content: event.target.value});
                 }} ></textarea>

            <button onClick={add}>Add</button>
          </div>
              <div className="addPreview">
                <MovieItem data={data} />
              </div>
      </div>


    </div>

  );
}

export default AddPage;
