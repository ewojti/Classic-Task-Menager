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
            <h2>${item.name}</h2>
            <p>${item.task}</p>
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

// if (deleteButton) {
//   Array.from(deleteButton).forEach((button) => {
//     button.addEventListener("click", (event) => {
//       const index = parseInt(event.target.getAttribute("data-index"));
//       // Usunięcie zadania z tablicy taskArray
//       console.log(index);
//       taskArray.splice(index, 1);
//       // Zaktualizowanie localStorage
//       localStorage.setItem("taskArrayStorage", JSON.stringify(taskArray));
//       // Ponowne wyświetlenie listy zadań
//       displayTaskItem();
//     });
//   });
// }

taskList.addEventListener("click", (event) => {
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
  //dodajemy do tablicy dane z formularza w postaci obiektu
  taskArray.push({
    name: name,
    task: task,
  });
  //resetujemy formularz po jego wypełnieniu
  form.reset();
  localStorage.setItem("taskArrayStorage", JSON.stringify(taskArray));
  displayTaskItem();
});

clearButton.addEventListener("click", () => {
  localStorage.clear();
  taskArray = []
  displayTaskItem();
});