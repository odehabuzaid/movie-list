'use strict';
function Movie(name, release, image) {
  this.name = name;
  this.release = release;
  this.image = image;
  Movie.moviesList.push(this);
}
Movie.moviesList = [];
let form = document.getElementById('form');
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  let name, release, image;

  name = e.target.movieName.value;
  release = e.target.releaseDate.value;
  image = e.target.movieImage.value;
  new Movie(name, release, image);
  saveTolocalStorage();
  form.reset();
  displayData();
}

function displayData() {
  cleareTable();
  createTableHeader();
  createTableBody();
  createTableFooter();
}
function cleareTable() {
  document.querySelector('thead').innerHTML = '';
  document.querySelector('tbody').innerHTML = '';
  document.querySelector('tfoot').innerHTML = '';
}
function createTableHeader() {
  let theadarr = ['#', 'Image', 'Name', 'Release'];
  for (let i = 0; i < theadarr.length; i++) {
    let th = document.createElement('th');
    th.textContent = theadarr[i];
    document.querySelector('thead').appendChild(th);
  }
}
function createTableBody() {
  let tbody = document.getElementById('tableBody');
  let lsData = loadFromLocalStorage();
  for (let i = 0; i < lsData.length; i++) {
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    tr.setAttribute('id', i);

    let hashTD = document.createElement('td');
    hashTD.textContent = 'X';
    hashTD.classList.add('remove');
    hashTD.addEventListener('click', removeThisMovie);
    tr.appendChild(hashTD);

    let imgTd = document.createElement('td');
    let img = document.createElement('img');
    let str = lsData[i].image;
    str = `./img/` + str.toLowerCase() + `.png`;
    imgTd.innerHTML = `<img src='${str}'>`;

    tr.appendChild(imgTd);

    let nameTd = document.createElement('td');
    nameTd.textContent = lsData[i].name;
    tr.appendChild(nameTd);

    let releaseTd = document.createElement('td');
    releaseTd.textContent = lsData[i].release;
    tr.appendChild(releaseTd);
  }
}



function removeThisMovie(e) {
  Movie.moviesList.splice(e.target.parentElement.id, 1);
  saveTolocalStorage();
  init();
}
function createTableFooter() {
  let tfoot = document.querySelector('tfoot');

  let qtyTd = document.createElement('td');
  qtyTd.textContent = 'Quantity';
  tfoot.appendChild(qtyTd);
  let emptyTd = document.createElement('td');
  emptyTd.textContent = '';
  tfoot.appendChild(emptyTd);
  let countTd = document.createElement('td');
  countTd.textContent = Movie.moviesList.length;
  tfoot.appendChild(countTd);
  let emptyTD = document.createElement('td');
  emptyTD.textContent = '';
  tfoot.appendChild(emptyTD);
}

init();
function init() {
  let lsData = loadFromLocalStorage();
  if (lsData.length > 0) {
    Movie.moviesList = [];
    for (let i of lsData) {
      new Movie(i.name, i.release, i.image);
    }
    displayData();
  } else {
    cleareTable();
  }
}

let clearLs = document.getElementById('clearLs');
clearLs.addEventListener('click', handleClearLs);
function handleClearLs() {
  localStorage.removeItem('moviesList');
  init();
}
function saveTolocalStorage() {
  localStorage.setItem('moviesList', JSON.stringify(Movie.moviesList));
}
function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem('moviesList')) || [];
}
