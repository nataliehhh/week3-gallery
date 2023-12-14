const tns = document.querySelectorAll(".thumbnails img")
const di = document.getElementById("displayImage")

tns.forEach(function (tn) {
    tn.addEventListener("click", function() {
        di.src = tn.src
        di.alt = tn.alt
        // di.srcset = tn.srcset
    })
})


