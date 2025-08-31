const urlInput = document.getElementById("input-url");
const titleInput = document.getElementById("input-title");
const submitBtn = document.getElementById("add-new");
const listWrapper = document.querySelector(".list-wrapper");


// Function to create a box in the DOM
function createBox(id, url, title = "") {
  const div = document.createElement("div");
  div.classList.add("list-element");
  div.dataset.link = url;

  // Creates Image
  const img = document.createElement("img");
  img.src = "/assets/kangaroo.png";
  img.alt = "Kangaroo";
  div.appendChild(img);

  // Creates title or URL span
  const textSpan = document.createElement("span");
  textSpan.classList.add("link-text");
  textSpan.textContent = title || url;
  div.appendChild(textSpan);

  // Creates delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  const btnImage = document.createElement("img");
  btnImage.src = "/assets/icons/delete.png";
  btnImage.alt = "delete";
  deleteBtn.appendChild(btnImage);
  div.appendChild(deleteBtn);
  
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent opening the link
    
    // Creates the alert box
    const alertBox = document.createElement("div");
    alertBox.classList.add("alert-box");
    alertBox.textContent = "Are you sure?";
  
    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("buttons-wrapper");
  
    const btnConfirm = document.createElement("button");
    btnConfirm.classList.add("confirm-btn");
    btnConfirm.textContent = "Confirm";
  
    const btnCancel = document.createElement("button");
    btnCancel.classList.add("cancel-btn", "secondary-button");
    btnCancel.textContent = "Cancel";

    const formWrapper = document.querySelector(".form-wrapper");
  
    btnWrapper.appendChild(btnConfirm);
    btnWrapper.appendChild(btnCancel);
    alertBox.appendChild(btnWrapper);
  
    formWrapper.appendChild(alertBox);
  
    // Event handlers
    btnConfirm.addEventListener("click", async () => {
      try {
        await fetch(`/api/contents/${id}`, { method: "DELETE" });
        div.remove();
      } catch (err) {
        console.error("Failed to delete:", err);
        alert("Could not delete the item");
      }
      alertBox.remove();
    });
  
    btnCancel.addEventListener("click", () => {
      alertBox.remove();
    });
  });
  

  // Open link on click
  div.addEventListener("click", () => {
    window.open(url, "_blank");
  });

  return div;
}


// Fetch and show contents from API
async function showContent() {
  listWrapper.innerHTML = "";

  try {
    const res = await fetch("/api/contents");
    const data = await res.json();

    data.forEach(item => {
      const box = createBox(item.id, item.content, item.title);
      listWrapper.appendChild(box);
    });
  } catch (err) {
    console.error("Failed to load contents:", err);
  }
}


// Add new content through API
async function addNew() {
  const url = urlInput.value.trim();
  const title = titleInput.value.trim();
  if (!url) return;

  try {
    const res = await fetch("/api/contents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, title }),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to save content");
    }

    const saved = await res.json();

    // Show the new box at the top
    const newBox = createBox(saved.id, saved.content, saved.title);
    listWrapper.insertBefore(newBox, listWrapper.firstChild);

    // Reset inputs
    urlInput.value = "";
    titleInput.value = "";
  } catch (err) {
    console.error("Error adding content:", err);
    alert("Could not save content. Try again.");
  }
}

submitBtn.addEventListener("click", addNew);

showContent();