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

thumbnails.forEach(function (tn) {
    tn.addEventListener("click", function() {
        displayImage.src = tn.src;
        displayImage.alt = tn.alt;
        displayImage.srcset = tn.srcset;
    })
    tn.addEventListener("keydown", function(event) {
        if (event.key === " " || event.key === "Enter") {
            displayImage.src = tn.src;
            displayImage.alt = tn.alt;
            displayImage.srcset = tn.srcset;
    }})
})

leftThumbBtn.addEventListener("click", function() {
    thumbContainer.scrollLeft -= 100
})

rightThumbBtn.addEventListener("click", function() {
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

function displayNextImage(i) {
    currentImage += i
    if (currentImage >= thumbnails.length) currentImage = 0
    if (currentImage < 0) currentImage = thumbnails.length - 1
    displayImage.src = thumbnails[currentImage].src
    displayImage.alt = thumbnails[currentImage].alt
    displayImage.srcset = thumbnails[currentImage].srcset
    announcer.textContent = `${displayImage.alt}`
}

nextBtn.addEventListener("click", function() {
    displayNextImage(1)
})

prevBtn.addEventListener("click", function() {
    displayNextImage(-1)
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

function setAltText() {
    announcer.textContent = `${displayImage.alt}.`
}

setAltText()

viewAltBtn.addEventListener("click", function() {
    announcer.classList.toggle("hidden")
    if (viewAltBtn.textContent = "View Text") {
        viewAltBtn.textContent = "Hide Text"
    }
})

