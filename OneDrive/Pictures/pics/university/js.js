let url = "http://universities.hipolabs.com/search?name=";

let bts = document.querySelector("button");

bts.addEventListener("click", async() => {
    let inputValue = document.querySelector("input");
    let respond = await axios.get(url + inputValue.value);
    let CollageData = respond.data;
    console.log(respond);
    Show(CollageData);

});

function Show(collage) {
    let list = document.querySelector("ol");
    list.innerText = "";
    for (let i = 0; i < collage.length; i++) {
        let li = document.createElement("li");

        li.innerText = collage[i].name;
        list.appendChild(li);

    }
}