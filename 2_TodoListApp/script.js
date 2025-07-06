const inputValue = document.getElementById("inputValue");
const addBtn = document.getElementById("addbtn");
const tasklist = document.getElementById("task-list");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("TodoListTask"));
};

const addTodoListLocalStorage = () => {
  return localStorage.setItem("TodoListTask", JSON.stringify(localTodoArray));
};

let localTodoArray = getTodoListFromLocal() || [];

const addTodoDynamicElem = (curElem) => {
  const divElement = document.createElement("div");
  divElement.classList.add("list-item");
  divElement.innerHTML = `<li>${curElem}</li> <button class="deletebtn"> Delete </button> `;
  tasklist.append(divElement);
  inputValue.value = "";
};

const addTodoList = (e) => {
  e.preventDefault();

  const todoListValue = inputValue.value.trim();
  if (todoListValue != "" && !localTodoArray.includes(todoListValue)) {
    localTodoArray.push(todoListValue);
    console.log(localTodoArray);
    localTodoArray = [...new Set(localTodoArray)]; //To Use Only Unique Value
    localStorage.setItem("TodoListTask", JSON.stringify(localTodoArray));

    addTodoDynamicElem(todoListValue);
  }
};

const showTodoList = () => {
  console.log(localTodoArray);
  localTodoArray.forEach((curElem) => {
    addTodoDynamicElem(curElem);
  });
};

showTodoList();

const removeTodoElem = (e) => {
  const removeElem = e.target;
  let todoListContent = removeElem.previousElementSibling.innerText;
  let parentELem = removeElem.parentElement;

  localTodoArray = localTodoArray.filter((curElem) => {
    return curElem != todoListContent;
  });
  console.log(localTodoArray);

  addTodoListLocalStorage(localTodoArray);
  parentELem.remove();
};

tasklist.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("deletebtn")) {
    removeTodoElem(e);
  }
});

addBtn.addEventListener("click", (e) => {
  addTodoList(e);
});
