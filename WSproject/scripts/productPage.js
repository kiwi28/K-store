if (!sessionStorage.getItem('token')) {
  window.location.replace('./login.html');
}

// const greet = document.getElementById('greet');//unused
const phoneName = document.getElementById('phoneName');
const signOutBtn = document.getElementById('signOutBtn');
const homeBtn = document.getElementById('homeBtn');
const closeCart = document.getElementById('closeCart');

cart.addEventListener('click', hideShowCart);
signOutBtn.addEventListener('click', signOut);
homeBtn.addEventListener('click', returnHome);
closeCart.addEventListener('click', hideShowCart);

renderCart();

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
fetch("http://192.168.0.104:3028/api/user/product", {
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
    location.reload();//repair this shit
    fetch("http://192.168.0.104:3028/api/user/cartAdd", {
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

function renderCart() {
  fetch("http://192.168.0.104:3028/api/user/cartAdd", {
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

function renderCartItem(item) {
  const listUl = document.getElementById('listUl');
  const liItem = document.createElement('li');

  const deleteBtn = document.createElement('div');
  deleteBtn.className = 'deleteListItem';
  deleteBtn.setAttribute('id', item._id);
  //------------stergere elemente din cart
  deleteBtn.addEventListener('click', e => {
    fetch("http://192.168.0.104:3028/api/user/cartDelete", {
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
