const inputBar = document.getElementById("input-bar");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBar.value === '') {
        alert("You have to write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBar.value;

        // Create the remove button (×)
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
        inputBar.value = "";  // Clear the input field
        storeData();
    }
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
