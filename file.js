let filesData = JSON.parse(localStorage.getItem("filesData")) || [];

function renderFiles() {
  const list = document.getElementById("fileList");
  list.innerHTML = "";

  filesData.forEach((file, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${file.name}</span>
      <div>
        <a href="${file.url}" download="${file.name}">Download</a>
        <button class="delete" onclick="deleteFile(${index})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function uploadFile() {
  const input = document.getElementById("fileInput");
  const file = input.files[0];

  if (!file) {
    alert("Please select a file!");
    return;
  }

  const url = URL.createObjectURL(file);

  filesData.push({
    name: file.name,
    url: url
  });

  localStorage.setItem("filesData", JSON.stringify(filesData));

  input.value = "";
  renderFiles();
}

function deleteFile(index) {
  filesData.splice(index, 1);
  localStorage.setItem("filesData", JSON.stringify(filesData));
  renderFiles();
}

// initial load
renderFiles();