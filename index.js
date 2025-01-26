const inputBar = document.getElementById("input-bar");
const reminderTime = document.getElementById("reminder-time");  // New input for reminder time
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBar.value === '') {
        alert("You have to write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBar.value;

        // Add a reminder time if available
        const reminder = reminderTime.value;
        if (reminder) {
            // Set the reminder alarm if the user has selected a time
            setReminderAlarm(reminder, inputBar.value);
        }

        // the remove button (×)
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
        inputBar.value = "";  // clear the input field
        reminderTime.value = "";  // clear the reminder time
        storeData();
    }
}

function setReminderAlarm(reminder, task) {
    const reminderDate = new Date(reminder).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = reminderDate - currentTime;

    // Only set the alarm if the reminder time is in the future
    if (timeDifference > 0) {
        setTimeout(() => {
            alert(`Reminder: Time to do the task: "${task}"`);
            playAlarmSound();
        }, timeDifference);
    } else {
        alert('Reminder time is in the past!');
    }
}

function playAlarmSound() {
    const audio = new Audio('https://www.soundjay.com/button/beep-07.wav'); // beep sound
    audio.play();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("done");
        storeData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        storeData();
    }
}, false);

function storeData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data") || '';
}

showData();
