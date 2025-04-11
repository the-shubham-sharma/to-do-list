let tasks = [];

const addTask = () => {
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ task: text, completed: false });
    taskInput.value = '';
    updateTaskList();
  }
};

const toggleTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
};

const updateProgress = () => {
  const progress = document.getElementById('progress');
  const numbers = document.getElementById('numbers');
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const percent = total ? (completed / total) * 100 : 0;
  progress.style.width = `${percent}%`;
  numbers.textContent = `${completed}/${total}`;
};

const updateTaskList = () => {
  const taskList = document.querySelector('.task-list');
  taskList.innerHTML = '';

  tasks.forEach((taskItem, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';

    listItem.innerHTML = `
      <div class="task">
        <input type="checkbox" class="checkbox" ${taskItem.completed ? 'checked' : ''} onchange="toggleTask(${index})">
        <p class="${taskItem.completed ? 'completed' : ''}">${taskItem.task}</p>
      </div>
      <button onclick="deleteTask(${index})" class="delete-btn">✕</button>
    `;

    taskList.appendChild(listItem);
  });

  updateProgress();
};

document.getElementById('newTask').addEventListener('click', function (e) {
  e.preventDefault();
  addTask();
});
