

function openModal(role) {
    document.getElementById("modal-title").innerText = "Login as " + role;
    document.getElementById("loginModal").style.display = "flex";
}
function closeModal() {
    document.getElementById("loginModal").style.display = "none";
}
