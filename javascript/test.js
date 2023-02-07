const input = document.querySelector("#input");
const dark = document.querySelector("#dark")
const light = document.querySelector("#light")
const body = document.querySelector("body")
const contenaire = document.querySelector("#contenaire")
const clearbutton = document.querySelector(".clear")
const allbuttons = document.querySelector(".all")
const activebutton = document.querySelector(".active")
const completedbutton = document.querySelector(".completed")
const btnlist = document.querySelectorAll(".btnlist")
let tasks = []
// ative darkmode
dark.addEventListener("click", () => {
    body.style.background = "#202124"
    one.style.backgroundSize = "cover"
    light.style.display = "block"
    one.style.background = "url(/images/bg-desktop-dark.jpg)"
    dark.style.display = "none"
})
// active light mode
light.addEventListener("click", () => {
    body.style.background = "white"
    dark.style.display = "block"
    one.style.background = "url(/images/bg-desktop-light.jpg)"
    light.style.display = "none"
})
// creat html of tasks
let creattask = function(id,name){
    let t =  `<div class="ALL flex  justify-between p-4 items-center border-b-2 border-gray-200" data-ip="${id}">
             <div class="flex gap-3">
             <input class="chekpoint" type="checkbox">
             <p id="task" class="">${name}</p>
             </div>
             <img  src="/images/pngegg.png" class="img h-6" alt="">
             </div>`
         return t
 }
//  display data from local storage
 let displayui = function(){
     let datas = JSON.parse(localStorage.getItem('tasks'))
     if(datas){
         tasks = datas
         // display tasks from local storage
        tasks.forEach(function(element){
            contenaire.innerHTML += creattask(element.id, element.tasks)
        })
        //  check if they are any completed tasks
            tasks.forEach(function(task,id){
                if(task.status === "completed"){
                    let alltask = document.querySelectorAll(".ALL")
                    let c = alltask[id].querySelector(".chekpoint")
                    let p = c.nextElementSibling
                    c.checked = true
                    p.classList.add("cheked")
                }
            })
        }
            }
// make tasks checked
let  checked = function(){
    let chekpoint = document.querySelectorAll(".chekpoint")
    chekpoint.forEach(function(item){
    item.addEventListener("click",() => {
        let c = item.nextElementSibling
        let num = item.parentNode.parentElement.dataset.ip
        c.classList.toggle("cheked")
             tasks.forEach(function(task,id,arr){
            if(task.id == num){
               let index = arr.indexOf(task)
               if(c.classList.contains("cheked")){
                   tasks[index].status ="completed"
                   localStorage.setItem('tasks',JSON.stringify(tasks))
                       item.checked = true;
               }
               else{
               tasks[index].status ="active"
               localStorage.setItem('tasks',JSON.stringify(tasks))
                   item.checked = false;
               }
            }
        })
    })
    });
}
// function to delete tasks
let deletetask = function(){
    let img = document.querySelectorAll(".img")
    img.forEach(function(m){
    m.addEventListener("click",() =>{
        let index = m.parentElement.dataset.ip
        tasks = JSON.parse(localStorage.getItem('tasks'))
        let c = tasks.filter(function(t){
            return t.id !== index
        })
        tasks = c
        localStorage.setItem("tasks", JSON.stringify(tasks))
        if(tasks.length == 0){
          localStorage.removeItem("tasks")
        }
        contenaire.removeChild(m.parentElement)
        
    })
})
}
displayui()
deletetask()
checked()
// to add new task
document.addEventListener('keydown', (event) => {
    let name = event.key;
    if(name == "Enter" && input.value!= ""){
        let id = (Date.now() + '').slice(-10);
        tasks.push({tasks: input.value, status : "active", "id" : id});
        localStorage.setItem("tasks", JSON.stringify(tasks))
        input.value = "";
        contenaire.innerHTML="";
            displayui()
            checked()
            deletetask()
            btnlist.forEach(function(btn){
                btn.classList.remove("text-sky-700")
            })
            allbuttons.classList.add("text-sky-700")
    }
})

// use clear button to clear all tasks
clearbutton.addEventListener('click', () => {
    tasks = []
    localStorage.removeItem("tasks")
    contenaire.innerHTML="";
})


// display all tasks
allbuttons.addEventListener('click',() => {
    btnlist.forEach(function(btn){
        btn.classList.remove("text-sky-700")
    })
    allbuttons.classList.add("text-sky-700")
    contenaire.innerHTML="";
    displayui()
    deletetask()
    checked()
})


// display only active tasks
activebutton.addEventListener("click",() =>{
    btnlist.forEach(function(btn){
        btn.classList.remove("text-sky-700")
    })
    activebutton.classList.add("text-sky-700")
    let comptask =  tasks.filter(function(task) {
        return task.status == "active"
    })
        contenaire.innerHTML = "";
        comptask.forEach(function(comp) {
            let p = creattask(comp.id,comp.tasks)
            contenaire.innerHTML += p
        })
        deletetask()
        checked()
})


// display completed tasks
completedbutton.addEventListener("click",() =>{
    btnlist.forEach(function(btn){
        btn.classList.remove("text-sky-700")
    })
    completedbutton.classList.add("text-sky-700")
    let comptask =  tasks.filter(function(task) {
        return task.status == "completed"
    })
        contenaire.innerHTML = "";
        comptask.forEach(function(comp) {
            let p = creattask(comp.id,comp.tasks)
            contenaire.innerHTML += p
        })
        comptask.forEach(function(task,id){
            if(task.status === "completed"){
                let alltask = document.querySelectorAll(".ALL")
                let c = alltask[id].querySelector(".chekpoint")
                let p = c.nextElementSibling
                c.checked = true
                p.classList.add("cheked")
            }
        })
        deletetask()
        checked()
})