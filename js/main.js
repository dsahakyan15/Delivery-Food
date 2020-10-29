'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const logo = document.querySelector('.logo');
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const cardsMenu = document.querySelector('.cards-menu')

let login = localStorage.getItem('Delivery')

function toggleModal() {
  modal.classList.toggle("is-open");
}
function toggleModalAuth() {
  modalAuth.classList.toggle('is-open')
  if (modalAuth.classList.contains("is-open")) {
    disableScroll();
  } else {
    enableScroll();
  }
}
function autorized() {


  function logOut() {
    login = null;
    localStorage.removeItem('Delivery')
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut)
    checkAuth()
  }

  userName.textContent = login

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';


  buttonOut.addEventListener('click', logOut)
}
function notAutorized() {
  function logIn(event) {
    event.preventDefault();
    if (loginInput.value.trim()) {
      login = loginInput.value;
      localStorage.setItem('Delivery', login)
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      loginForm.removeEventListener('submit', logIn);
      loginForm.reset();
      checkAuth();
    }
    else {
      loginInput.style.borderColor = '#ff0000';
      loginInput.value = '';
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth)
  closeAuth.addEventListener('click', toggleModalAuth)
  loginForm.addEventListener('submit', logIn)
  modalAuth.addEventListener('click', function (event) {
    if (event.target.classList.contains('is-open')) {
      toggleModalAuth()
    }
  })
}
function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}
function createCardsRestaurants() {
  const card = `
      <a class="card card-restaurant">
				<img src="img/tanuki/preview.jpg" alt="image" class="card-image" />
				<div class="card-text">
					<div class="card-heading">
						<h3 class="card-title">Тануки</h3>
						<span class="card-tag tag">60 мин</span>
					</div>
					<!-- /.card-heading -->
				  <div class="card-info">
						<div class="rating">
							4.5
						</div>
						<div class="price">От 1 200 ₽</div>
						<div class="category">Суши, роллы</div>
					</div>
					<!-- /.card-info -->
				</div>
				<!-- /.card-text -->
			</a>
			<!-- /.card -->
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card)
}
function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card'
  card.insertAdjacentHTML('beforeend', `
						<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Классика</h3>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина,
									салями,
									грибы.
								</div>
							</div>
							<!-- /.card-info -->
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">510 ₽</strong>
							</div>
						</div>
						<!-- /.card-text -->
  `);

  cardsMenu.insertAdjacentElement('beforeend', card)

}
function openGoods(event) {
  const target = event.target;

  if (login) {
    const restaurant = target.closest('card-restaurant');
    if (restaurant) {
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');


      createCardGood();
      createCardGood();
      createCardGood();
    }
    else {
      toggleModalAuth()
    }
  }




}

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
cardsRestaurants.addEventListener('click', openGoods)
logo.addEventListener('click', () => {

  containerPromo.classList.remove('hide')
  restaurants.classList.remove('hide')
  menu.classList.add('hide')
})


checkAuth()

createCardsRestaurants();