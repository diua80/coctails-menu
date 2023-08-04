const toUp = document.getElementById("toTop");
window.addEventListener("scroll", toggleBtn);
function toggleBtn() {
    // console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 200) {
        toUp.style.display = "block";
    } else {
        toUp.style.display = "none";
    }
}

toUp.addEventListener("click", () => {
    document.documentElement.scrollTop = 0
});