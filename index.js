import {
  getDatabase,
  ref,
  child,
  get,
  set,
  remove,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
const dbRef = ref(getDatabase());
var taskdata = [];
// var userid = 0
const database = getDatabase();
const db = getDatabase();
// var randomnumber = Math.floor(Math.random()*10000)
let inputtext = document.getElementById("input");
let addbutton = document.getElementById("addButton");
let tasklist = document.getElementById("tasklist");
get(child(dbRef, `alltasks/`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      taskdata = snapshot.val();
      console.log(taskdata);
      for (let x in taskdata) {
        console.log(x)
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

        allelements.appendChild(span);
        allelements.appendChild(deletetask);
        allelements.appendChild(updatetask);

        taskdiv.append(allelements);

        tasklist.appendChild(taskdiv);
      }
      console.log(typeof taskdata);
      console.log(taskdata);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
addbutton.addEventListener("click", addUITask);

function addUITask() {
  let tasktext = inputtext.value.trim();
  if (tasktext === "") {
    console.log("invalid");
    alert("Invalid task");
  } else {
    console.log(taskdata);
    let taskdiv = document.createElement("div");
    taskdiv.className = "task-container";
    let uniquekey = Math.floor(Math.random()*10000)

    let allelements = document.createElement("div");

    let span = document.createElement("span");
    span.textContent = tasktext;

    let deletetask = document.createElement("button");
    deletetask.textContent = "delete";
    deletetask.className = "deletetask"
    deletetask.addEventListener("click", () => {      
      Deletedata(uniquekey);
    });
    let updatetask = document.createElement("button");
    updatetask.className = "updatetask";
    updatetask.textContent = "update";

    allelements.appendChild(span);
    allelements.appendChild(deletetask);
    allelements.appendChild(updatetask);

    taskdiv.append(allelements);

    tasklist.appendChild(taskdiv);
    inputtext.value = "";
    set(ref(db, "alltasks/" + uniquekey), {
      Todolist: tasktext,
    });
    console.log(taskdata);
    // console.log(randomnumber)
  }
}

// let element = document.getElementsByTagName("div")[3];
// element.addEventListener("click", ()=>{
//  element.remove();
// })
tasklist.addEventListener('click',function(e){
  if(e.target.className === "deletetask" ){
    e.target.parentElement.remove();
    console.log("deleted");
  }
})
function Deletedata(mytask) {
  console.log(mytask);

  console.log("clicked");
  remove(ref(db,"alltasks/" + mytask))
    .then(() => {
      console.log("Data deleted from Firebase");
    })
    .catch((error) => {
      console.error("Error deleting data from Firebase:", error);
    });
}

// tasklist.addEventListener("click", function (e) {
//   if (e.target.className === "deletetask") {
//     const taskContainer = e.target.parentElement;
//     const spanElement = taskContainer.querySelector("span");

//     remove(ref(db,`alltasks/Todolist${taskdata.length}`))
//       .then(() => {
//         console.log("Data deleted from Firebase");
//         taskContainer.remove();
//       })
//       .catch((error) => {
//         console.error("Error deleting data from Firebase:", error);
//       });
//   }

//   if (e.target.className === "updatetask") {
//     let updatedTask = prompt("Update");
//     if (updatedTask !== null) {
//       let spanElement = e.target.parentElement.querySelector("span");
//       spanElement.innerText = updatedTask;
//     }
//   }
// });

// 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
