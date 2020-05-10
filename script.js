// É global para que não seja preciso chamar 'querySelector' toda vez que houver
// a necessidade de adicionar um novo card.
const divCards = document.querySelector('#cards');

window.addEventListener('load', populaCards());


async function populaCards() {
  const api = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';

  // fetch() retorna a promessa de um objeto, then() retorna a promessa de um json.
  // Por isso a necessidade de um await para cada uma, ambas são assíncronas.
  let json = await (await fetch(api).then()).json();

  // Ao passar a função como parâmetro para .map, faz-se iterar a função 
  // sobre todos os itens do map (note que a função é passada sem '()' )
  json.map(renderCard);
}


function renderCard(json) {

  let divFilha = document.createElement("div");
  divFilha.className = "col mb-4";

  let foto = redimensiona(json.photo, 'medium');

  divFilha.innerHTML = htmlDiv(foto, json.name, json.property_type, json.price);
  
  divCards.appendChild(divFilha);
}

function htmlDiv(foto, nome, tipo, preco){
  return `
  <div class="card h-100">
    <div class="box_image">
    <img src="${foto}" class="card-img-top" alt="Imagem do imóvel">
    </div>
    <div class="card-body">
      <p class="card_tipo"> ${tipo} </p>
      <p class="card_titulo"> ${nome}</p>
      <p class="card-text"><b>R$${preco},00</b>/noite</p>
    </div>
  </div>
  `
}

function redimensiona(url, tamanho) {
  url = url.substring(0, url.indexOf('policy='));
  return `${url}policy=${tamanho}`;
}