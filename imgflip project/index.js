const memesContainer = document.querySelector(".memes");
const form = document.querySelector(".form");
const page = document.querySelector(".page");
const memescontent = document.querySelector("#memscontent");
let memesArray = [];
let currentlycreating = "";

fetch("https://api.imgflip.com/get_memes").then(blob => {
    return blob.json();
})

    .then(data => {
        const memes = data.data.memes;
        memesArray = memes;
        let html = memes.map((meme, i) => {
            return `
        <div class="card">
          <img class="m-2 memesimage"  src="${meme.url}" alt="meme">
          <p>${meme.name}</p>
          <div>
            <button id="${i}" class="btn" onclick="toggleform(this.id)">+add</button>
          </div>
        </div>
      `;
        }).join("");

        memesContainer.innerHTML = html;
    });
function toggleform(id) {
        form.style.transform = "scale(1)";
        page.style.filter = "blur(5px)";
        let html = "";
        for (let i = 0; i < memesArray[id].box_count; i++) {
            html +=
                `<input class="inp " name="text${i}" type="text"  placeholder="text${i + 1}">`;
        }
        memescontent.innerHTML = html;
        document.querySelector(".inp").value = memesArray[id].id;

}

function cancle() {
    form.style.transform = "scale(0)";
    page.style.filter = "blur(0px)";
}
function addmeme() {
    let inps = document.querySelectorAll(".inp");
    let formbody = [];
    inps.forEach((ele, i) => {
        console.log(ele.name,ele.value);
        
        if (ele.name.includes("text")) {
            let encodevalue = encodeURIComponent(ele.value);
            let encodekey = encodeURIComponent(`boxes[${ele.name.split("text")[1]}][text]`);
            formbody.push(encodekey + "=" + encodevalue);

        } else {
            let encodevalue = encodeURIComponent(ele.value);
            let encodekey = encodeURIComponent(ele.name);
            formbody.push(encodekey + "=" + encodevalue);

        }

    });
    
    formbody = formbody.join("&");
    console.log(formbody);
    // console.log(formbody);
    fetch("https://api.imgflip.com/caption_image", {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        body: formbody
    }).then(blob => {
        return blob.json();
    }).then(data => {
        console.log(data);
    })
}







