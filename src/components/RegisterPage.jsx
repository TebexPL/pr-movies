import './styles/RegisterPage.css';

const validateEmail = (email) =>{
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function RegisterPage(props) {

  const register = async () => {
    const data = {};
    const messageBox = document.getElementById('registerTitle');
    data.name = document.getElementById("inputName").value;
    data.email = document.getElementById("inputEmail").value;
    data.password = document.getElementById("inputPass").value;

    messageBox.innerText="Registering...";

    if(data.name.trim() === '' ||
       data.email.trim() === '' ||
       data.password.trim() === ''){

       messageBox.innerText = "Please fill every box";
       return;
       }

    if(!validateEmail(data.email)){
      messageBox.innerText = "E-mail is not valid";
      return;
    }

    if(data.password.length < 8){
      messageBox.innerText = "Password is too short";
      return;
    }


     try{
       const res = await fetch("https://pr-movies.herokuapp.com/api/user/create", {
         method: "POST",
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(data)
       });
       const resData = await res.json();
       console.log(resData);


         messageBox.innerText = "Registered succesfully";

     }
     catch(error){
       messageBox.innerText = "Server error";
       console.log(error.response);
     }




  }

  return (
    <div className='registerContainer'>
      <div className="registerBox">
        <h3 id='registerTitle'>Sign up</h3>
        <input id='inputName' placeholder="Name" />
        <input id='inputEmail' placeholder="E-mail" />
        <input id='inputPass' type="password" placeholder="Password" />
        <button onClick={register}>Register</button>
      </div>
    </div>

  );
}

export default RegisterPage;
