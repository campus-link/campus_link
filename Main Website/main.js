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


//navbar

let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    let navbarHidden = false;

    window.addEventListener("scroll", function () { // Listen for the scroll event
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Get the current vertical scroll position

        if (scrollTop > lastScrollTop && !navbarHidden) { // If scrolling down and navbar is not already hidden
            navbar.classList.add("navbar-hidden"); // Hide the navbar
            navbarHidden = true;
        } else if (scrollTop < lastScrollTop && navbarHidden) { // If scrolling up and navbar is hidden
            navbar.classList.remove("navbar-hidden"); // Show the navbar
            navbarHidden = false;
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);





    // password and conform password check

    function validatePassword() {
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirm_password").value;
        var errorMessage = document.getElementById("password_error");

        if (password !== confirmPassword) {
            errorMessage.style.display = "block"; // Show error message
            return false; // Prevent form submission
        } else {
            errorMessage.style.display = "none"; // Hide error message if passwords match
            return true; // Allow form submission
        }
    }

    // Real-time validation
    document.getElementById("confirm_password").addEventListener("input", function () {
        validatePassword();
    });
