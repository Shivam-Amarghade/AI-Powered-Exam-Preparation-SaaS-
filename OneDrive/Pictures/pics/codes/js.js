// let la = document.querySelector("h1");


// function changeColor(color, delay, nextColor) {
//     setTimeout(() => {
//         la.style.color = color;
//         if (nextColor) {
//             nextColor();
//         }
//     }, delay);
// }

// changeColor("red", 1000, () =>
//      {changeColor("orenge", 1000,
//          () =>{changeColor("purple", 1000);

//      }
// );
// });

// function savetoDP(date, succes, failure) {
//     let internetSpeed = Math.floor(Math.random() * 10) + 1;
//     if (internetSpeed > 4) {
//         succes();
//     } else {
//         failure();
//     }
// }

// savetoDP("hellow wor",
//     () => {
//         console.log("connected:data save")
//         savetoDP("laude ji",
//             () => {
//                 console.log("connection 2:data save");
//             },
//             () => {
//                 console.log("week connection 2:data not save");
//             }

//         );

//     },
//     () => {
//         console.log("week Connection:data not save");
//     });

// function savetoDP(date) {
//     let internetSpeed = Math.floor(Math.random() * 10) + 1;
//     return new Promise(function(resolev, reject) {
//         if (internetSpeed > 3) {
//             resolev("connected: data save");
//         } else {
//             reject("week connection:data was not save");
//         }
//     });
// }

// savetoDP("hello").then(() => {
//         console.log("promises success");
//         return savetoDP("hjhjhj");
//     }).then(() => {
//         console.log("promises 2 success");
//         return savetoDP("kjskjkjkjkj");
//     }).then(() => {
//         console.log("promises3 success");

//     })
//     .catch(() => {
//         console.log("promises rejected");

//     });
let la = document.querySelector("h1");


function changeColor(color, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            la.style.color = color;
            resolve("color change");
        }, delay)
    });
}

// changeColor("red", 1000).then((result) => {
//     console.log(result);
//     return changeColor("orenge", 1000);

// }).then((result) => {
//     console.log(result);
//     return changeColor("blue", 1000);

// }).then((result) => {
//     console.log(result);
//     return changeColor("pink", 1000);

// }).then((result) => {
//     console.log(result);
//     return changeColor("yellow", 1000);

// }).then((result) => {
//     console.log(result);
//     return changeColor("purple", 1000);

// }).catch((error) => {
//     console.log("erroe");
// })

async function demo() {
    await changeColor("red", 1000).then(() => {
        console.log("color change");

    }).catch(() => {
        console.log("errro");

    });
    await changeColor("blue", 1000);
    await changeColor("purple", 1000);
    await changeColor("pink", 1000);
}
demo();

// let url = "https://catfact.ninja/fact";
// let url2 = "https://dog.ceo/api/breeds/image/random";

// let bts = document.querySelector("button");
// bts.addEventListener("click", async() => {
//     let fact = await nsame(); // Get the cat fact
//     let res = document.querySelector(".result");
//     let rres = document.querySelector("img");
//     let img = await nsamee(); // Get the dog image URL

//     rres.setAttribute("src", img); // Set the image source
//     res.innerText = fact; // Set the fact text
//     console.log(fact);
// });

// async function nsame() {
//     try {
//         let hm = await axios.get(url); // Fetch cat fact
//         return hm.data.fact; // Return the cat fact
//     } catch (e) {
//         console.log(e);
//     }
// }

// async function nsamee() {
//     try {
//         let hm = await axios.get(url2); // Fetch dog image URL
//         return hm.data.message; // Return the dog image URL
//     } catch (e) {
//         console.log(e);
//     }
// }.