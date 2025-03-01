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