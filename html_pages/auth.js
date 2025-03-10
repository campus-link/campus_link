// Hardcoded admin credentials (can be updated later)
const validAdmin = {
    username: "admin",
    password: "admin123" // Note: In a real system, use hashed passwords
};

// Login function
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMsg = document.getElementById("error-message");

    if (username === validAdmin.username && password === validAdmin.password) {
        localStorage.setItem("isAdminLoggedIn", "true"); // Store login status
        window.location.href = "admin_panel.html"; // Redirect to admin panel
    } else {
        errorMsg.textContent = "Invalid username or password!";
    }
}

// Check if user is logged in (to protect admin panel)
function checkAuth() {
    if (localStorage.getItem("isAdminLoggedIn") !== "true") {
        window.location.href = "login.html"; // Redirect to login if not authenticated
    }
}

// Logout function
function logout() {
    localStorage.removeItem("isAdminLoggedIn"); // Clear session
    window.location.href = "./auth.html"; // Redirect to login page
}
// Password Show/Hide Toggle
function togglePassword() {
    let passwordField = document.getElementById("password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

// Pressing "Enter" should trigger login
document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        login();
    }
});

// Login function (with button disable feature)
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMsg = document.getElementById("error-message");
    let loginButton = document.querySelector("button");

    if (username === "admin" && password === "admin123") {
        loginButton.disabled = true;  // Prevent double-clicking
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "admin_panel.html";
    } else {
        errorMsg.textContent = "Invalid username or password!";
    }
}

