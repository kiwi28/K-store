//redirectioneaza user-ul catre pagina de login daca nu este prezent un token de autentificare
if (!sessionStorage.getItem('token')) {
  window.location.replace('./login.html');
}
const greet = document.getElementById('greet');
const listings = document.getElementById('listings');
const dropDown = document.getElementById('dropDown');
const signOutBtn = document.getElementById('signOutBtn');
const cart = document.getElementById('cart');
const closeCart = document.getElementById('closeCart');

dropDown.addEventListener('click', getPhones);
listings.addEventListener('click', product);
signOutBtn.addEventListener('click', signOut);
cart.addEventListener('click', hideShowCart);
closeCart.addEventListener('click', hideShowCart);

greet.innerText = `Bună ${sessionStorage.getItem('firstName')}!`;

var phonesArr;
//---render all products on page laod
fetch("http://localhost:3028/api/user/index", {
    method: 'POST',
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + sessionStorage.getItem('token')
  },
    body: JSON.stringify({
      filter: ''
    })
  })
  .then(res => res.json())
  .then(r => {
    //randare pagina telefoane la categorii
    r.map(phone => renderCard(phone));
    phonesArr = r;
  })
  .catch(err => console.log(err));

//----render cards by category
async function getPhones(e) {
  var filter;
  if(e.target.innerText == 'Toate produsele') {
    filter = '';
  } else {
    var filter = e.target.innerText;
  }

  clearListings();

//request brand de telefon, res array cu toatele modelele
  fetch("http://localhost:3028/api/user/index", {
    method: 'POST',
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + sessionStorage.getItem('token')
  },
    body: JSON.stringify({
      filter
    })
  })
    .then(res => res.json())
    .then(r => {
      //randare pagina telefoane la categorii
      r.map(phone => renderCard(phone));
    })
    .catch(err => console.log(err));
}

//---------functie de creare a unui card cu 1 produs
function renderCard(phone) {
  let card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('id', phone._id);

  let imgContainer = document.createElement('div');
  imgContainer.className = 'imgContainer';

  let img = document.createElement('img');
  img.src = phone.image;
  img.setAttribute('id', phone._id);

  let title = document.createElement('h2');
  title.innerText = phone.brand + ' ' + phone.model;

  let price = document.createElement('h4');
  price.innerText = phone.price + ' RON';

  let addToCartBtn = document.createElement('h3');
  addToCartBtn.innerText = 'Adauga in coș';
  addToCartBtn.setAttribute('id', phone._id);

  //-----------add to cart logicmoved in productPage.js
  // var phoneId = phone._id;
  // // console.log(phoneItem);
  // //listener with call back to add clicked items in cart
  // addToCartBtn.addEventListener('click', phoneId => {
  //   console.log(phoneId.target.id);
  //   fetch("http://localhost:3028/api/user/cart", {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": "Bearer " + sessionStorage.getItem('token')
  //     },
  //     body: JSON.stringify({
  //       userId: sessionStorage.getItem('userId'),
  //       productId: phoneId
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(r => console.log(r))
  // })

  card.appendChild(img);
  card.appendChild(title);z
  card.appendChild(price);
  card.appendChild(addToCartBtn);
  listings.appendChild(card);
}

//----redirect client to e new page using querry params
function product(e) {
  if (e.target.id) {
    window.location.assign(`./productPage.html?id=${e.target.id}`);
  }
  return
}

//------sign out user
function signOut() {
  sessionStorage.removeItem('token');
  location.reload();
}
function clearListings() {
  while(listings.childNodes.length > 0) {
    listings.removeChild(listings.lastChild);
  }
}
function search(elem) {
  if(event.key === 'Enter') {
    clearListings();
    phonesArr.map(phone => {
      let title = phone.brand.toLowerCase() + phone.model.toLowerCase();
      title = title.replace(/\s/g, '');
      searchStr = elem.value.replace(/\s/g, '').toLowerCase();
      if(title.includes(searchStr)) {
        renderCard(phone);
      } 
    })
  }
}
// -------------------------------show/hide cart pop-up-------
let cartContainer = document.getElementById('cartContainer');
cartContainer.setAttribute('style', 'display: none;');
let cartState = false;

function hideShowCart() {
  if (!cartState) {
    cartContainer.removeAttribute('style');
    cartState = true;
  } else {
    cartContainer.setAttribute('style', 'display: none;');
    cartState = false;
  }
}
//--------------------------------------------------------
