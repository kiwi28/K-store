if (!sessionStorage.getItem('token')) {
  window.location.replace('./login.html');
}

// const greet = document.getElementById('greet');//unused
const phoneName = document.getElementById('phoneName');
const signOutBtn = document.getElementById('signOutBtn');
const homeBtn = document.getElementById('homeBtn');

signOutBtn.addEventListener('click', signOut);
homeBtn.addEventListener('click', returnHome);

// greet.innerText = `Bună ${sessionStorage.getItem('firstName')}!`;//unused

//---get product id from url
function getUrlVars() {
  let vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}
var productId = getUrlVars()['id'];

// console.log(id)//
fetch("http://localhost:3028/api/user/product", {
    method: 'POST',
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + sessionStorage.getItem('token')
  },
    body: JSON.stringify({
      id: productId
    })
  })
    .then(res => res.json())
    .then(r => {
      phoneName.innerText = r.brand + ' ' + r.model;
      renderCard(r);
    })
    .catch(err => console.log(err));

    //actualizeaza datele din tabel si imaginea specifice modelului de telefon selectat;
function renderCard (phone) {
  var imgContainer = document.getElementById('imgContainer');
  const addBtn = document.createElement('button');
  addBtn.innerText = 'Adaugă în coș';
  addBtn.setAttribute('id', phone._id);
  imgContainer.appendChild(addBtn);

  const imageImg = document.getElementById('imageImg');
  imageImg.src = phone.image;

  const price = document.getElementById('priceH3');
  price.innerText = `Preț: ${phone.price} RON`;

  const tdBrand = document.getElementById('tdBrand');  
  const tdModel = document.getElementById('tdModel');
  const tdRam = document.getElementById('tdRam');
  const tdCpu = document.getElementById('tdCpu');  
  const tdSize = document.getElementById('tdSize');
  const tdCamera = document.getElementById('tdCamera');

  tdBrand.innerText = phone.brand;
  tdModel.innerText = phone.model;
  tdRam.innerText = phone.ram;
  tdCpu.innerText = phone.cpu;
  tdCamera.innerText = phone.camera;
  tdSize.innerText = phone.size;
//send user id and item id to server so it can add that item in user's cart
  addBtn.addEventListener('click', event => {
    fetch("http://localhost:3028/api/user/cart", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        userId: sessionStorage.getItem('userId'),
        productId: event.target.id
      })
    })
      .then(response => response.json())
      .then(r => console.log(r))
      .catch(err => console.log(err))
  })
}

//logout user
function signOut() {
  sessionStorage.removeItem('token');
  location.reload();
}

function returnHome() {
  window.location.replace('index.html');
}