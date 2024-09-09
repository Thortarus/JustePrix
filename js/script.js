const items = [
  { name: "des", price: 5, img: document.querySelector("#img0") },
  { name: "skate", price: 100, img: document.querySelector("#img1") },
  { name: "manette", price: 80, img: document.querySelector("#img2") },
  { name: "tapis", price: 10, img: document.querySelector("#img3") },
  { name: "gourde", price: 15, img: document.querySelector("#img4") }
];



let stockAleatoire = [];
let beginButton = document.querySelector("#beginButton");
let validateButton = document.querySelector("#nextButton");
let guess = document.querySelector("#guess");
let textGuess = document.querySelector("#textGuess");

let nbreAleatoire = null;
let lives = 4;
let goodAnswer = 0;

beginButton.addEventListener("click", gameStart);
validateButton.addEventListener("click", validateGuess);

function gameStart() {
  guess.classList.remove("d-none");
  textGuess.classList.remove("d-none");
  beginButton.classList.add("d-none");

  // Cacher toutes les images
  items.forEach(item => item.img.classList.add("d-none"));

  // Créer un nombre aléatoire et s'assurer qu'il ne se répète pas
  if (stockAleatoire.length < items.length) {
    do {
      nbreAleatoire = Math.floor(Math.random() * items.length);
    } while (stockAleatoire.includes(nbreAleatoire));

    stockAleatoire.push(nbreAleatoire);
    items[nbreAleatoire].img.classList.remove("d-none");
  } else {
    guess.classList.add("d-none");
    textGuess.classList.add("d-none");
  }
}

function validateGuess() {
  const itemPriceValue = Number(document.querySelector("#itemPrice").value);

  // Comparer l'élément actuellement affiché (nbreAleatoire)
  const objetSelect = items[nbreAleatoire];


  if (objetSelect.price === itemPriceValue) {
    Swal.fire({
      title: 'Bonne réponse !',
      text: "",
      icon: 'success',
      confirmButtonText: 'Suivant'
    })
    goodAnswer = goodAnswer +1;
    console.log(goodAnswer);
    
  } else {
    lives--;
    Swal.fire({
      title: 'Mauvaise réponse !',
      text: `Prix correct : ${objetSelect.price}`,
      text:  `Nombre de vies restantes : ${lives}`,
      icon: 'error',
      confirmButtonText: 'Suivant'
    })
  }
  if (lives === 0) {
    Swal.fire({
      title: 'Perdu !',
      text: "Vous n'avez plus de vies...",
      icon: 'error',
      confirmButtonText: 'Recommencer'
    })
    gameReset();
  } else {
    gameStart();
  }
  if (goodAnswer === 5) {
    Swal.fire({
      title: 'Félicitations',
      text: 'Vous avez gagné !'
    })
    gameReset();
  }
}



function gameReset() {
  lives = 4;
  stockAleatoire = [];
  items[nbreAleatoire].img.classList.add("d-none");
  beginButton.classList.remove("d-none");
  guess.classList.add("d-none");
  textGuess.classList.add("d-none");
}
