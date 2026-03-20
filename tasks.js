const tasks = [
    {
        id: 1,
        text: "Cuddle tightly each other for 1 minute."
    },
    {
        id: 2,
        text: "Kiss each other passionately for 1 minute."
    },
    {
        id: 3,
        text: "Perform the 69 position for 1 minute"
    }
];

let completedTasks = new Set();

function initializeTasks() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        taskDiv.id = `task-${task.id}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.id = `checkbox-${task.id}`;
        checkbox.onchange = () => handleTaskChange(task.id, checkbox.checked);

        const label = document.createElement('label');
        label.htmlFor = `checkbox-${task.id}`;
        label.className = 'task-text';
        label.textContent = task.text;
        label.style.cursor = 'pointer';

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(label);

        tasksList.appendChild(taskDiv);
    });

    // Load saved progress from sessionStorage
    const saved = sessionStorage.getItem('completedTasks');
    if (saved) {
        completedTasks = new Set(JSON.parse(saved));
        completedTasks.forEach(taskId => {
            const checkbox = document.getElementById(`checkbox-${taskId}`);
            if (checkbox) {
                checkbox.checked = true;
                document.getElementById(`task-${taskId}`).classList.add('completed');
            }
        });
        updateProgress();
    }
}

function handleTaskChange(taskId, isCompleted) {
    const taskElement = document.getElementById(`task-${taskId}`);
    
    if (isCompleted) {
        completedTasks.add(taskId);
        taskElement.classList.add('completed');
    } else {
        completedTasks.delete(taskId);
        taskElement.classList.remove('completed');
    }

    // Save progress
    sessionStorage.setItem('completedTasks', JSON.stringify(Array.from(completedTasks)));
    updateProgress();
}

function updateProgress() {
    const completed = completedTasks.size;
    const total = tasks.length;
    const percentage = (completed / total) * 100;

    document.getElementById('progress-count').textContent = completed;
    document.getElementById('progress-fill').style.width = percentage + '%';

    const continueBtn = document.getElementById('continueBtn');
    if (completed === total) {
        continueBtn.classList.add('active');
    } else {
        continueBtn.classList.remove('active');
    }
}

function completeTasksAndContinue() {
    if (completedTasks.size === tasks.length) {
        // Clear session storage
        sessionStorage.removeItem('completedTasks');
        
        // Redirect to the completion page or back to game
        window.location.href = 'completion.html';
    }
}

// Initialize tasks when page loads
window.addEventListener('load', initializeTasks);
