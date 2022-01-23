import './styles/RegisterPage.css';

function LoginPage(props) {

  const login = async () => {
    const data = {};
    data.login = document.getElementById("inputName").value;
    data.password = document.getElementById("inputPass").value;

    const messageBox = document.getElementById('loginBox');
     messageBox.innerText = "Logging in...";
    if(data.login.trim() === '' ||
       data.password.trim() === ''){

       messageBox.innerText = "Please fill every box";
       return;
       }

       try{
         const res = await fetch("https://pr-movies.herokuapp.com/api/user/auth", {
           method: "POST",
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify(data)
         })
         const resData = await res.json();
         localStorage.setItem('token', resData.token);
         window.location.replace('/');
       }
       catch(error){
         messageBox.innerText = "Server error";
         console.log(error);
       }

  }

  return (
    <div className='registerContainer'>
      <div className="registerBox">
        <h3 id='loginBox'>Log in</h3>
        <input id='inputName' placeholder="Name" />
        <input id='inputPass' type="password" placeholder="Password" />
        <button onClick={() => login()}>Log in</button>
      </div>
    </div>

  );
}

export default LoginPage;
