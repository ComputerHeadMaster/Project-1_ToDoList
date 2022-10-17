//script for project1 -ToDo -List - script.js
window.onload=function(){

//Valitse ensin kaikki
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.myInput');
const todoItemList = document.querySelector('.items');

//Tallenus tila = store
let tehtavat = [];

todoForm.addEventListener('submit', 
function(event){

//estä appin uudenleen lataus listaa tehdessä
event.preventDefault();
addTodo(todoInput.value);
}
);

function addTodo(item){
 if(item != ''){

    const tehtava ={
        id: Date.now(),
        name: item,
        completed: false
    };

    tehtavat.push(tehtava);
    addToLocalStorage(tehtavat);
    todoInput.value = '';

 }
}

function renderTodos(tehtavat){
    //tyhjennä kaikki ul items sisältä
    todoItemList.innerHTML = '';

    tehtavat.forEach(function (item) {
       //katso onko tehtävä tehty
       const checked = item.completed ? 'checked': null; 

       //Tee lista elementti

       const li = document.createElement('li');
       li.setAttribute('class','item');
       li.setAttribute('data-key', item.id);

       if(item.completed == true){
        li.classList.add('checked');
       }

       li.innerHTML = `
       <input type="checkbox" class="checkbox" ${checked}>
       ${item.name}
       <button class="poista">x</button>
       `;

       todoItemList.append(li);
    });
}

function addToLocalStorage(tehtavat){
    localStorage.setItem('tehtavat', JSON.stringify(tehtavat));
    renderTodos(tehtavat);
}

function getFromLocalStorage(){
    const reference = localStorage.getItem('tehtavat');

    if(reference){
        tehtavat = JSON.parse(reference);
        renderTodos(tehtavat);
    }
}

function toggle(id){
    tehtavat.forEach(function(item){
        if(item.id == id){
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(tehtavat);
}

function deleteTodo(id){
    tehtavat = tehtavat.filter(function(item){
        return item.id != id;
    });

    addToLocalStorage();
}

getFromLocalStorage();

todoItemList.addEventListener('click', function(event){
    if(event.target.type === 'checkbox'){
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if(event.target.classList.contains('poista')){
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});

}