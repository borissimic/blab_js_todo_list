/* sada cemo napraviti to da na ma js generira todo-s. treba nam text i da znamo dali je oznacen da je gotov ili ne. Cim imamo nesto sta ima dvije vrijednosti koje su usko povezane razmisaljamo o objektu  */
class Todo {
  text;
  isDone;
  constructor(text, isDone = false) {
    this.text = text;
    this.isDone = isDone;
  }
}

const todos = [new Todo("Primjer1"), new Todo("Primjer2", true)];

/* sada cemo preko metode todos.forEach provjeravati dali je todo oznacen kao gotov ili nije video 14:12, video 18:05 nakon sta smo donju metodu napravili ona nam jos uvijek radi samo unutra js-a ali ne i na stranici sad je moramo "zaljepiti u html" na 19:39 smo testirali dali radi na 22:28 idemo probati da nam se nakon renderiranja pojave vrijednosti koje smo postavili za isDone . Na 26:00 probat ce mo i drugi nacin za istu stvar na 28:00s smo to i napravili i zakljucili da je bolji drugi nacin nego  zbog toga sta se kada dodoamo checked na prvi nacin on ne  mice ako odznacimo checkbox*/

todos.forEach((todo, i) => addNewTodo(todo, i));

/*<input type="checkbox" name="checkbox-${i}" id="checkbox-${i}"${
 isDone ? "checked" : ""
}/>   <-  ovo je bio prvi pristup  za renderiranje preko checked atributa*/

// ode ce mo dodavati novi todo
//sad moramo reci kada se forma submita da nam uzme vrijednost koja se nalazi unutar nje i da nam je zasad samo ispise u konzoli a posli ce mo napraviti da nam je doda na todo listu
// const todoForm = document.getElementById("todo-form");  <- ovo je jedan nacin kako mozemo dohvatiti todo formu iz html-a
// const todoForm = document.forms.namedItem("todo-form"); <- ovaj nacin nam kaze da trazi sve forme koje imaju name "todo-form"

const todoForm = document.forms.namedItem("todo-form");
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // const formElement = event.target;
  const inputValue = todoForm.querySelector("input")?.value;
  if (!inputValue) {
    return;
  }
  const newTodo = new Todo(inputValue);
  todos.push(newTodo);
  addNewTodo(newTodo, todos.length - 1);

  todoForm.reset();

  // console.log(todos);
});

// event.preventDefault();  <- ovo nam sprijecava default pnasanje stranice i onda mozemo u consoli viditi objekt koji se naparavio i isto tako nema promjena u url-u

/*sada idemo iz forme izvuci vrijednost 1:07
 const newTodoInput = document.getElementById("todo-form"); <- ovo bi bio prvi nacin da to dobijemo 
 
  const formElement = event.target;
  const newTodoInput = formElement.querySelector("#new-todo");  <- ovo bi bio drugi nacin da to dobijemo gdje bi smo rekli da je event.target  ustvari const todoForm i onda skratimo na nacin da  maknemo const formElement i  onda unutar vrijednosti za const newtodoInput maknemo formElement i zamjenimo ga s todoForm*/
/* video 1:12 sada idemo izvlaciti tu vrijednost koju smo upisali*/
/*video 1:23  kada imamo input value sada cemo ici na to da nam nakon upisa doda na todo listu*/
// na 1:25 dodajemo {i}
// na 1:27 smo zakljucili da samo kopiranje iz todos.foreacha je glupo jer nam se kod ponavlja tj vec smo u todos.forEachu napravili to da nam doda novi div elementi  i onda unutar njega ubacuje neke vrijednosti i onda input element stavlja u main i onda smo odlucili da taj dio koda is todos. forEacha izvucemo u funkciju.
//iza toga smo rjesavali da dobijemo novi id broj [i]  addNewTodo(newTodo, todos.length - 1);
//na 1:36 idemo rjesavati problem da nam se ocisti todo forma nakon sta upisemo nesto i submitamo <-   todoForm.reset();
//na 1:39:27 idemo rijesavati problem tj postaviti uvjet da unutar forme moramo imati sadrzaj tj da ne kreira prazni checkbox bez texta .
/* if (!inputValue) {
    return;
  }
  */
//na 1:42:00  smo zakljucili da bi bilo bolje da idemo preko factory funkcije ili clase unositi todo posto bi bilo glupo da svaki put u const todos rucno unosimo nove objekte.
function addNewTodo({ text, isDone }, i) {
  const divElement = document.createElement("div");
  divElement.innerHTML = `
 <input type="checkbox" name="checkbox-${i}" id="checkbox-${i}"/>
 <label for="checkbox-${i}">${text}</label>
 `;
  const inputElement = divElement.querySelector("input");
  inputElement.checked = isDone;
  document.querySelector("main").appendChild(divElement);
}
