//redirectioneaza user-ul catre pagina de login daca nu este prezent un token de autentificare
if (!sessionStorage.getItem('token')) {
  window.location.replace('./login.html');
}
const greet = document.getElementById('greet');
const listings = document.getElementById('listings');
const dropDown = document.getElementById('dropDown');
const signOutBtn = document.getElementById('signOutBtn');

dropDown.addEventListener('click', getPhones);
listings.addEventListener('click', product);
signOutBtn.addEventListener('click', signOut);

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

  let addToCart = document.createElement('h3');
  addToCart.innerText = 'Adauga in coș';

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(addToCart);
  listings.appendChild(card);
}

//----redirect client to e new page using querry params
function product(e) {
  window.location.assign(`./productPage.html?id=${e.target.id}`)
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
        console.log(phone);
        renderCard(phone);
      } 
    })
  }
}