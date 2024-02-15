const form = document.getElementById("form-task");
const taskList = document.getElementById("task-list");
const deleteButton = document.getElementsByClassName("delete_btn");
const clearButton = document.getElementById("clear_btn");
let taskArray = JSON.parse(localStorage.getItem("taskArrayStorage")) || [];

function displayTaskItem() {
  return (taskList.innerHTML = taskArray
    .map(
      (item, index) => `
      <div class='list-task_item'>
        <div class='list-task_item_content'>
            <span>${index}</span>
            <h3>${item.name}</h3>
            <p>${item.task}</p>
            <p>${item.date}</p>

        </div>
        <div class='list-task_item_delete'>
            <button class='delete_btn' data-index=${index}>X</button>
        </div>
      </div>
      `
    )
    .join(""));
}

displayTaskItem();

taskList.addEventListener("click", (event) => {
  console.log(event);
  if (event.target.classList.contains("delete_btn")) {
    const index = parseInt(event.target.getAttribute("data-index"));
    taskArray.splice(index, 1);
    localStorage.setItem("taskArrayStorage", JSON.stringify(taskArray));
    displayTaskItem();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let task = document.getElementById("task").value;
  let deadlineDate = document.getElementById("deadline-time").value;
  //dodajemy do tablicy dane z formularza w postaci obiektu
  taskArray.push({
    name: name,
    task: task,
    date: deadlineDate,
  });
  //resetujemy formularz po jego wypełnieniu
  form.reset();
  localStorage.setItem("taskArrayStorage", JSON.stringify(taskArray));
  displayTaskItem();
});

clearButton.addEventListener("click", () => {
  localStorage.clear();
  taskArray = [];
  displayTaskItem();
});
