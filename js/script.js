//script for project1 -ToDo -List - script.js
// Koodissa käytetty thecodingpie.com tutoriaalia apuna
// Valitse ensin kaikki
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');
// taulukko, joka varastoi/tallentaa kaikki tehtävät
let todos = [];
// lisää eventListener lomakkeeseen, ja valitsese submit eventtiin
todoForm.addEventListener('submit', function(event) {
  // estä sivua laatamasta uudestaan kun hyväksyt lomakkeen
  event.preventDefault();
  addTodo(todoInput.value); // kutsu addTodo functiota syöttöruudun nykyistä arvoa
});

function addTodo(item) {
  // jos "item" ei ole tyhjä
  if (item !== '') {
    // tee objecti, jossa on id, nimi sekä complete ominaisuudet
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };// lisää ne taulukkoon
    todos.push(todo);
    addToLocalStorage(todos); // tallena ne localStorageen 
    // kaikki tämä tehtyä tyhjennä lopuksi syöttöruudun arvo
    todoInput.value = '';
  } if (item == ''){
    alert("Et ole antanut tehtävää, jonka voisi lisätä listalle.") 
  } //jos "item" on tyhjä, sivu ilmoittaa siitä kun yrität lisätä tyhjää tehtävää
}
// tuo annetut tehtävät näytölle
function renderTodos(todos) {
  // tyhjennä kaikki <ul> sisällä class=todo-items komennolla
  todoItemsList.innerHTML = '';
  // käy jokainen tethvävä läpi todoon sisällä 
  todos.forEach(function(item) {
    // tarkista onko tehtävä tehty
    const checked = item.completed ? 'checked': null;// luo <li> elementti ja täytä se
    // <li> </li>
    const li = document.createElement('li');
    // <li class="item"> </li>
    li.setAttribute('class', 'item');
    // <li class="item" data-key="20200708"> </li>
    li.setAttribute('data-key', item.id);
    /* <li class="item" data-key="20200708"> 
          <input type="checkbox" class="checkbox">
          käy saalilla
          <button class="delete-button">X</button>
        </li> */
    // jos kohde on valmis lisää luokkaan <li> luokka nimeltä "tehty"
    if (item.completed === true) {
      li.classList.add('checked');
    }li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    // lisää li <ul> sisälle
    todoItemsList.append(li);
  });}// functio joka lisää "add todos" local storageen
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  // tuo ne ruudulle
  renderTodos(todos);
}// tämä auttaa saamaan kaiken local storagesta
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}// muuta arvo tehdyksi tai ei tehdyksi
function toggle(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      // muuta arvo
      item.completed = !item.completed;
    }
  });addToLocalStorage(todos);
}// poista tehtävä taulukosta ja päivittää samalla local storagen ja luetun näytön
function deleteTodo(id) {
  todos = todos.filter(function(item) {
    return item.id != id;
  });// päivitä localStorage
  addToLocalStorage(todos);
}// aluksi hanki kaikki tehtävät localStoragesta
getFromLocalStorage();
// tee addeventlistener, koska täytyy tarkistaa "click" tapahtuma poisto napissa sekä "check" valikossa
todoItemsList.addEventListener('click', function(event) {
  // tarkista onko tapahtuma "check" valikossa
  if (event.target.type === 'checkbox') {
    // vaihda tila
    toggle(event.target.parentElement.getAttribute('data-key'));
  }// tarkista onko siellä poisto nappia
  if (event.target.classList.contains('delete-button')) {
    // ota id data-avaimesta <li> arvosta, jossa poisto nappi on läsnä 
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});