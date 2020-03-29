const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', loginUser);

function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById('usr').value;
  const psw = document.getElementById('psw').value;
  // console.log(email);

  fetch("http://192.168.0.104:3028/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      psw
    })
  }).then(res => res.json())
    .then(response => {
      console.log(response)
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('userId', response.userId);
      sessionStorage.setItem('firstName', response.firstName);
      window.location.replace(response.redirect);
    })
    .catch(err => console.log(err));
} 