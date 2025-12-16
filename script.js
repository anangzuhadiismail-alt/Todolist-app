//membaca seluruh dokumen html,css dulu sebelum dijalankan
document.addEventListener("DOMContentLoaded", function() {

    //global function()ambil data dari localstorage 
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  //DOM selection (method getElementById) ambil elemen html biar bisa dimodifikasi
  const addBtn = document.getElementById("add-task-btn");
  const modalElement = document.getElementById("task-modal");
  const modal = new bootstrap.Modal(modalElement);
   const form = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const todayDate = document.getElementById("today-date");
  const closebtn = document.getElementById("close-modal-btn");
  
    //menampilkan tanggal hari ini dengan id today date 
  todayDate.textContent = new Date().toDateString();
  
    // modal akan terbuka ketika user klik(+)
  addBtn.addEventListener("click", () => modal.show());
  
  // tutup modal saat tombol cancel 
  closebtn.addEventListener("click", () => modal.hide());

// update tampilan taskselesai
function updateTaskAppearance(taskItem,isCompleted) {
  
  if (isCompleted) {
    
    taskItem.classList.add("completed");
    
  } else {
    
    taskItem.classList.remove("completed");
    
  }
  
};



  // Fungsi globalscope() semua rendertask ke UI
       function renderTasks() {
         
       //kosongkan isitaskList sebelum di render ulang
       taskList.innerHTML = "";
       
       //looping setiap elemen task
       tasks.forEach((task, index) => {
         //menambahkan div baru ke 1 task
         const taskItem = document.createElement("div");
         //menambahkan class untuk styling css
        taskItem.classList.add("task-item");
         
         const taskInfo = document.createElement("div");
         taskInfo.classList.add("task-info");
         // elemen berisi informasi isi task name,date,time,category
         taskInfo.innerHTML = `<strong> ${task.name} </strong> 
        <small>${task.date} ${task.time} - ${task.category}</small>`
        
          // buat element checkbox untuk menandai task sudah selesai atau belum
  const checkBox = document.createElement("input");
  //set element type jadi checkbox
  checkBox.type = "checkbox";
  
  // jika task.completed true maka otomatis di centang
  checkBox.checked = task.completed || false;
  // event checkBox saat di klik box berubah 
  checkBox.addEventListener("change", () => {
    
    task.completed = checkBox.checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    updateTaskAppearance(taskItem,task.completed);
    
  });

  
  // edit elemen 
  const editBtn = document.createElement("button");
  editBtn.textContent ="✍️";
  editBtn.classList.add("edit-btn");
  
  //event edit
  editBtn.addEventListener("click", () => {
    
    // tampilkan data baru ke form
    document.getElementById("task-name").value = task.name;
    document.getElementById("task-date").value = task.date;
    document.getElementById("task-time").value = task.time;
    document.getElementById("task-category").value = task.category;
  
  //edit form submit
  form.onsubmit = (e) => {
  
    //halaman ga reload otomatis
    e.preventDefault();
    
    tasks[index] = {
  
name:document.getElementById("task-name").value,
time:document.getElementById("task-time").value,
date:document.getElementById("task-date").value,
category:document.getElementById("task-category").value,

completed: task.completed

    };

    // simpan ulang ke localstorage 
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    // render ulang 
  renderTasks();
  form.reset(); 
  modal.hide();
  
  };
  
  modal.show();


  });
  
// menu hapus 
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "🗑️";
deleteBtn.classList.add("delete-btn");

deleteBtn.addEventListener("click", () => {
  
  tasks.splice(index,1);
  localStorage.setItem("tasks",JSON.stringify(tasks));
  
  renderTasks(); 
    
});

const taskDateTime = new Date(`${task.date}T${task.time}`);
const now = new Date();
const diff = taskDateTime - now;

if (diff > 0) {
  //ancronous function callback function
  setTimeout(() => {
    
    alert("waktunya sekarang");
    
  }, diff);
}

// method DOM memasukan elemen kedalam taskItem
taskItem.appendChild(checkBox);
taskItem.appendChild(taskInfo);
taskItem.appendChild(editBtn);
taskItem.appendChild(deleteBtn);

updateTaskAppearance(taskItem,task.completed);

taskList.appendChild(taskItem);

});
}
    

renderTasks();


form.addEventListener("submit",(e) =>{
  // mencegah halaman terefresh
  e.preventDefault();
  
  const name = document.getElementById("task-name").value;
  const date = document.getElementById("task-date").value;
  const time = document.getElementById("task-time").value;
  const category = document.getElementById("task-category").value;

  const newtask = {name,date,time,category,completed:false};
  
  //dorong ke array dan simpan
  tasks.push(newtask);
  localStorage.setItem("tasks",JSON.stringify(tasks));

//render ulang dan tutup modal
renderTasks();
form.reset();
modal.hide();

});

});