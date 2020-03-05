//redirect user to login page if not logged with admin account
if (sessionStorage.getItem('userId') != '5e590a557295d122601671ce') {
  window.location.replace('./login.html');
}
const submitBtn = document.getElementById("submitBtn");
const clearForm = document.getElementById('clearForm');

submitBtn.addEventListener('click', addProduct);
clearForm.addEventListener('click', clearFields)

//---------form data to server, to create a new item in DB
function addProduct(e) {
  e.preventDefault();

  const brand = document.getElementById('brand').value;
  const model = document.getElementById('model').value;
  const cpu = document.getElementById('cpu').value;
  const ram = document.getElementById('ram').value;
  const camera = document.getElementById('camera').value;
  const size = document.getElementById('size').value;
  const image = document.getElementById('image').value;
  const price = document.getElementById('price').value;

  fetch("http://localhost:3028/api/user/admin", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem('token')
    },
    body: JSON.stringify({
      brand,
      model,
      cpu,
      ram,
      camera,
      size,
      image,
      price
    })
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

//-------clear form button
function clearFields() {
  let form = document.getElementById('addProductForm');
  form.reset();
}