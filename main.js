const form = document.querySelector('form');
fileInput = document.querySelector('.file-input');
progressArea = document.querySelector('.progress-area');
uploadedArea = document.querySelector('.uploaded-area');

window.addEventListener("load", function () {
    this.document.body.style.backgroundColor = "black";

    this.document.querySelector(".wrapper").style.display = "none";
    this.setTimeout(function () {
        this.document.querySelector(".loader-wrapper").style.display = "none";
        this.document.querySelector(".wrapper").style.display = "block";
        this.document.body.style.backgroundColor = "#1e4096c2";
    }, 2000)
});

form.addEventListener("click", () => {
    fileInput.click();
});

fileInput.onchange = ({ target }) => {
    let file = target.files[0];
    if (file) {
        let fileName = file.name;
        if (fileName.length >= 12) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
        }
        uploadFile(fileName);
    }
}

function uploadFile(name, file) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/upload.php");
    xhr.upload.addEventListener("progress", ({ loaded, total }) => {
        let fileloaded = Math.floor((loaded / total) * 100);
        let fileTotal = Math.floor(total / 100);
        let fileSize;
        (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB";

        let progressHTML = `
        <li class="row">
                <i class="fas fa-file-alt"></i>
                <div class="content">
                    <div class="details">
                        <span class="name">${name} • Uploading</span>
                        <span class="percent">${fileloaded}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style = "width : ${fileloaded}%"></div>
                    </div>
                </div>
            </li>
        `;
        uploadedArea.classList.add("onprogress");
        progressArea.innerHTML = progressHTML;
        if (loaded == total) {
            progressArea.innerHTML = "";
            let uploadedHTML = `
         <li class="row">
                <div class="content upload">
                    <i class="fas fa-file-alt"></i>
                    <div class="details">
                        <span class="name">${name} • Uploaded</span>
                        <span class="percent">${fileSize} %</span>
                    </div>
                </div>
                <i class="fas fa-check"></i>
            </li>
        `;
            uploadedArea.classList.remove("onprogress");
            uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
        }
    });

    //let data = new FormData(form);
    //xhr.send(data);
    let data = new FormData();
    data.append("file", file);
    xhr.send(data);
}
