import {
  getDatabase,
  ref,
  child,
  get,
  set,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
const dbRef = ref(getDatabase());
var taskdata;
// var userid = 0
const database = getDatabase();
const db = getDatabase();
// var randomnumber = Math.floor(Math.random()*10000)
var updatedTask;
let inputtext = document.getElementById("input");
let addbutton = document.getElementById("addButton");
let tasklist = document.getElementById("tasklist");
get(child(dbRef, `alltasks/`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      taskdata = snapshot.val();
      console.log(taskdata);
      renderlist(taskdata);
      console.log(typeof taskdata);
      console.log(taskdata);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

function renderlist(taskdata) {
  console.log("render", taskdata);
  for (let x in taskdata) {
    console.log(x);
    let taskdiv = document.createElement("div");
    taskdiv.className = "task-container";

    let allelements = document.createElement("div");

    let span = document.createElement("span");
    span.innerText = taskdata[x]["Todolist"];

    let deletetask = document.createElement("button");
    deletetask.className = "deletetask";
    deletetask.textContent = "delete";
    deletetask.addEventListener("click", () => {
      Deletedata(x);
    });

    let updatetask = document.createElement("button");
    updatetask.className = "updatetask";
    updatetask.textContent = "update";
    updatetask.addEventListener("click", () => {
      Updtdata(x);
    });

    allelements.appendChild(span);
    allelements.appendChild(deletetask);
    allelements.appendChild(updatetask);

    taskdiv.append(allelements);

    tasklist.appendChild(taskdiv);
  }
}
addbutton.addEventListener("click", addUITask);

function addUITask() {
  let tasktext = inputtext.value.trim();
  let uniquekey;
  if (tasktext === "") {
    console.log("invalid");
    alert("Invalid task");
  } else {
    // console.log(taskdata);
    let taskdiv = document.createElement("div");
    taskdiv.className = "task-container";
    uniquekey = Math.floor(Math.random() * 10000);

    let allelements = document.createElement("div");

    let span = document.createElement("span");
    span.textContent = tasktext;

    let deletetask = document.createElement("button");
    deletetask.textContent = "delete";
    deletetask.className = "deletetask";
    deletetask.addEventListener("click", () => {
      Deletedata(uniquekey);
    });
    let updatetask = document.createElement("button");
    updatetask.className = "updatetask";
    updatetask.textContent = "update";
    updatetask.addEventListener("click", () => {
      Updtdata(uniquekey);
    });

    allelements.appendChild(span);
    allelements.appendChild(deletetask);
    allelements.appendChild(updatetask);

    taskdiv.append(allelements);

    tasklist.appendChild(taskdiv);
    inputtext.value = "";
    console.log(uniquekey);
    set(ref(db, "alltasks/" + uniquekey), {
      Todolist: tasktext,
    });
    console.log("unique", uniquekey);
    console.log((taskdata[uniquekey] = { ["Todolist"]: tasktext }));
    console.log(taskdata);
  }
}
function Deletedata(mytask) {
  console.log(mytask)
  console.log((delete taskdata[mytask]))
  console.log(taskdata)
  tasklist.addEventListener("click", function (e) {
    if (e.target.className === "deletetask") {
      e.target.parentElement.remove();
      console.log("deleted");
      console.log(mytask);
    }
  });
  console.log("clicked");
  remove(ref(db, "alltasks/" + mytask))
  .then(() => {
    console.log("Data deleted from Firebase");
  })
  .catch((error) => {
    console.error("Error deleting data from Firebase:", error);
  });
}

function Updtdata(mytask) {
  console.log("click");
  console.log(mytask);
  
  updatedTask = prompt("update");
  console.log((taskdata[mytask] = { ["Todolist"]: updatedTask }));

  if (updatedTask !== null) {
      
    update(ref(db, "alltasks/" + mytask), {
      Todolist: updatedTask,
    })
      .then(() => {
        console.log("Data updated from Firebase");
      })
      .catch((error) => {
        console.error("Error updating data from Firebase:", error);
      });
  }
}
tasklist.addEventListener("click", function (e) {
  console.log(taskdata)
  if (e.target.className === "updatetask") {
    if (updatedTask !== null) {
      let spanElement = e.target.parentElement.querySelector("span");
      spanElement.innerText = updatedTask;
    }
  }
})
