// const mongoose = require('mongoose')
// const uri = "mongodb+srv://Kiwi28:kiwiPsw@clusterno1-u93k2.mongodb.net/test?retryWrites=true&w=majority"
// const client = new MongoClient(uri, { useNewUriParser: true });
// const User = mongoose.model('user', userSchema);

//------------------form completion requirments------
var password = document.getElementById("psw")
var confirm_password = document.getElementById("confirmPsw");

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


//-------------------fetch the DB ?- ish---------------
registerBtn.addEventListener('click', registerUser);

function registerUser(e) {
  e.preventDefault();
  // console.log('test');
  const fName = document.getElementById('firstName').value;
  const lName = document.getElementById('lastName').value;
  const psw = document.getElementById('psw').value;
  const email = document.getElementById('email').value;

  fetch("http://192.168.0.104:3028/api/user/register", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName: fName,
      lastName: lName,
      psw,
      email
    })
  })
    .then(res => res.json())
    .then(res => {
      window.location.replace(res.redirect);
      console.log(res)
    })
    .catch(err => console.log(err));
}


// function test() {
//   let email = document.getElementById('email');
//   console.log('email ', email.value);
// }