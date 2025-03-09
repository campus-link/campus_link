// for the features section the files are been added in the following order
// so if u want to do something in this js file nija nije add kariba but make sure comment karucha thik achi !!

let carouselSlideInterval;

function startAutoCarouselSlide() {
    carouselSlideInterval = setInterval(nextCarouselSlide, 3000);
}

function resetAutoCarouselSlide() {
    clearInterval(carouselSlideInterval);
    startAutoCarouselSlide();
}

function prevCarouselSlide() {
    let current = document.querySelector('input[name="carousel-slider"]:checked');
    let prev = current.previousElementSibling || document.querySelector('input[name="carousel-slider"]:last-of-type');
    prev.checked = true;
    resetAutoCarouselSlide();
}

function nextCarouselSlide() {
    let slides = document.querySelectorAll('input[name="carousel-slider"]');
    let current = document.querySelector('input[name="carousel-slider"]:checked');
    let currentIndex = Array.from(slides).indexOf(current);
    let nextIndex = (currentIndex + 1) % slides.length;

    slides[nextIndex].checked = true;
    resetAutoCarouselSlide();
}



window.onload = startAutoCarouselSlide;

// end of feature section js code !!

// popup section js files 


// Open popups when clicked
document.getElementById("studentLoginBtn").addEventListener("click", function () {
    openPopup('student-login-modal');
});

document.getElementById("teacherLoginBtn").addEventListener("click", function () {
    openPopup('teacher-login-modal');
});

document.getElementById("hrLoginBtn").addEventListener("click", function () {
    openPopup('hr-login-modal');
});

// Function to open popup
function openPopup(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

// Function to close popup
function closePopup(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close popup when clicking outside
window.onclick = function (event) {
    let modals = document.querySelectorAll(".custom-modal");
    modals.forEach(function (modal) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
