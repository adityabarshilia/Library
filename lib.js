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
    formdiv.style.display = 'none';
}

function DisplayForm() {
    formdiv = document.querySelector(".form");
    if (formdiv.style.display == "flex") return;
    formdiv.style.display = 'flex';
    container.setAttribute("style", "display: none;");
    document.getElementById("theform").addEventListener('submit', submitData);
    document.getElementById("Cancel").addEventListener('click', hideForm);
}

function displayBook() {
    if (!mylibrary) return;
    container.innerHTML = "";
    mylibrary.forEach(book => {
        bookdiv = document.createElement('div');
        bookdiv.setAttribute("data-bookid", `${mylibrary.indexOf(book)}`);
        container.appendChild(bookdiv);
        container.setAttribute("style", "display: grid;");
        bookdiv.innerHTML = `<span>${book.Name}</span>
                             <span>${book.Author}</span>
                             <span>${book.Pages}</span>
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

function hideForm() {
    formdiv.style.display = 'none';
    container.style.display = 'grid';
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
const newbookbtn = document.querySelector("#newbookbtn");
const body = document.querySelector("body");
newbookbtn.addEventListener('click', DisplayForm);
restoreDisplay();
