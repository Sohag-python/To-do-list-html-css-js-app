document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const saveTasksBtn = document.getElementById("saveTasks");
    const loadTasksBtn = document.getElementById("loadTasks");

    // Load tasks from local storage when the page loads
    loadTasks();

    addTaskBtn.addEventListener("click", addTask);
    saveTasksBtn.addEventListener("click", saveTasks);
    loadTasksBtn.addEventListener("click", loadTasks);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        taskInput.value = "";

        saveTasksToLocalStorage();
    }

    function createTaskElement(text) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = text;
        span.classList.add("task-text");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");
        editBtn.onclick =()=> editTask(span);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");
        deleteBtn.onclick =()=> deleteTask(li);

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        return li;
    }

    function editTask(taskSpan) {
        const newText = prompt("Edit your task:", taskSpan.textContent);
        if (newText !== null) {
            taskSpan.textContent = newText;
            saveTasksToLocalStorage();
        }
    }

    function deleteTask(taskElement) {
        taskElement.remove();
        saveTasksToLocalStorage();
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll(".task-text").forEach(taskSpan => {
            tasks.push(taskSpan.textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        taskList.innerHTML = ""; // Clear existing tasks
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            taskList.appendChild(createTaskElement(task));
        });
    }

    function saveTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "tasks.json";
        a.click();
    }
});
