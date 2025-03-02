document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    updateStats();
});

document.getElementById('addTaskBtn').addEventListener('click', addTask);

document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const taskList = document.getElementById('taskList');
    const newTask = createTaskElement(taskText, false);
    taskList.appendChild(newTask);

    taskInput.value = '';

    saveTasks();
    updateStats();
}

function createTaskElement(text, completed) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', function () {
        li.classList.toggle('completed', this.checked);
        saveTasks();
        updateStats();
    });

    const taskText = document.createElement('span');
    taskText.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function () {
        li.remove();
        saveTasks();
        updateStats();
    });

    const leftSide = document.createElement('div');
    leftSide.appendChild(checkbox);
    leftSide.appendChild(taskText);

    li.appendChild(leftSide);
    li.appendChild(deleteBtn);

    return li;
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    for (const taskElement of taskList.children) {
        const checkbox = taskElement.querySelector('input[type="checkbox"]');
        const taskText = taskElement.querySelector('span').textContent;

        tasks.push({
            text: taskText,
            completed: checkbox.checked
        });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);

        for (const task of tasks) {
            const taskElement = createTaskElement(task.text, task.completed);
            taskList.appendChild(taskElement);
        }
    }
}

function updateStats() {
    const taskList = document.getElementById('taskList');
    const completedCount = taskList.querySelectorAll('li.completed').length;
    const totalCount = taskList.children.length;
    const remainingCount = totalCount - completedCount;

    document.getElementById('completedCount').textContent = completedCount;
    document.getElementById('remainingCount').textContent = remainingCount;
}
