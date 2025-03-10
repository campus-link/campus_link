// Sidebar toggle function
function toggleSidebar() {
    let sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("collapsed");
}

// ✅ Move `currentCategory` to the top
let currentCategory = "Users";

// ✅ Move `usersData` initialization up
let usersData = JSON.parse(localStorage.getItem("users")) || [];

// ✅ Define function before calling it
async function loadUsers() {
    try {
        if (usersData.length === 0) { // If no users in LocalStorage, fetch from JSON
            let response = await fetch("../json/Users.json");
            usersData = await response.json();
            localStorage.setItem("users", JSON.stringify(usersData)); // Save to LocalStorage
        }
        showCategory("Users"); // ✅ Now it's safe to call
    } catch (error) {
        console.error("Error loading users:", error);
    }
}

// ✅ Call function after defining it
loadUsers();

// Function to display users based on selected category
function showCategory(category) {
    document.getElementById("category-title").innerText = category;
    currentCategory = category;
    let userTable = document.getElementById("user-table");
    userTable.innerHTML = "";

    let filteredUsers = category === "Users" ? usersData : usersData.filter(user => user.role === category);

    filteredUsers.forEach(user => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><input type="checkbox" class="row-checkbox"></td>
            <td contenteditable="false">${user.id}</td>
            <td contenteditable="false">${user.name}</td>
            <td contenteditable="false">${user.email}</td>
            <td contenteditable="false">${user.password}</td>
            <td>${user.role}</td>
            <td>
                <button class="edit-btn" onclick="toggleEditUser(this, ${user.id})">Edit</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userTable.appendChild(newRow);
    });
}

// Function to toggle edit/save mode
function toggleEditUser(button, userId) {
    let row = button.parentElement.parentElement;
    let nameCell = row.children[2];
    let emailCell = row.children[3];
    let passwordCell = row.children[4];

    if (button.innerText === "Edit") {
        nameCell.contentEditable = true;
        emailCell.contentEditable = true;
        passwordCell.contentEditable = true;
        nameCell.focus();
        button.innerText = "Save";
    } else {
        let userIndex = usersData.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            usersData[userIndex].name = nameCell.innerText;
            usersData[userIndex].email = emailCell.innerText;
            usersData[userIndex].password = passwordCell.innerText;
            localStorage.setItem("users", JSON.stringify(usersData)); // Save changes
        }

        nameCell.contentEditable = false;
        emailCell.contentEditable = false;
        passwordCell.contentEditable = false;
        button.innerText = "Edit";
    }
}

// Function to delete a user
function deleteUser(userId) {
    usersData = usersData.filter(user => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(usersData)); // Save changes
    showCategory("Users");
}

// Function to toggle select all checkboxes
function toggleSelectAll() {
    let checkboxes = document.querySelectorAll(".row-checkbox");
    let selectAll = document.getElementById("select-all");
    checkboxes.forEach(checkbox => checkbox.checked = selectAll.checked);
}

// Function to delete selected rows
function deleteSelectedRows() {
    let checkboxes = document.querySelectorAll(".row-checkbox:checked");
    checkboxes.forEach(checkbox => {
        let row = checkbox.parentElement.parentElement;
        let userId = parseInt(row.children[1].innerText);
        usersData = usersData.filter(user => user.id !== userId);
    });
    localStorage.setItem("users", JSON.stringify(usersData)); // Save changes
    showCategory(currentCategory);
}

// Function to add a new user
document.querySelector(".add-user").addEventListener("click", function () {
    let userId = usersData.length + 1;
    let newRole = currentCategory;

    let newRow = document.createElement("tr");

    if (currentCategory === "Users") {
        newRow.innerHTML = `
            <td><input type="checkbox" class="row-checkbox"></td>
            <td>${userId}</td>
            <td contenteditable="true">New User</td>
            <td contenteditable="true">newuser@example.com</td>
            <td contenteditable="true">password123</td>
            <td>
                <select id="role-select-${userId}">
                    <option value="Student">Student</option>
                    <option value="HR">HR</option>
                    <option value="Tutor">Tutor</option>
                </select>
            </td>
            <td>
                <button class="save-btn" onclick="saveNewUser(${userId}, this)">Save</button>
            </td>
        `;
    } else {
        newRow.innerHTML = `
            <td><input type="checkbox" class="row-checkbox"></td>
            <td>${userId}</td>
            <td contenteditable="true">New User</td>
            <td contenteditable="true">newuser@example.com</td>
            <td contenteditable="true">password123</td>
            <td>${currentCategory}</td>
            <td>
                <button class="save-btn" onclick="saveNewUser(${userId}, this, '${currentCategory}')">Save</button>
            </td>
        `;
    }

    document.getElementById("user-table").appendChild(newRow);
});

// Function to save new user
function saveNewUser(userId, button, fixedRole = null) {
    let row = button.parentElement.parentElement;
    let nameCell = row.children[2].innerText;
    let emailCell = row.children[3].innerText;
    let passwordCell = row.children[4].innerText;
    let selectedRole = fixedRole || document.getElementById(`role-select-${userId}`).value;

    let newUser = { id: userId, name: nameCell, email: emailCell, password: passwordCell, role: selectedRole };
    usersData.push(newUser);
    localStorage.setItem("users", JSON.stringify(usersData)); // Save to LocalStorage

    showCategory(currentCategory);
}

// Profile dropdown hover effect
const profileSection = document.querySelector(".profile-section");
const profileDropdown = document.querySelector(".profile-dropdown");

profileSection.addEventListener("mouseenter", function () {
    profileDropdown.style.display = "block";
});

profileSection.addEventListener("mouseleave", function () {
    profileDropdown.style.display = "none";
});
