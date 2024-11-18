let url = "http://universities.hipolabs.com/search?name=india";

let bts = document.querySelector("button");

bts.addEventListener("click", async() => {
    let respond = await axios.get(url);
    let CollageData = respond.data;

    Show(CollageData);

});

function Show(collage) {
    let list = document.querySelector("ol");
    let inputValue = document.querySelector("input");
    list.innerText = "";
    for (let i = 0; i < collage.length; i++) {
        if (inputValue.value == collage[i]["state-province"]) {
            let li = document.createElement("li");
            li.innerText = collage[i].name;
            list.appendChild(li);
        }

    }
}