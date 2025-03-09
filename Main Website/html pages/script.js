// Sidebar toggle function
function toggleSidebar() {
    let sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("collapsed");
}

// Sample user data
let usersData = [
    { id: 1, name: "John Doe", email: "john@example.com", password: "password123", role: "Student" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", password: "password456", role: "HR" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", password: "password789", role: "Tutor" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", password: "password101", role: "Student" }
];

let currentCategory = "Users";

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
            <td>${user.id}</td>
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
        nameCell.contentEditable = false;
        emailCell.contentEditable = false;
        passwordCell.contentEditable = false;
        button.innerText = "Edit";

        let user = usersData.find(user => user.id === userId);
        if (user) {
            user.name = nameCell.innerText;
            user.email = emailCell.innerText;
            user.password = passwordCell.innerText;
        }
    }
}

// Function to delete a user
function deleteUser(userId) {
    usersData = usersData.filter(user => user.id !== userId);
    showCategory(currentCategory);
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

// Load all users by default
showCategory("Users");
