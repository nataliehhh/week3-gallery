const thumbnails = document.querySelectorAll(".thumbnails img")
const thumbContainer = document.getElementById("thumbContainer")
const displayImage = document.getElementById("displayImage")
const nextBtn = document.getElementById("nextBtn")
const prevBtn = document.getElementById("prevBtn")
const rightThumbBtn = document.getElementById("rightThumbBtn")
const leftThumbBtn = document.getElementById("leftThumbBtn")
const hideThumb = document.getElementById("hideThumb")
const hideThumbImg = document.getElementById("hideThumbImg")
const thumbBar = document.getElementById("thumbBar")
const announcer = document.getElementById("announcer")
const viewAltBtn = document.getElementById("viewAltBtn")
let currentImage = 0
let scrollingInterval = 0
let largeImagePath

document.addEventListener("DOMContentLoaded", function() {
    announcer.textContent = `${displayImage.alt}.`
})

thumbnails.forEach(function (tn) {
    tn.addEventListener("click", function() {
        if (window.innerWidth > 760) {
            largeImagePath = tn.getAttribute("data-large-src-large") 
        } else {
            largeImagePath = tn.getAttribute("data-large-src-small")
        } 
        displayImage.src = largeImagePath || tn.src;
        displayImage.alt = tn.alt; 
        announcer.textContent = `${displayImage.alt}.`
    })
    tn.addEventListener("keydown", function(event) {
        if (event.key === " " || event.key === "Enter") {
        if (window.innerWidth > 760) {
            largeImagePath = tn.getAttribute("data-large-src-large") || tn.getAttribute("data-large-src")
        } else {
            largeImagePath = tn.getAttribute("data-large-src-small") || tn.getAttribute("data-large-src")
        }
        displayImage.src = largeImagePath || tn.src;
        displayImage.alt = tn.alt;
        announcer.textContent = `${displayImage.alt}.`
    }})
    tn.addEventListener("touchend", function(event) {
        event.preventDefault()
        if (window.innerWidth > 760) {
            largeImagePath = tn.getAttribute("data-large-src-large") || tn.getAttribute("data-large-src")
        } else {
            largeImagePath = tn.getAttribute("data-large-src-small") || tn.getAttribute("data-large-src")
        }
        displayImage.src = largeImagePath || tn.src;
        displayImage.alt = tn.alt;
        announcer.textContent = `${displayImage.alt}.`
    })})

leftThumbBtn.addEventListener("click", function() {
    thumbContainer.scrollLeft -= 100
})

rightThumbBtn.addEventListener("click", function() {
    thumbContainer.scrollLeft += 100
})

leftThumbBtn.addEventListener("touchend", function(event) {
    event.preventDefault()
    thumbContainer.scrollLeft -= 100
})

rightThumbBtn.addEventListener("touchend", function(event) {
    event.preventDefault()
    thumbContainer.scrollLeft += 100
})

leftThumbBtn.addEventListener("mouseover", function() {
    scrollingInterval = setInterval(function () {
        thumbContainer.scrollLeft -= 3
    }, 100)
})

leftThumbBtn.addEventListener("mouseout", function() {
    clearInterval(scrollingInterval)
})

rightThumbBtn.addEventListener("mouseover", function() {
    scrollingInterval = setInterval(function () {
        thumbContainer.scrollLeft += 3
    }, 100)
})

rightThumbBtn.addEventListener("mouseout", function() {
    clearInterval(scrollingInterval)
})

hideThumb.addEventListener("click", function() {
    thumbBar.classList.toggle("hidden")
    hideThumbImg.classList.toggle("flip")
})

hideThumb.addEventListener("touchend", function(event) {
    event.preventDefault()
    thumbBar.classList.toggle("hidden")
    hideThumbImg.classList.toggle("flip")
})    

function displayNextImage(i) {
    currentImage += i
    if (currentImage >= thumbnails.length) currentImage = 0
    if (currentImage < 0) currentImage = thumbnails.length - 1
    
    if (window.innerWidth > 760) {
        largeImagePath = thumbnails[currentImage].getAttribute("data-large-src-large") || thumbnails[currentImage].getAttribute("data-large-src")
    } else {
        largeImagePath = thumbnails[currentImage].getAttribute("data-large-src-small") || thumbnails[currentImage].getAttribute("data-large-src")
    }
    displayImage.src = largeImagePath || thumbnails[currentImage].src
    displayImage.alt = thumbnails[currentImage].alt
    announcer.textContent = `${displayImage.alt}`
}

nextBtn.addEventListener("click", function() {
    displayNextImage(1)
})

prevBtn.addEventListener("click", function() {
    displayNextImage(-1)
})

nextBtn.addEventListener("touchend", function(event) {
    event.preventDefault()
    displayNextImage(1)
})
prevBtn.addEventListener("touchend", function(event) {
    event.preventDefault()
    displayNextImage(-1)
})

let touchStartX = 0
let touchEndX = 0
const minSwipeDistance = 50

function swipeImage() {
    const swipeDistance = touchEndX - touchStartX
    if (Math.abs(swipeDistance) >= minSwipeDistance) {
        if (swipeDistance < 0) {
            displayNextImage(-1)
        } else if (swipeDistance > 0) {
            displayNextImage(1)
        }
}}

displayImage.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX
})

displayImage.addEventListener("touchend", e=> {
    touchEndX = e.changedTouches[0].screenX
    swipeImage()
})

thumbContainer.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX
})

thumbContainer.addEventListener("touchend", e=> {
    touchEndX = e.changedTouches[0].screenX
    swipeThumbs()
})

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        displayNextImage(-1)
    } else if (event.key === "ArrowRight") {
        displayNextImage(1)
    }
})

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowDown") {
        thumbBar.classList.add("hidden")
        hideThumbImg.classList.add("flip")
    } else if (event.key === "ArrowUp") {
        thumbBar.classList.remove("hidden")
        hideThumbImg.classList.remove("flip")
    }
})

viewAltBtn.addEventListener("click", function() {
    announcer.classList.toggle("hidden")
    if (viewAltBtn.textContent === "View Text") {
        viewAltBtn.textContent = "Hide Text"
    } else {
        viewAltBtn.textContent = "View Text"
    }
})

viewAltBtn.addEventListener("touchend", function(event) {
    event.preventDefault()
    announcer.classList.toggle("hidden")
    if (viewAltBtn.textContent === "View Text") {
        viewAltBtn.textContent = "Hide Text"
    } else {
        viewAltBtn.textContent = "View Text"
    }
})
