let btn = document.querySelector(".btn");
btn.addEventListener("click", function() {
    console.log("shhsk");
    let randomColor = getRandomColor();
    let h3 = document.querySelector("h1");
    h3.innerText = randomColor;
    let Div = document.querySelector(".sec");
    if (Div) {
        Div.style.backgroundColor = randomColor;
    } else {
        console.error("Element with class 'sec' not found.");
    }
});

function getRandomColor() {
    let red = Math.ceil(Math.random() * 255);
    let blue = Math.ceil(Math.random() * 255);
    let green = Math.ceil(Math.random() * 255);

    let color = `rgb(${red},${blue},${green})`;
    return color;


}
let form = document.querySelector("form");
form.addEventListener("submit", function() {
    console.log("form submited");
});