document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskName");
    const taskDescriptionInput = document.getElementById("taskDescription");
    const dueDateInput = document.getElementById("dueDate");
    const priorityInput = document.getElementById("priority");
    const addTaskButton = document.getElementById("addTask");
    const statusFilter = document.getElementById("statusFilter");
    const taskList = document.getElementById("taskList");
    const tasks = [];

    const createTaskSection = document.getElementById("create-task-section");
    const allTasksSection = document.getElementById("all-tasks-section");
    const createTaskLink = document.getElementById("create-task-link");
    const allTasksLink = document.getElementById("all-tasks-link");

    // Function to switch sections
    function switchSection(section) {
        if (section === "create") {
            createTaskSection.style.display = "block";
            allTasksSection.style.display = "none";
            createTaskLink.classList.add("active");
            allTasksLink.classList.remove("active");
        } else {
            createTaskSection.style.display = "none";
            allTasksSection.style.display = "block";
            createTaskLink.classList.remove("active");
            allTasksLink.classList.add("active");
            renderTasks(); // Re-render tasks when viewing the all tasks section
        }
    }

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        const filteredTasks = filterTasks(statusFilter.value);
        filteredTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${task.name}</strong> 
                <p>${task.description}</p>
                <small>Due: ${task.dueDate}</small>
                <span class="priority ${task.priority.toLowerCase()}">${task.priority}</span>
                <div class="buttons">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Function to add a task
    function addTask() {
        const taskName = taskInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();
        const dueDate = new Date(dueDateInput.value).toLocaleString();
        const priority = priorityInput.value;
        if (taskName === "" || taskDescription === "") return;

        tasks.push({
            name: taskName,
            description: taskDescription,
            dueDate: dueDate,
            priority: priority,
            status: "todo",
        });

        taskInput.value = "";
        taskDescriptionInput.value = "";
        dueDateInput.value = "";
        switchSection("all"); // Go to the All Tasks section after adding a task
    }

    // Function to edit a task
    function editTask(index) {
        const newTaskName = prompt("Edit the task name:", tasks[index].name);
        const newTaskDescription = prompt("Edit the task description:", tasks[index].description);
        if (newTaskName !== null && newTaskDescription !== null) {
            tasks[index].name = newTaskName;
            tasks[index].description = newTaskDescription;
            renderTasks();
        }
    }

    // Function to delete a task
    function deleteTask(index) {
        if (confirm("Are you sure you want to delete this task?")) {
            tasks.splice(index, 1);
            renderTasks();
        }
    }

    // Function to filter tasks by status
    function filterTasks(status) {
        if (status === "all") return tasks;
        return tasks.filter((task) => task.status === status);
    }

    // Event Listeners
    addTaskButton.addEventListener("click", addTask);
    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("edit")) {
            editTask(e.target.getAttribute("data-index"));
        } else if (e.target.classList.contains("delete")) {
            deleteTask(e.target.getAttribute("data-index"));
        }
    });

    statusFilter.addEventListener("change", renderTasks);

    createTaskLink.addEventListener("click", () => switchSection("create"));
    allTasksLink.addEventListener("click", () => switchSection("all"));

    // Initialize with the Create Task section visible
    switchSection("create");
});
