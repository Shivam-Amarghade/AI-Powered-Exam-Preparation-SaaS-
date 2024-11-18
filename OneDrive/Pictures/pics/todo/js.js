let inPut = document.querySelector("input");
let bTn = document.querySelector("button");
let uL = document.querySelector("ul");
bTn.addEventListener("click", function() {
    let task = inPut.value;
    let item = document.createElement("li");
    item.innerText = task;
    let delbtn = document.createElement("button");
    delbtn.innerText = "delete";
    delbtn.classList.add("delete");
    delbtn.style.marginLeft = "5px";
    item.appendChild(delbtn);
    // delbtn.addEventListener("click", function() {
    //     item.remove(); // Remove the list item when delete button is clicked
    // });
    uL.appendChild(item);
    inPut.value = "";

});
// let delbtns = document.querySelectorAll(".delete");
// for (let i = 0; i < delbtns.length; i++) {
//     delbtns[i].addEventListener("click", function() {
//         let parent = delbtns[i].parentElement;
//         parent.remove();
//     });
// }

uL.addEventListener("click", function(event) {
    if (event.target.nodeName = "BUTTON") {
        let parent = event.target.parentElement;
        parent.remove();
    }
})