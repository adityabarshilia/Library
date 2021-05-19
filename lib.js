class book {
    constructor(name, author, pages, read) {
        this.Name = name;
        this.Author = author;
        this.Pages = pages;
        this.Read = read;
    }
}
function addBook(nbook) {
    mylibrary.push(nbook);
    saveLocal();
    displayBook();
}
function submitData(e) {
    e.preventDefault();
    title = document.getElementById("title").value;
    author = document.getElementById("author").value;
    pages = document.getElementById("pages").value;
    read = document.getElementById("read").checked ? "Read" : "Not Read";
    newbook = new book(title, author, pages, read);
    addBook(newbook);
    formdiv.remove();
}

function DisplayForm() {
    if (body.contains(formdiv)) return;
    formdiv = document.createElement('div');
    body.appendChild(formdiv);
    formdiv.classList.add("form");
    formdiv.innerHTML = `<h2>Add New Book</h2>
  <form id="theform">
  <input id="title" type="text" name="title" placeholder="Title" required><br>
  <input id="author" type="text" name="Author" pattern="[A-Za-z]+" placeholder="Author" required><br>
  <input id="pages" type="number" name="Pages" placeholder="Pages" required><br>
  <label for="read">Read?</label>
  <input type="checkbox" id="read"><br>
  <input id="submit" type ="submit" value ="submit">
</form>`;
    container.setAttribute("style", "display: none;");
    document.getElementById("theform").addEventListener('submit', submitData);
}

function displayBook() {
    if (!mylibrary) return;
    container.innerHTML = "";
    mylibrary.forEach(book => {
        bookdiv = document.createElement('div');
        bookdiv.setAttribute("data-bookid", `${mylibrary.indexOf(book)}`);
        container.appendChild(bookdiv);
        container.setAttribute("style", "display: grid;");
        bookdiv.innerHTML = `<span>${book.Name}</span><br>
  <span>${book.Author}</span><br>
  <span>${book.Pages}</span><br>
  <button id ="readbtn">${book.Read}</button> 
  <button id ="rembtn">Remove</button>`;
        let readbtns = document.querySelectorAll("#readbtn");
        let rembtns = document.querySelectorAll("#rembtn");
        readbtns.forEach(readbtn => readbtn.addEventListener('click', onRead));
        rembtns.forEach(rembtn => rembtn.addEventListener('click', onRemove));
    });
}

function onRead(e) {
    id = e.target.parentElement.dataset.bookid;
    if (e.target.textContent === "Read") {
        e.target.textContent = "Not Read";
        mylibrary[id].Read = "Not Read";
        saveLocal();
    } else {
        e.target.textContent = "Read";
        mylibrary[id].Read = "Read";
        saveLocal();
    }
}

function onRemove(e) {
    id = e.target.parentElement.dataset.bookid;
    mylibrary.splice(id, 1);
    saveLocal();
    e.target.parentElement.remove();
}

function restoreDisplay() {
    restoreLocal();
    displayBook();
}

function saveLocal() {
    localStorage.setItem("mylibrary", JSON.stringify(mylibrary));
}

function restoreLocal() {
    if (localStorage.getItem("mylibrary")) {
        mylibrary = JSON.parse(localStorage.getItem("mylibrary"));
    } else {
        return;
    }
}

let mylibrary = [];
let title;
let author;
let pages;
let read;
let formdiv;
let newbook;
let id;
const container = document.querySelector(".container");
const bookbtn = document.querySelector(".bookbtn");
const body = document.querySelector("body");
bookbtn.addEventListener('click', DisplayForm);
restoreDisplay();
