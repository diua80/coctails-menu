const switcher = document.querySelector(".switcher-input");
switcher.addEventListener("change", changeTheme);

if (localStorage.getItem("theme") === "dark-theme") {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
    switcher.checked = true;
}
function changeTheme(event) {
    if (event.target.checked) {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
        localStorage.setItem("theme", "dark-theme");
    } else {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light-theme");
    }
}