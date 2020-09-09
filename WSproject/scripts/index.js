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
renderCart();

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
  if (e.target.innerText == 'Toate produsele') {
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
//--------update cart with items from db
function renderCart() {
  fetch("http://localhost:3028/api/user/cartAdd", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem('token')
    },
    body: JSON.stringify({
      userId: sessionStorage.getItem('userId'),
      productId: ''
    })
  })
    .then(response => response.json())
    .then(r => {
      const cartCounter = document.getElementById('cartCounter');
      const infoText = document.getElementById('infoText');
      infoText.innerText = `Aveti ${r.length} produse in coș`;
      if (r.length > 0) {
        cartCounter.innerText = r.length;
        cartCounter.removeAttribute('style');
      } else {
        cartCounter.setAttribute('style', 'display: none;');
      }

      r.map(item => renderCartItem(item));
      let totalPrice = 0;
      for (let i = 0; i < r.length; i++) {
        totalPrice += parseFloat(r[i].price);
      }

      const priceText = document.getElementById('totalPriceText');
      priceText.innerText = `Total = ${totalPrice} RON`;
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

  card.appendChild(img);
  card.appendChild(title);
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
  while (listings.childNodes.length > 0) {
    listings.removeChild(listings.lastChild);
  }
}
function search(elem) {
  if (event.key === 'Enter') {
    clearListings();
    phonesArr.map(phone => {
      let title = phone.brand.toLowerCase() + phone.model.toLowerCase();
      title = title.replace(/\s/g, '');
      searchStr = elem.value.replace(/\s/g, '').toLowerCase();
      if (title.includes(searchStr)) {
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

//----dom for cart item in pop-up
function renderCartItem(item) {
  const listUl = document.getElementById('listUl');
  const liItem = document.createElement('li');

  const deleteBtn = document.createElement('div');
  deleteBtn.className = 'deleteListItem';
  deleteBtn.setAttribute('id', item._id);
  //------------stergere elemente din cart
  deleteBtn.addEventListener('click', e => {
    fetch("http://localhost:3028/api/user/cartDelete", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        userId: sessionStorage.getItem('userId'),
        productId: e.target.id,
      })
    })
    
    while (listUl.childNodes.length > 0) {
      listUl.removeChild(listUl.lastChild);
    }
    renderCart();
  })

  const trashCan = document.createElement('img');
  trashCan.src = "./resources/img/trash.png";
  trashCan.setAttribute('id', item._id);
  deleteBtn.appendChild(trashCan);

  const productImg = document.createElement('img');
  productImg.src = item.image;

  const cartItemDetails = document.createElement('div');
  cartItemDetails.className = 'cartItemDetails';

  const cartItemTitle = document.createElement('h2');
  cartItemTitle.setAttribute('id', "cartItemTitle");
  cartItemTitle.innerText = item.brand + ' ' + item.model;
  cartItemDetails.appendChild(cartItemTitle);

  const cartItemPrice = document.createElement('h4');
  cartItemPrice.setAttribute('id', "cartItemPrice");
  cartItemPrice.innerText = item.price + ' RON';
  cartItemDetails.appendChild(cartItemPrice);

  liItem.appendChild(deleteBtn);
  liItem.appendChild(productImg);
  liItem.appendChild(cartItemDetails);

  listUl.appendChild(liItem);
}
