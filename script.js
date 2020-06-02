const image = document.getElementById("zoom");
const num = 12;
let currentNum;

(function populateGallery() {
  currentNum = getRandomImage(num);
  image.src = `images/${currentNum}.jpg`;

  const miniContainer = document.getElementById("mini");

  for (let i = 1; i <= num; i++) {
    const item = document.createElement("div");
    item.setAttribute("class", `item ${i}`);
    const icon = document.createElement("img");
    icon.setAttribute("src", `images/${i}.jpg`);
    item.appendChild(icon);
    miniContainer.appendChild(item);
  }

  selectItem();
})();

function getRandomImage(num) {
  return Math.ceil(Math.random() * Math.max(num));
}

function changeForward() {
  currentNum = (currentNum += 1) % num || num;
  image.src = `images/${currentNum}.jpg`;
}

function changeBack() {
  currentNum = (currentNum -= 1) % num || num;
  image.src = `images/${currentNum % num || num}.jpg`;
}

function selectItem() {
  const items = document.querySelectorAll(".item");
  items.forEach(item => {
    item.classList.remove("selected");
  });
  const currentItem = document.getElementsByClassName(`item ${currentNum}`)[0];
  currentItem.classList.add("selected");
  currentItem.scrollIntoView();
}

const arrowRight = document.querySelector(".fa-chevron-circle-right");
arrowRight.addEventListener("click", () => {
  changeForward();
  selectItem();
});

window.addEventListener("keydown", e => {
  if (e.keyCode === 39) {
    changeForward();
    selectItem();
  }
});

const arrowLeft = document.querySelector(".fa-chevron-circle-left");
arrowLeft.addEventListener("click", () => {
  changeBack();
  selectItem();
});

window.addEventListener("keydown", e => {
  if (e.keyCode === 37) {
    changeBack();
    selectItem();
  }
});

const items = document.querySelectorAll(".item");
items.forEach(item => {
  item.addEventListener("click", e => {
    changeCurrent(e);
    selectItem();
  });
});

function changeCurrent(e) {
  currentNum = parseInt(e.target.getAttribute("src").match(/\d+/g)[0]);
  image.src = `images/${currentNum}.jpg`;
}
