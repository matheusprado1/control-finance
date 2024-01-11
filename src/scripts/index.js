import { applyCurrentFilter } from "./filter.js";

export let localInsertedValues = [];

export const renderCards = (array = []) => {
  const cardContainer = document.querySelector(".card__container");
  const emptyContainer = document.querySelector(".empty__container");

  cardContainer.innerHTML = "";

  if (array.length !== 0) {
    emptyContainer.classList.add("container--inactive");
  } else {
    emptyContainer.classList.remove("container--inactive");
  }

  array.forEach(item => {
    cardContainer.insertAdjacentHTML("afterbegin",
      `<div class="card">
        <p class="card__value">R$ ${(item.value).toFixed(2)}</p>
        <div class="card__info">
          <p class="info">${transformIdIntoCategory(item)}</p>
          <button class="button__delete" data-id=${item.id}><svg class="delete__icon" width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5625 0.875H9.28125L9.00781 0.382812C8.89844 0.164062 8.67969 0 8.43359 0H5.28906C5.04297 0 4.82422 0.164062 4.71484 0.382812L4.46875 0.875H1.1875C0.941406 0.875 0.75 1.09375 0.75 1.3125V2.1875C0.75 2.43359 0.941406 2.625 1.1875 2.625H12.5625C12.7812 2.625 13 2.43359 13 2.1875V1.3125C13 1.09375 12.7812 0.875 12.5625 0.875ZM2.19922 12.7695C2.22656 13.4805 2.80078 14 3.51172 14H10.2109C10.9219 14 11.4961 13.4805 11.5234 12.7695L12.125 3.5H1.625L2.19922 12.7695Z" fill="#ADB5BD"/>
      </svg></button>
        </div>
      </div>
      `);
  })
  handleDelete();
}

const transformIdIntoCategory = (item) => {
  const { categoryID } = item;
  if (categoryID === 0) {
    return "Entrada";
  }
  return "Saída";
}

const deleteCard = (id, array = []) => {
  return array.filter(item => item.id !== Number(id));
}

const handleDelete = () => {
  const deleteButtons = document.querySelectorAll(".button__delete");

  Array.from(deleteButtons).forEach(item => {
    item.addEventListener("click", () => {
      console.log('Button clicked, id:', item.dataset.id);
      console.log('Before delete:', localInsertedValues);
      localInsertedValues = deleteCard(item.dataset.id, localInsertedValues);
      console.log('After delete:', localInsertedValues);

      applyCurrentFilter();
    });
  })
}

const selectCategoryButton = () => {
  const entryButton = document.querySelector("#button__entry");
  const exitButton = document.querySelector("#button__exit");

  entryButton.addEventListener("click", categoryButton);
  exitButton.addEventListener("click", categoryButton);
}

const categoryButton = event => {
  const entryButton = document.querySelector("#button__entry");
  const exitButton = document.querySelector("#button__exit");

  entryButton.classList.remove("selected");
  exitButton.classList.remove("selected");

  event.target.classList.add("selected");
}

const getCategoryID = () => {
  const entryButton = document.querySelector("#button__entry");
  const exitButton = document.querySelector("#button__exit");

  if (entryButton.classList.contains("selected")) {
    return 0;
  } else if (exitButton.classList.contains("selected")) {
    return 1;
  }
}

const generateId = () => {
  let idCounter = localInsertedValues.length + 1;

  return idCounter++;
}

const handleAdd = () => {
  const input = document.querySelector("#input__insert");
  const button = document.querySelector("#button__insert");


  button.addEventListener("click", () => {
    let valueWithoutSpace = input.value.trim();
    if (valueWithoutSpace === "" || Number(valueWithoutSpace) <= 0) {
      alert("Por favor, insira um valor válido maior que zero.")
      return;
    }
    let id = generateId();
    let categoryID = getCategoryID();

    localInsertedValues.push({ id, value: Number(valueWithoutSpace), categoryID });
    console.log(localInsertedValues);

    applyCurrentFilter();
    input.value = "";
  });
}

handleAdd();
selectCategoryButton();